/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Box, Button, HStack, Pressable, ScrollView, useToast } from "native-base"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../components"
import PopupAlert from "./components/popup-alert"
import numeral from "numeral"
import moment from "moment"
import { CallSvg, EditSvg, NotificationSvg } from "../../assets/svgs"
import { Linking } from "react-native"
import DocumentView from "./components/document-view"
import BankerLoanSteps from "./components/banker-loan-steps"
import { LOAN_STATUS_TYPES, LOAN_STEP_INDEX, TRANSACTION_STATUS_TYPES } from "./constants"
import { flatten, map } from "../../utils/lodash-utils"

const BankerLoanDetailScreen: FC = observer((props: any) => {
  const navigation = useNavigation()
  const { bankerStore, authStoreModel } = useStores()
  const toast = useToast()

  const [notes, setNotes] = useState<any>([])
  const [alert, setAlert] = useState<any>({
    visible: false,
    data: {},
    type: "reject",
    message: "",
  })

  const data = props?.route?.params?.data
  const name =
    data?.user?.fullName || `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`

  const [transactionDetail, setTransactionDetail] = useState<any>({})

  const objectId = data?.dealDetails?.[0]?.dealId
  const dealDetailId = data?.dealDetails?.[0]?.id

  const getNotes = useCallback(async () => {
    const result = await bankerStore.getNotes(dealDetailId)
    setNotes(result)
  }, [data, dealDetailId])

  const getTransactionDeal = useCallback(async () => {
    const result = await bankerStore.getTransactionDeal(objectId, dealDetailId)
    if (result?.length) {
      setTransactionDetail(result[0])
    }
  }, [data, dealDetailId])

  const getGuestDocument = useCallback(async () => {
    if (data.documentTemplateId) {
      await bankerStore.getDocumentTemplates(data.documentTemplateId)
      await bankerStore.getDocumentTemplateFiles(data.documentTemplateId, objectId)
    }
  }, [data, objectId])

  useEffect(() => {
    getGuestDocument()
    getNotes()
    getTransactionDeal()
  }, [])

  const documents = useMemo(() => {
    const templates = bankerStore.documentTemplates
    const files = bankerStore.documentTemplateFiles
    return flatten(templates?.map((el) => el?.documentTemplateDetails)).map((el) => {
      if (!files) {
        return el
      } else {
        if (files[el.documentId]) {
          const images = files[el.documentId].map((el) => el.file.url)
          return { ...el, images: images }
        }
        return el
      }
    })
  }, [bankerStore.documentTemplates, bankerStore.documentTemplateFiles])

  const onReject = useCallback(() => {
    setAlert({
      visible: true,
      type: "reject",
      message: "Bạn có chắc muốn từ chối\nhồ sơ này?",
      status: LOAN_STATUS_TYPES.CANCELLED,
    })
  }, [data, authStoreModel.userId])

  const onExpertise = useCallback(() => {
    setTimeout(() => {
      setAlert({
        visible: true,
        type: "confirm",
        message: "Bạn có chắc muốn thẩm định hồ sơ này?",
        confirmText: "Thẩm định",
      })
    }, 500)
  }, [data, authStoreModel.userId])

  const onAlertConfirm = useCallback(async () => {
    const result = await bankerStore.updateDealStatus(dealDetailId, alert.status, objectId)
    setAlert({ visible: false })
    if (result) {
      toast.show({
        description: result,
      })
      bankerStore.getListLoan({}, { page: 1, limit: 20 })
      navigation.goBack()
    }
  }, [alert, navigation])

  const renderNotes = useCallback(() => {
    if (notes?.length)
      return (
        <Box bg="white" borderRadius="8" p="4" mt="4">
          <Text color="ebony" size="semiBold14" text="Ghi chú của ngân hàng" />
          <Box height="1.0" my="3" bg="iron" opacity={0.5} />
          {notes.map((item, index) => (
            <HStack key={index} mt={index ? 3 : 0}>
              <Avatar
                source={{
                  uri: item?.createdBy?.avatar,
                }}
                w={s(32)}
                h={s(32)}
                bg="gray"
              >
                {item?.createdBy?.fullName.charAt(0)}
              </Avatar>
              <Box flex={1} ml="3">
                <Text
                  color="grayChateau"
                  fontSize={12}
                  lineHeight={17}
                  fontWeight="600"
                  text={item?.createdBy?.fullName}
                  textTransform="capitalize"
                />
                <Text
                  color="ebony"
                  fontSize={12}
                  lineHeight={17}
                  fontWeight="400"
                  text={item.content}
                  textTransform="capitalize"
                  mt="0.5"
                />
              </Box>
            </HStack>
          ))}
        </Box>
      )
    return null
  }, [notes])

  const renderItem = useCallback(
    ({
      item,
      index,
      rightComponent,
      required,
    }: {
      item: any
      index: any
      rightComponent?: any
      required?: boolean
    }) => {
      return (
        <HStack mt={index ? vs(12) : 0} key={index}>
          <Text color="lighterGray" size="medium12" text={item.label} />
          <Text size="medium12" color="red.500" text={required ? " *" : " "} />
          <Text color="lighterGray" size="medium12" text=":" />
          {rightComponent || (
            <Text color="ebony" size="medium12" text={item.value} flex="1" textAlign="right" />
          )}
        </HStack>
      )
    },
    [],
  )

  const renderCall = useCallback((value, phone) => {
    return (
      <Pressable
        onPress={() => Linking.openURL(`tel:${phone}`)}
        flex="1"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text
          color="black"
          fontSize={14}
          lineHeight={20}
          fontWeight="500"
          text={value}
          textAlign="right"
          mr={s(10)}
        />
        <CallSvg />
      </Pressable>
    )
  }, [])

  const renderDocuments = useCallback(() => {
    return (
      <Box mt={vs(16)}>
        <Text
          color="ebony"
          fontSize={14}
          lineHeight={20}
          fontWeight="600"
          text="Giấy tờ của khách"
        />
        {map(documents, (item, index) => (
          <DocumentView data={item} key={index} mt={s(12)} />
        ))}
      </Box>
    )
  }, [documents])

  const renderTransactionDetails = useCallback(() => {
    if (transactionDetail?.transactionDetails?.length) {
      return (
        <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
          <Text
            color="ebony"
            fontSize={14}
            lineHeight={20}
            fontWeight="600"
            text="Quá trình giải ngân:"
          />
          <Box height="1.0" my="3" bg="iron" opacity={0.5} />
          {transactionDetail?.transactionDetails.map((item, index) =>
            renderItem({
              item: {
                label: `${numeral(item.amount).format("0,0")} vnđ`,
                value: "",
              },
              index: index,
              rightComponent: (
                <Text
                  size="medium12"
                  flex="1"
                  textAlign="right"
                  color={
                    item.status === TRANSACTION_STATUS_TYPES.NOT_FOR_CONTROL ? "orange" : "green"
                  }
                  text={
                    item.status === TRANSACTION_STATUS_TYPES.NOT_FOR_CONTROL
                      ? "Chưa đối soát"
                      : "Đã đối soát"
                  }
                />
              ),
            }),
          )}
          {renderItem({
            item: { label: "10.000.000vnđ", value: "" },
            index: 1,
            rightComponent: (
              <Text size="medium12" flex="1" textAlign="right" color="green" text="Đã đối soát" />
            ),
          })}
        </Box>
      )
    }
    return null
  }, [transactionDetail])

  const renderFooterButton = useCallback(() => {
    const buttonConfirm = (title, onPress, ml = "4") => (
      <Button
        onPress={onPress}
        bg="primary"
        flex={1}
        ml={ml}
        _text={{ fontWeight: "600", fontSize: 16 }}
      >
        {title}
      </Button>
    )
    const buttonReject = () => (
      <Button
        onPress={onReject}
        bg="white"
        borderWidth="1"
        borderColor="orange"
        flex={1}
        _text={{ fontWeight: "600", fontSize: 16, color: "orange" }}
      >
        Từ chối
      </Button>
    )
    switch (data.status) {
      case LOAN_STATUS_TYPES.WAIT_PROCESSING:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Đã giải ngân", () => {
              setAlert({
                visible: true,
                type: "confirm",
                message: "Bạn muốn thẩm định hồ sơ này?",
                confirmText: "Tiếp nhận",
                status: LOAN_STATUS_TYPES.RECEIVED,
              })
            })}
          </HStack>
        )
      case LOAN_STATUS_TYPES.RECEIVED:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Đã giải ngân", () => {
              setAlert({
                visible: true,
                type: "confirm",
                message: "Bạn muốn thẩm định hồ sơ này?",
                confirmText: "Thẩm định",
                status: LOAN_STATUS_TYPES.APPRAISAL_PROGRESS,
              })
            })}
          </HStack>
        )
      case LOAN_STATUS_TYPES.LEND_APPROVAL:
        return (
          <Box>
            <Button
              onPress={onReject}
              bg="white"
              borderWidth="1"
              borderColor="orange"
              flex={1}
              _text={{ fontWeight: "600", fontSize: 16, color: "orange" }}
            >
              Từ chối hồ sơ
            </Button>
            <HStack mt="4" mb="6">
              {buttonConfirm(
                "Giải ngân",
                () => {
                  setAlert({
                    visible: true,
                    type: "confirm",
                    message: "Bạn muốn giải ngân hồ sơ này?",
                    confirmText: "Xác nhận",
                    status: LOAN_STATUS_TYPES.DISBURSING,
                  })
                },
                "0",
              )}
              {buttonConfirm("Phong toả 3 bên", () => {
                setAlert({
                  visible: true,
                  type: "confirm",
                  message: "Bạn muốn đi đến bước “Phong toả\n3 bên?",
                  confirmText: "Xác nhận",
                  status: LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE,
                })
              })}
            </HStack>
          </Box>
        )
      case LOAN_STATUS_TYPES.TRIPARTITE_BLOCKADE:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Giải ngân", () => {
              setAlert({
                visible: true,
                type: "confirm",
                message: "Bạn muốn giải ngân hồ sơ này?",
                confirmText: "Xác nhận",
                status: LOAN_STATUS_TYPES.DISBURSING,
              })
            })}
          </HStack>
        )
      case LOAN_STATUS_TYPES.DISBURSING:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Đã giải ngân", () => {
              setAlert({
                visible: true,
                type: "confirm",
                message: "Hồ sơ đã hoàn tất giải ngân?",
                confirmText: "Hoàn tất",
                status: LOAN_STATUS_TYPES.DISBURSED,
              })
            })}
          </HStack>
        )
      case LOAN_STATUS_TYPES.DISBURSED:
        return null

      default:
        return null
    }
  }, [onReject, onExpertise])

  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader
        renderTitle={
          <Box
            flex="1"
            justifyContent="flex-end"
            alignItems="center"
            pointerEvents="none"
            mb="-3.5"
          >
            <Text color="ebony" size="bold14" text={name} />
            <Text size="semiBold12" color="grayChateau" text={`HSV - ${data._iid}`} />
          </Box>
        }
        renderRightIcon={<NotificationSvg />}
      />
      <BankerLoanSteps activeIndex={LOAN_STEP_INDEX[data.status]} mb="1" />
      <ScrollView>
        <Box mb="6" mx="4" mt="5">
          <Box bg="white" borderRadius="8" p="4">
            <Text color="ebony" size="semiBold14" text="Khách hàng" />
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: { label: "Họ tên:", value: name },
              index: 0,
              rightComponent: renderCall(name, data.user?.tels?.[0]?.tel),
            })}
            {renderItem({ item: { label: "Giới tính", value: "-" }, index: 1 })}
            {renderItem({ item: { label: "Phương án", value: "-" }, index: 2 })}
            {renderItem({ item: { label: "Yêu cầu", value: "-" }, index: 3 })}
            {renderItem({ item: { label: "Thông tin bổ sung", value: "-" }, index: 4 })}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text size="semiBold14" text="Hồ sơ cho vay" />
              <Pressable>
                <EditSvg />
              </Pressable>
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({ item: { label: "Sản phẩm:", value: data?.product?.name }, index: 0 })}
            {renderItem({ item: { label: "Mã SP CĐT:", value: "-" }, index: 1 })}
            {renderItem({
              item: { label: "Mã căn hộ", value: data?.realEstateInfo?.apartmentCode || "-" },
              index: 2,
            })}
            {renderItem({ item: { label: "Địa chỉ", value: "-" }, index: 3 })}
            {renderItem({
              item: {
                label: "Số tiền khách yêu cầu vay:",
                value: `${numeral(data?.loanMoney).format("0,0")} ${data?.suffix || "vnđ"}`,
              },
              index: 4,
            })}
            {renderItem({
              item: {
                label: "Thời gian vay",
                value: `${data.timeLoan || 0} (Năm)`,
              },
              index: 5,
            })}
            {renderItem({
              item: {
                label: "Thời gian tạo",
                value: moment(data.createdAt).format("DD/MM/YYYY | hh:mm"),
              },
              index: 6,
            })}
            {renderItem({
              item: { label: "Nhân viên FINA", value: data?.createdBy?.fullName },
              index: 7,
              rightComponent: renderCall(data?.createdBy?.fullName, data.createdBy?.tels?.[0]?.tel),
            })}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="ebony" size="semiBold14" text="Kết quả" />
              <Pressable>
                <EditSvg />
              </Pressable>
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: {
                label: "Số tiền phê duyệt",
                value: transactionDetail.totalAmount || "-",
              },
              index: 0,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Thời gian vay",
                value: "-",
              },
              index: 1,
            })}
            {renderItem({
              item: {
                label: "Ngày phê duyệt",
                value: transactionDetail.createdAt
                  ? moment(transactionDetail.createdAt).format("DD/MM/YYYY | hh:mm")
                  : "-",
              },
              index: 2,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Mã hồ sơ phía ngân hàng",
                value: "-",
              },
              index: 3,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Mã khách hàng phía ngân hàng",
                value: "-",
              },
              index: 4,
              required: true,
            })}
          </Box>
          {renderNotes()}
          {renderTransactionDetails()}
          {renderDocuments()}
          <Box mt={vs(34)}>{renderFooterButton()}</Box>
        </Box>
      </ScrollView>
      <PopupAlert
        visible={alert.visible}
        type={alert.type}
        message={alert.message}
        confirmText={alert.confirmText}
        rejectText={alert.rejectText}
        onClose={() => setAlert({ visible: false })}
        onConfirm={onAlertConfirm}
        loading={bankerStore.isUpdating}
      />
    </Box>
  )
})

export default BankerLoanDetailScreen
