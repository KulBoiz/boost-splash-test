/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { Avatar, Box, Button, HStack, Pressable, ScrollView } from "native-base"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../components"
import PopupAlert from "./components/popup-alert"
import numeral from "numeral"
import moment from "moment"
import { BellSvg, CallSvg, EditSvg, NotificationSvg, PictureSvg } from "../../assets/svgs"
import { Linking } from "react-native"
import DocumentView from "./components/document-view"
import BankerLoanSteps from "./components/banker-loan-steps"
import { LOAN_STATUS_TYPES, LOAN_STEP_INDEX } from "./constants"

const BankerLoanDetailScreen: FC = observer((props: any) => {
  const navigation = useNavigation()
  const { bankerStore, authStoreModel } = useStores()

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

  const getNotes = useCallback(async () => {
    const result = await bankerStore.getNotes(data?.dealDetails?.[0]?.id)
    setNotes(result)
  }, [data])

  const getTransactionDeal = useCallback(async () => {
    const result = await bankerStore.getTransactionDeal(data?.dealDetails?.[0]?.id)
  }, [data])

  useEffect(() => {
    getNotes()
    getTransactionDeal()
  }, [])

  const onReject = useCallback(() => {
    setTimeout(() => {
      setAlert({
        visible: true,
        type: "reject",
        message: "Bạn có chắc muốn từ chối\nhồ sơ này?",
      })
    }, 500)
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
    setAlert({ visible: false })
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

  const renderItem = useCallback((item, index: any, rightComponent?: any) => {
    return (
      <HStack mt={index ? vs(12) : 0} key={index}>
        <Text
          color="lighterGray"
          fontSize={14}
          lineHeight={20}
          fontWeight="400"
          text={item.label}
        />
        {rightComponent || (
          <Text color="ebony" size="medium12" text={item.value} flex="1" textAlign="right" />
        )}
      </HStack>
    )
  }, [])

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

  const renderGuestDocument = useCallback(() => {
    const noPhoto = () => (
      <Box flex={1} height={152} alignItems="center" justifyContent="center" bg="#C4C4C4">
        <PictureSvg />
      </Box>
    )
    return (
      <Box mt={vs(16)}>
        <Text
          color="ebony"
          fontSize={14}
          lineHeight={20}
          fontWeight="600"
          text="Giấy tờ của khách"
        />
        <DocumentView title="CMND / CCCD / Hộ chiếu" mt={s(8)}>
          <HStack>
            {noPhoto()}
            <Box width={s(15)} />
            {noPhoto()}
          </HStack>
        </DocumentView>
        <DocumentView title="Đăng ký kết hôn" mt={s(12)} status="updated" />
        <DocumentView title="Sao kê lương" mt={s(12)} />
        <DocumentView title="Hợp đồng lao động" mt={s(12)} status="updated" />
      </Box>
    )
  }, [])

  const renderDisbursementProcess = useCallback(() => {
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
        {renderItem(
          {
            label: "10.000.000vnđ",
            value: "",
          },
          0,
          <Text size="medium12" flex="1" textAlign="right" color="orange" text="Chưa đối soát" />,
        )}
        {renderItem(
          { label: "10.000.000vnđ", value: "" },
          1,
          <Text size="medium12" flex="1" textAlign="right" color="green" text="Đã đối soát" />,
        )}
      </Box>
    )
  }, [])

  const renderFooterButton = useCallback(() => {
    switch (data.status) {
      case LOAN_STATUS_TYPES.DISBURSING:
        return (
          <Box mt={vs(54)}>
            <HStack mt="4" mb="6">
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
              <Button
                onPress={onExpertise}
                bg="primary"
                flex={1}
                ml="4"
                _text={{ fontWeight: "600", fontSize: 16 }}
              >
                Đã giải ngân
              </Button>
            </HStack>
          </Box>
        )
      case LOAN_STATUS_TYPES.DISBURSED:
        return null

      default:
        return (
          <Box mt={vs(54)}>
            <HStack mt="4" mb="6">
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
              <Button
                onPress={onExpertise}
                bg="primary"
                flex={1}
                ml="4"
                _text={{ fontWeight: "600", fontSize: 16 }}
              >
                Thẩm định
              </Button>
            </HStack>
          </Box>
        )
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
            {renderItem(
              { label: "Họ tên:", value: name },
              0,
              renderCall(name, data.user?.tels?.[0]?.tel),
            )}
            {renderItem({ label: "Giới tính:", value: "-" }, 1)}
            {renderItem({ label: "Phương án:", value: "-" }, 2)}
            {renderItem({ label: "Yêu cầu:", value: "-" }, 3)}
            {renderItem({ label: "Thông tin bổ sung:", value: "-" }, 4)}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text size="semiBold14" text="Hồ sơ cho vay" />
              <Pressable>
                <EditSvg />
              </Pressable>
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({ label: "Sản phẩm:", value: data?.product?.name }, 0)}
            {renderItem({ label: "Mã SP CĐT:", value: "-" }, 1)}
            {renderItem(
              { label: "Mã căn hộ:", value: data?.realEstateInfo?.apartmentCode || "-" },
              2,
            )}
            {renderItem({ label: "Địa chỉ", value: "-" }, 3)}
            {renderItem(
              {
                label: "Số tiền khách yêu cầu vay:",
                value: `${numeral(data?.loanMoney).format("0,0")} ${data?.suffix || "vnđ"}`,
              },
              4,
            )}
            {renderItem(
              {
                label: "Thời gian vay:",
                value: `${data.timeLoan || 0} (Năm)`,
              },
              5,
            )}
            {renderItem(
              {
                label: "Thời gian tạo:",
                value: moment(data.createdAt).format("DD/MM/YYYY | hh:mm"),
              },
              6,
            )}
            {renderItem(
              { label: "Nhân viên FINA:", value: data?.createdBy?.fullName },
              7,
              renderCall(data?.createdBy?.fullName, data.createdBy?.tels?.[0]?.tel),
            )}
          </Box>
          <Box bg="white" borderRadius="8" p="4" mt={vs(8)}>
            <HStack alignItems="center" justifyContent="space-between">
              <Text color="ebony" size="semiBold14" text="Kết quả" />
              <Pressable>
                <EditSvg />
              </Pressable>
            </HStack>
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem(
              {
                label: "Số tiền phê duyệt *:",
                value: "-",
              },
              0,
            )}
            {renderItem(
              {
                label: "Thời gian vay:",
                value: "-",
              },
              1,
            )}
            {renderItem(
              {
                label: "Ngày phê duyệt *:",
                value: "-",
              },
              2,
            )}
            {renderItem(
              {
                label: "Mã hồ sơ phía ngân hàng *:",
                value: "-",
              },
              3,
            )}
            {renderItem(
              {
                label: "Mã khách hàng phía ngân hàng *:",
                value: "-",
              },
              4,
            )}
          </Box>
          {renderNotes()}
          {renderDisbursementProcess()}
          {renderGuestDocument()}
          {renderFooterButton()}
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
      />
    </Box>
  )
})

export default BankerLoanDetailScreen
