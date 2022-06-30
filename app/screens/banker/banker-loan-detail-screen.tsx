/* eslint-disable react-native/no-color-literals */
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { Box, Button, HStack, Pressable, ScrollView, useToast } from "native-base"
import numeral from "numeral"
import { Alert, Linking, View } from "react-native"
import { s, vs } from "react-native-size-matters"
import { CallSvg, EditSvg, NotificationSvg, PlusBottomSvg } from "../../assets/svgs"
import { Text } from "../../components"
import AppHeader from "../../components/app-header/AppHeader"
import Note from "../../components/note/note"
import PopupAlert from "../../components/popup-alert/popup-alert"
import { useStores } from "../../models"
import { getDocumentFiles } from "../../utils/file"
import { map } from "../../utils/lodash-utils"
import BankerLoanSteps from "./components/banker-loan-steps"
import DocumentView from "./components/document-view"
import PopupCreateTransaction from "./components/popup-create-transaction"
import PopupEditLoanDocument from "./components/popup-edit-loan-document"
import PopupEditLoanResult from "./components/popup-edit-loan-result"
import {
  GENDER,
  LOAN_STATUS_TYPES,
  LOAN_STEP_INDEX,
  TRANSACTION_STATUS_TYPES
} from "./constants"

const BankerLoanDetailScreen: FC = observer((props: any) => {
  const tab = props?.route?.params?.tab
  const index = props?.route?.params?.index

  const navigation = useNavigation()
  const { bankerStore, authStoreModel } = useStores()
  const toast = useToast()
  const data = bankerStore.listLoan[index]

  const [notes, setNotes] = useState<any>([])
  const [alert, setAlert] = useState<any>({
    visible: false,
    data: {},
    type: "reject",
    message: "",
  })

  const [editDocumentLoanVisible, setEditDocumentLoanVisible] = useState(false)
  const [editLoanResultVisible, setEditLoanResultVisible] = useState(false)
  const [createTransactionVisible, setCreateTransactionVisible] = useState(false)

  const name =
    data?.user?.fullName || `${data?.user?.firstName || ""} ${data?.user?.lastName || ""}`

  const [transactionDetail, setTransactionDetail] = useState<any>({})
  const objectId = data?.dealDetails?.[0]?.dealId
  const dealDetail = data?.dealDetails?.[0]
  const dealDetailId = dealDetail?.id

  const renderGender = () => {
    return GENDER[data?.user?.gender] || "Khác"
  }

  const getNotes = useCallback(async () => {
    if (dealDetailId) {
      const result = await bankerStore.getNotes(dealDetailId)
      setNotes(result)
    }
  }, [data, dealDetailId])

  const getTransactionDeal = useCallback(async () => {
    const result = await bankerStore.getTransactionDeal(data?.id, dealDetailId)
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
    return getDocumentFiles(templates, files)
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
      if (result === 'CHECKED_AMOUNT_IS_NOT_ENOUGH') {
        Alert.alert('Kiểm tra lại thông tin giải ngân hoặc số tiền giải ngân');
      } else if (result === 'ERROR_STATUS_NOT_FOR_CONTROL') {
        Alert.alert('Kiểm tra lại số tiền chưa được đối soát');
      } else {
        toast.show({
          description: result,
        })
        bankerStore.getListLoan({status: tab}, { page: 1, limit: 20 })
        navigation.goBack()
      }
    }
  }, [alert, navigation])

  const renderNotes = useCallback(() => {
    if (notes?.length)
      return (
        <Box bg="white" borderRadius="8" p="4" mt="4">
          <Text color="ebony" size="semiBold14" text="Ghi chú của ngân hàng" />
          <Box height="1.0" my="3" bg="iron" opacity={0.5} />

          <Note id={dealDetailId} />
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
    return (
      <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
        <Text
          color="ebony"
          fontSize={14}
          lineHeight={20}
          fontWeight="600"
          text="Quá trình giải ngân:"
        />
        {transactionDetail?.transactionDetails?.length > 0 && <>
          <Box height="1.0" my="3" bg="iron" opacity={0.5} />
          {transactionDetail?.transactionDetails?.map((item, index) =>
            renderItem({
              item: {
                label: `${numeral(item.amount).format("0,0")} VNĐ`,
                value: "",
              },
              index: index,
              rightComponent: (
                <Text
                  size="medium12"
                  flex="1"
                  textAlign="right"
                  color={
                    item.status === TRANSACTION_STATUS_TYPES.FOR_CONTROL
                      ? "green"
                      : item.status === TRANSACTION_STATUS_TYPES.CANCELLED
                        ? "red"
                        : "orange"
                  }
                  text={
                    item.status === TRANSACTION_STATUS_TYPES.FOR_CONTROL
                      ? "Đã đối soát"
                      : item.status === TRANSACTION_STATUS_TYPES.CANCELLED
                        ? "Huỷ"
                        : "Chưa đối soát"
                  }
                />
              ),
            }),
          )}</>}

        {data?.dealDetails?.[0]?.status === LOAN_STATUS_TYPES.DISBURSING && <>
          <Box height="1.0" my="3" bg="iron" opacity={0.5} />

          <Pressable
            onPress={() => {
              if (!dealDetail?.info?.approvalAmount || dealDetail?.info?.approvalAmount === 0) {
                Alert.alert('Chưa phê duyệt số tiền cần giải ngân');
              } else {
                setCreateTransactionVisible(true)
              }
            }}
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <PlusBottomSvg />
          </Pressable>
        </>}
      </Box>
    )
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
    switch (data?.dealDetails?.[0]?.status) {
      case LOAN_STATUS_TYPES.WAIT_PROCESSING:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Tiếp nhận", () => {
              setAlert({
                visible: true,
                type: "confirm",
                message: "Bạn muốn tiếp nhận hồ sơ này?",
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
            {buttonConfirm("Thẩm định", () => {
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
      case LOAN_STATUS_TYPES.APPRAISAL_PROGRESS:
        return (
          <HStack mt="4" mb="6">
            {buttonReject()}
            {buttonConfirm("Duyệt cho vay", () => {
              setEditLoanResultVisible(true)

              // setAlert({
              //   visible: true,
              //   type: "confirm",
              //   message: "Bạn muốn duyệt cho vay hồ sơ này?",
              //   confirmText: "Duyệt cho vay",
              //   status: LOAN_STATUS_TYPES.LEND_APPROVAL,
              // })
            })}
          </HStack>
        )
      case LOAN_STATUS_TYPES.LEND_APPROVAL:
        return (
          <Box>
            {/* <Button
              onPress={onReject}
              bg="white"
              borderWidth="1"
              borderColor="orange"
              flex={1}
              _text={{ fontWeight: "600", fontSize: 16, color: "orange" }}
            >
              Từ chối hồ sơ
            </Button> */}
            <HStack mt="0" mb="6">
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
            {/* {buttonReject()} */}
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
            {/* {buttonReject()} */}
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
            <Text size="semiBold12" color="grayChateau" text={`HSV - ${data?._iid}`} />
          </Box>
        }
        renderRightIcon={<NotificationSvg />}
      />
      {data?.dealDetails?.[0]?.status !== LOAN_STATUS_TYPES.CANCELLED ? (
        <BankerLoanSteps activeIndex={LOAN_STEP_INDEX[data?.dealDetails?.[0]?.status]} mb="1" />
      ) : (
        <View style={{ alignItems: "center", marginTop: s(20) }}>
          <Text
            color="lightGray"
            size="semiBold14"
            text={
              data?.status === LOAN_STATUS_TYPES.CANCELLED
                ? "FINA đã huỷ bỏ hồ sơ"
                : "Ngân hàng từ chối hồ sơ"
            }
          />
        </View>
      )}
      <ScrollView>
        <Box mb="6" mx="4" mt="5">
          <Box bg="white" borderRadius="8" p="4">
            <Text color="ebony" size="semiBold14" text="Khách hàng" />
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: { label: "Họ tên", value: name },
              index: 0,
              rightComponent: renderCall(name, data?.user?.tels?.[0]?.tel),
            })}
            {renderItem({ item: { label: "Giới tính", value: renderGender() }, index: 1 })}
            {/* {renderItem({ item: { label: "Phương án", value: "-" }, index: 2 })} */}
            {renderItem({ item: { label: "Yêu cầu", value: "-" }, index: 3 })}
            {renderItem({ item: { label: "Thông tin bổ sung", value: "-" }, index: 4 })}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text size="semiBold14" text="Hồ sơ cho vay" />
              {/* <Pressable onPress={() => setEditDocumentLoanVisible(true)}>
                <EditSvg />
              </Pressable> */}
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({ item: { label: "Sản phẩm", value: data?.product?.name }, index: 0 })}
            {renderItem({
              item: { label: "Mã SP CĐT", value: data?.apartmentCodeInvestor || "-" },
              index: 1,
            })}
            {renderItem({
              item: { label: "Mã căn hộ", value: data?.realEstateInfo?.apartmentCode || "-" },
              index: 2,
            })}
            {renderItem({
              item: { label: "Địa chỉ", value: data?.realEstateInfo?.address || "_" },
              index: 3,
            })}
            {renderItem({
              item: {
                label: "Số tiền khách yêu cầu vay",
                value: `${numeral(data?.loanMoney).format("0,0")} ${data?.suffix || "vnđ"}`,
              },
              index: 4,
            })}
            {renderItem({
              item: {
                label: "Thời gian vay",
                value: `${data?.timeLoan || 0} (Tháng)`,
              },
              index: 5,
            })}
            {renderItem({
              item: {
                label: "Thời gian tạo",
                value: moment(data?.createdAt).format("DD/MM/YYYY | hh:mm"),
              },
              index: 6,
            })}
            {renderItem({
              item: { label: "Nhân viên FINA", value: data?.createdBy?.fullName },
              index: 7,
              rightComponent: renderCall(data?.createdBy?.fullName, data?.createdBy?.tels?.[0]?.tel),
            })}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="ebony" size="semiBold14" text="Kết quả" />
              {
                data?.dealDetails?.[0]?.status === LOAN_STATUS_TYPES.LEND_APPROVAL &&
                <Pressable onPress={() => setEditLoanResultVisible(true)}>
                  <EditSvg />
                </Pressable>
              }
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: {
                label: "Số tiền phê duyệt",
                value: dealDetail?.info?.approvalAmount
                  ? `${numeral(dealDetail?.info?.approvalAmount).format("0,0")} VNĐ`
                  : "-",
              },
              index: 0,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Thời gian vay",
                value: dealDetail?.info?.borrowTime ? `${dealDetail?.info?.borrowTime} Tháng` : "_",
              },
              index: 1,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Ngày phê duyệt",
                value: dealDetail?.info?.approvalDate
                  ? moment(dealDetail?.info?.approvalDate).format("DD/MM/YYYY | hh:mm")
                  : "-",
              },
              index: 2,
              required: true,
            })}
            {renderItem({
              item: {
                label: "Mã hồ sơ phía ngân hàng",
                value: dealDetail?.info?.codeBankProfile,
              },
              index: 3,
            })}
            {renderItem({
              item: {
                label: "Mã khách hàng phía ngân hàng",
                value: dealDetail?.info?.codeBankCustomer,
              },
              index: 4,
            })}
          </Box>
          {/* {renderNotes()} */}
          {data?.dealDetails?.[0]?.status === LOAN_STATUS_TYPES.DISBURSING && renderTransactionDetails()}
          {renderDocuments()}
          {renderNotes()}
          {
            (data?.dealDetails?.[0]?.status !== LOAN_STATUS_TYPES.CANCELLED && data?.status !== LOAN_STATUS_TYPES.CANCELLED)
            && <Box mt={vs(34)}>{renderFooterButton()}</Box>
          }
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
      <PopupEditLoanDocument
        visible={editDocumentLoanVisible}
        onClose={() => setEditDocumentLoanVisible(false)}
        onConfirm={() => {
          //
        }}
      />
      <PopupEditLoanResult
        visible={editLoanResultVisible}
        onClose={() => setEditLoanResultVisible(false)}
        data={dealDetail?.info}
        onConfirm={(value) => {
          bankerStore
            .updateInfoOfDealDetail(dealDetailId, {
              info: {
                ...value,
                approvalAmount: parseFloat(value.approvalAmount?.replace(/,/g, ''))
              },
              dealId: data?.id,
              partnerStaffId: dealDetail?.partnerStaffId,
              partnerCodeName: dealDetail?.partnerCodeName,
              executePartnerId: dealDetail.executePartnerId,
            })
            .then(() => {
              setEditLoanResultVisible(false)

              if (data?.dealDetails?.[0]?.status === LOAN_STATUS_TYPES.APPRAISAL_PROGRESS) {
                bankerStore.updateDealStatus(dealDetailId, LOAN_STATUS_TYPES.LEND_APPROVAL, objectId).then(() => {
                  bankerStore.getListLoan({status: tab}, { page: 1, limit: 20 })
                  navigation.goBack()
                })
              }
            })
        }}
      />

      {createTransactionVisible &&
        <PopupCreateTransaction
          visible={createTransactionVisible}
          onClose={() => setCreateTransactionVisible(false)}
          data={dealDetail?.info}
          onConfirm={(value) => {
            bankerStore.createTransaction(
              {
                historiesDisbursement: [{
                  disbursedAmount: parseFloat(value?.disbursedAmount?.replace(/,/g, '')),
                  paymentDate: value?.paymentDate
                }],
                dealId: objectId,
                dealDetailId: dealDetailId,
                partnerId: dealDetail?.partnerId,
                productId: data?.productId,
                categoryId: data?.categoryId,
                staffId: data?.assigneeId,
                customerId: data?.userId,
                productCategory: data?.category?.productCategory,
                executePartnerId: dealDetail.executePartnerId,
                partnerStaffId: dealDetail?.partnerStaffId,
                consultantStaffId: data?.sourceId
              }
            ).then((res) => {
              if (res?.error) {
                Alert.alert(res?.error?.message || 'Error');
              } else {
                getTransactionDeal()
                setCreateTransactionVisible(false)
              }
            })
          }} />
      }
    </Box>
  )
})

export default BankerLoanDetailScreen
