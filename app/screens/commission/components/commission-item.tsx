import React from "react"
import { Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { formatDate, hexToRgbA } from "../../../constants/variable"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props {
}

const CommissionItem = React.memo((props: Props) => {
  const name = "Trần Thị Minh Tuyền"
  const date = new Date()

  return (
    <Pressable style={styles.container} onPress={()=> navigate(ScreenNames.COMMISSION_DETAIL)}>
      <View style={[ROW, ALIGN_CENTER]}>
        <FastImage source={images.commission_checked} style={styles.icon} />
        <View>
          <AppText value={name} style={styles.name} />
          <AppText value={formatDate(date)} fontSize={ms(11)} fontFamily={fontFamily.semiBold}
                   color={hexToRgbA(color.palette.black, 0.5)} />
        </View>
      </View>

      <View>
        <AppText value={name} style={styles.name} />
        <View style={[styles.statusContainer, { backgroundColor: "coral" }]}>
          <AppText value={"Chưa đối soát"} color={color.palette.angry} fontSize={ms(12)} />
        </View>
      </View>
    </Pressable>
  )
})

export default CommissionItem

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: '12@s',
    backgroundColor: color.background,
    borderRadius: '12@s',
    marginBottom: '12@s',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 5,
  },
  icon: {
    width: "36@s",
    height: "36@s",
    marginRight: "12@s",
  },
  name: {
    fontSize: "12@ms",
    fontFamily: fontFamily.bold,
    marginBottom: "8@s",
  },
  statusContainer: {
    paddingVertical: "1@s",
    paddingHorizontal: "8@s",
    borderRadius: "10@s",
    alignItems: "center",
  },
})
