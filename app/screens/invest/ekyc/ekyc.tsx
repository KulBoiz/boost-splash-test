import React from "react"
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import AppHeader from "../../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { ScrollView } from "native-base"
import AppButton from "../../../components/app-button/AppButton"
import SettingAuthScreen from "../../../components/app-view-no-auth"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import { goBack, navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { FastImage } from "../../../components/fast-image/fast-image"
import { images } from "../../../assets/images"
import { MARGIN_BOTTOM_16, MARGIN_TOP_16, ROW } from "../../../styles/common-style"

interface Props {
}

const note = "Để hoàn tất việc mở tài khoản trên FINA, quý khách vui lòng thực hiện các bước xác thực thông tin bên dưới"

const EKYC = observer((props: Props) => {
  const { authStoreModel } = useStores()

  const handleStart = React.useCallback(() => {
    // navigate(ScreenNames.UPDATE_IDENTITY_INFORMATION)
    navigate(ScreenNames.CONFIRM_EKYC)
  }, [])

  const handlePress = React.useCallback(() => {
    goBack()
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={"EKYC"} isBlue />
      {
        authStoreModel.isLoggedIn ?
          <View style={{flex:1}}>
            <View style={styles.noteContainer}>
              <AppText value={"Xác thực thông tin - eKYC"} style={styles.title} textAlign={"center"} />
              <AppText value={note} style={styles.noteText} textAlign={"center"} />
            </View>
            <View style={styles.idContainer}>
              <AppText value={'1. Chụp mặt trước, mặt sau CMND/CCCD'} style={styles.label}/>
              <View style={[ROW, MARGIN_BOTTOM_16]}>
                <FastImage source={images.invest_front} style={styles.image}/>
                <FastImage source={images.invest_back} style={styles.image}/>
              </View>
              <AppText value={'2. Chụp ảnh chân dung'} style={styles.label}/>
              <FastImage source={images.invest_portrait} style={styles.image}/>
            </View>
            <View style={styles.btnContainer}>
              <AppButton title={"Bắt đầu"} onPress={handleStart} />
              <AppButton title={'Thực hiện sau'} onPress={handlePress} containerStyle={styles.btn} titleStyle={styles.titleStyle}/>
            </View>
          </View>
          :
          <SettingAuthScreen />
      }
    </View>
  )
})

export default EKYC

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flex: 1,
  },
  idContainer:{
    paddingHorizontal: '16@s',
    flex:1,
    marginTop: '24@s'
  },
  label: {
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    marginBottom: '16@s'
  },
  image: {
    width: '131@s',
    height: '82@s',
    borderRadius: '4@s',
    marginRight: '8@s'
  },
  title: {
    fontSize: "20@ms",
    fontFamily: fontFamily.bold,
    marginBottom: "8@s",
  },
  noteText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.regular,
    lineHeight: "21@ms",
  },
  noteContainer: {
    marginTop: "24@s",
    paddingVertical: "8@s",
    paddingHorizontal: "16@s",
  },
  btnContainer: {
    paddingHorizontal: "16@s",
    paddingTop: "12@s",
    paddingBottom: "24@s",
  },
  btn: {
    backgroundColor: color.palette.whiteDarker ,
    marginTop: '16@s'
  },
  titleStyle: {
    color: color.palette.black,
    fontFamily: fontFamily.regular
  }
})
