/* eslint-disable react-native/no-color-literals */
import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useNavigation } from "@react-navigation/native"
import { Box, Button } from "native-base"
import { RequestSuccessSvg } from "../../assets/svgs"
import { Text } from "../../components"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props {}

const InsuranceRequestClaimSuccessScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()

  const goToListClaim = () => {
    navigate(ScreenNames.MANAGE_INSURANCE_LIST, {key: "2"})
  }

  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader style={styles.header} headerTx={"header.requestClaim"} />
      <Box flex="1" alignItems="center" justifyContent="center" mx="6">
        <RequestSuccessSvg />
        <Text fontSize="14" fontWeight="500" mt="6" text="Gửi yêu cầu" />
        <Text fontSize="24" fontWeight="600" color="primary" text="Thành công" />
        <Text
          fontSize="14"
          fontWeight="300"
          color="gray"
          textAlign="center"
          text="Nhân viên FINA đã nhận được yêu cầu từ bạn và sẽ phản hồi trong vòng 24 giờ làm việc"
        />
      </Box>
      <Box px="4">
        <Button onPress={goToListClaim}>Theo dõi lịch sử xử lý</Button>
        <Text
          suppressHighlighting
          onPress={navigation.goBack}
          text="Trở về"
          py="4"
          mb="2"
          textAlign="center"
          fontWeight="600"
          fontSize="14"
          color="primary"
        />
      </Box>
    </Box>
  )
})

export default InsuranceRequestClaimSuccessScreen

const styles = StyleSheet.create({
  header: { backgroundColor: "white", borderBottomWidth: 0 },
})
