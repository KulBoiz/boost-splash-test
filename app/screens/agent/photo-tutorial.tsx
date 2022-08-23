import React from "react"
import { ScrollView, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import ImageTutorialItem from "./components/image-tutorial-item"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { CHECK_CONTENT } from "./constants"
import CheckItem from "./components/check-item"
import { fontFamily } from "../../constants/font-family"
import { FONT_SEMI_BOLD_14 } from "../../styles/common-style"
import AppButton from "../../components/app-button/AppButton"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

interface Props {}

const PhotoTutorial = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Hướng dẫn chụp CMND / CCCD"} isBlue />
      <ScrollView style={styles.body}>
        <AppText value={"Chụp 2 mặt của chứng từ"} style={styles.title} />
        <View style={styles.wrapBigImage}>
          <ImageTutorialItem image={images.id_front} type={"big"} text={"Mặt trước"} />
          <ImageTutorialItem image={images.id_back} type={"big"} text={"Mặt sau"} />
        </View>
        <AppText value={"Về ảnh chụp:"} style={FONT_SEMI_BOLD_14} />
        <View style={styles.wrapSmallImage}>
          <ImageTutorialItem image={images.id_deviate} type={"small"} text={"Ảnh bị lệch "} />
          <ImageTutorialItem image={images.id_too_dark} type={"small"} text={"Ảnh quá tối"} />
          <ImageTutorialItem image={images.id_too_light} type={"small"} text={"Ảnh quá sáng"} />
        </View>
        <AppText value={"Về nội dung:"} style={FONT_SEMI_BOLD_14} />
        {CHECK_CONTENT.map((val, id) => {
          return <CheckItem text={val} key={id.toString()} />
        })}
      </ScrollView>
      <View style={styles.wrapBtn}>
        <AppButton tx={"common.continue"} onPress={() => navigate(ScreenNames.CAPTURE_ID)} />
      </View>
    </View>
  )
})

export default PhotoTutorial

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  body: {
    paddingHorizontal: "16@ms",
  },
  title: {
    textAlign: "center",
    marginVertical: "24@s",
    fontSize: "16@ms",
    fontFamily: fontFamily.bold,
  },
  wrapBigImage: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.EEEEEE,
    paddingBottom: "24@s",
    justifyContent: "space-between",
    marginBottom: "24@s",
  },
  wrapSmallImage: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "24@s",
    marginTop: "16@s",
  },
  wrapBtn: {
    paddingHorizontal: "16@ms",
    marginVertical: "24@s",
  },
})
