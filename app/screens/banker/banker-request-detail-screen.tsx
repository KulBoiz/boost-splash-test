/* eslint-disable react-native/no-color-literals */
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Box, HStack, Pressable, ScrollView } from "native-base"
import numeral from "numeral"
import React, { FC, useCallback, useState } from "react"
import { Alert, KeyboardAvoidingView, View } from "react-native"
import { ScaledSheet, vs } from "react-native-size-matters"
import { Text } from "../../components"
import AppHeader from "../../components/app-header/AppHeader"
// import { FastImage } from "../../components/fast-image/fast-image"
import Note from "../../components/note/note"
import PopupAlert from "../../components/popup-alert/popup-alert"
import { useStores } from "../../models"
import { color } from "../../theme"
import PopupConfirm from "./components/popup-confirm"
import PopupReject from "./components/popup-reject"
import { getSurveyDetails, getSurveyName, STATUS_BANK_FEED_BACK } from "./constants"

const BankerRequestDetailScreen: FC = observer((props: any) => {
  const navigation = useNavigation()
  const { bankerStore, authStoreModel } = useStores()

  const [rejectVisible, setRejectVisible] = useState<boolean>(false)
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false)
  const [alert, setAlert] = useState<any>({
    visible: false,
    data: {},
    type: "reject",
    message: "",
  })

  const data = props?.route?.params?.data
  const name = getSurveyName(data?.surveyDetails)
  const bankerFeedBack = data?.bankFeedbacks?.find((el) => el?.userId === authStoreModel?.user?.id)
    ?.content

  const showPopupReject = useCallback(() => setRejectVisible(true), [])
  const hidePopupReject = useCallback(() => setRejectVisible(false), [])
  const showPopupConfirm = useCallback(() => setConfirmVisible(true), [])
  const hidePopupConfirm = useCallback(() => setConfirmVisible(false), [])

  const onConfirmReject = useCallback(
    (note) => {
      hidePopupReject()
      setTimeout(() => {
        setAlert({
          visible: true,
          data: {
            bankNote: note,
            userId: authStoreModel.userId,
            orgId: authStoreModel?.user?.orgId,
            responseStatus: "reject",
            responseDate: new Date().toISOString(),
          },
          type: "reject",
          message: "Bạn có chắc muốn từ chối\nhồ sơ này?",
        })
      }, 500)
    },
    [data, authStoreModel.userId],
  )

  const onConfirmReceived = useCallback(
    (data) => {
      hidePopupConfirm()
      setTimeout(() => {
        setAlert({
          visible: true,
          data: {
            bankNote: data.bankNote,
            content: {
              loanDemand: data.loanDemand,
              borrowTime: data.borrowTime,
              interestRate: data.interestRate,
              preferentialTime: data.preferentialTime,
              prepaidTermFee: data.prepaidTermFee,
              propertyValuation: data.propertyValuation,
            },
            userId: authStoreModel.userId,
            orgId: authStoreModel?.user?.orgId,
            responseStatus: "received",
            responseDate: new Date().toISOString(),
          },
          type: "confirm",
          message: "Bạn có chắc muốn tiếp nhận\nhồ sơ này?",
        })
      }, 500)
    },
    [data, authStoreModel.userId],
  )

  const onAlertConfirm = useCallback(() => {
    bankerStore
      .updateSurveyTask(data?.taskId, alert.data)
      .then(() => {
        Alert.alert("Đã phản hồi thành công")
        bankerStore.getListRequest({}, { page: 1, limit: 20 }, true)
        setAlert({ visible: false })
        navigation.goBack()
      })
      .catch(() => {
        Alert.alert("Lỗi")
      })
  }, [alert, navigation])

  const documents = [
    "Xác nhận tình trạng hôn nhân",
    "CMND Mới / Cũ (Nếu có) của Vợ / Chồng KH",
    "Hộ khẩu (Sao y/ Chụp hình)",
    "Sổ tạm trú",
    "Giấy đăng ký kết hôn (Sao y)",
    "Hộ chiếu",
    "CMND/CCCD của 2 vợ chồng",
  ]

  const renderItem = useCallback((item, index) => {
    return (
      <HStack key={index} mt={index ? 3 : 0}>
        <Text
          color="lighterGray"
          fontSize={14}
          lineHeight={20}
          fontWeight="400"
          flex="1"
          text={item.label}
        />
        <Text
          color="black"
          fontSize={14}
          lineHeight={20}
          fontWeight="500"
          text={item.value}
          flex="1"
          textAlign="right"
        />
      </HStack>
    )
  }, [])

  const renderAction = () => {
    const feedBack = data?.bankFeedbacks?.find((el) => el?.userId === authStoreModel?.user?.id)

    if (
      feedBack?.responseStatus === STATUS_BANK_FEED_BACK.waiting_to_receive ||
      !feedBack?.responseStatus
    ) {
      return true
    }

    return false
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      contentContainerStyle={{ flex: 1 }}
      style={{ flex: 1 }}
    >
      <Box flex="1" bg="lightBlue">
        <AppHeader
          renderTitle={
            <Box
              position="absolute"
              bottom="4.0"
              left="0"
              right="0"
              justifyContent="flex-end"
              alignItems="center"
              pointerEvents="none"
            >
              <Text color="ebony" fontSize={14} lineHeight={20} fontWeight="700" text={name} />
              <Text
                color="grayChateau"
                fontSize={12}
                lineHeight={17}
                fontWeight="600"
                text={`HSV - ${data._iid}`}
              />
            </Box>
          }
        />
        <ScrollView>
          <Box mt="6" mx="4">
            <Box bg="white" borderRadius="8" p="4">
              <Text
                color="ebony"
                fontSize={14}
                lineHeight={20}
                fontWeight="600"
                text="Thông tin khoản vay"
              />
              <Box height="1.0" my="3" bg="iron" opacity={0.5} />
              {getSurveyDetails(data?.surveyDetails).map((item, index) => renderItem(item, index))}
            </Box>

            {bankerFeedBack && (
              <Box bg="white" borderRadius="8" p="4" mt="4">
                <Text
                  color="ebony"
                  fontSize={14}
                  lineHeight={20}
                  fontWeight="600"
                  text="Thông tin chào gói vay"
                />
                <Box height="1.0" my="3" bg="iron" opacity={0.5} />
                <HStack mt={0}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Khả năng vay:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={`${numeral(bankerFeedBack?.loanDemand).format("0,0")} vnđ`}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
                <HStack mt={3}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Định giá tài sản sơ bộ dự kiến:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={bankerFeedBack?.propertyValuation}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
                <HStack mt={3}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Số tháng cho vay:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={`${bankerFeedBack?.borrowTime} Tháng`}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
                <HStack mt={3}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Thời gian ưu đãi dự kiến:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={`${bankerFeedBack?.preferentialTime} Tháng`}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
                <HStack mt={3}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Lãi xuất ưu đãi dự kiến:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={`${bankerFeedBack?.interestRate} %`}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
                <HStack mt={3}>
                  <Text
                    color="lighterGray"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="400"
                    flex="1"
                    text={"Phí trả trước hạn dự kiến:"}
                  />
                  <Text
                    color="black"
                    fontSize={14}
                    lineHeight={20}
                    fontWeight="500"
                    text={`${numeral(bankerFeedBack?.prepaidTermFee).format("0,0")} vnđ`}
                    flex="1"
                    textAlign="right"
                  />
                </HStack>
              </Box>
            )}

            <Box bg="white" borderRadius="8" p="4" mt="4">
              <Text
                color="ebony"
                fontSize={14}
                lineHeight={20}
                fontWeight="600"
                text="Các hồ sơ cần chuẩn bị"
              />
              <Box height="1.0" my="3" bg="iron" opacity={0.5} />
              {documents.map((item, index) => (
                <HStack key={index} mt={index ? 3 : 0} alignItems="center">
                  <Box width="1" height="1" rounded="full" bg="black" mr="1" />
                  <Text
                    color="black"
                    fontSize={12}
                    lineHeight={17}
                    fontWeight="400"
                    text={item}
                    textTransform="capitalize"
                  />
                </HStack>
              ))}
            </Box>
            <View style={[styles.contentItem, styles.contentItemNote]}>
              <Note id={data?.taskId} />
            </View>
            {renderAction() && (
              <HStack mt="4" mb="6">
                <Pressable
                  onPress={showPopupReject}
                  flex="1"
                  bg="white"
                  borderWidth="1"
                  h={vs(51)}
                  borderRadius="8"
                  borderColor="primary"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize={16} fontWeight="600" color="primary" tx="banker.reject" />
                </Pressable>
                <Pressable
                  onPress={showPopupConfirm}
                  flex="1"
                  h={vs(51)}
                  borderRadius="8"
                  bg="primary"
                  alignItems="center"
                  justifyContent="center"
                  ml="4"
                >
                  <Text fontSize={16} fontWeight="600" color="white" tx="banker.approve" />
                </Pressable>
              </HStack>
            )}
          </Box>
        </ScrollView>

        {renderAction() && (
          <>
            <PopupReject
              visible={rejectVisible}
              onClose={hidePopupReject}
              onConfirm={onConfirmReject}
            />
            <PopupConfirm
              visible={confirmVisible}
              onClose={hidePopupConfirm}
              onConfirm={onConfirmReceived}
            />
          </>
        )}

        <PopupAlert
          visible={alert.visible}
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
          onConfirm={onAlertConfirm}
        />
      </Box>
    </KeyboardAvoidingView>
  )
})

export default BankerRequestDetailScreen

const styles = ScaledSheet.create({
  contentItem: {
    borderRadius: "8@s",
    marginTop: "16@s",
    backgroundColor: color.palette.white,
  },
  contentItemNote: {
    padding: "8@s",
  },
})
