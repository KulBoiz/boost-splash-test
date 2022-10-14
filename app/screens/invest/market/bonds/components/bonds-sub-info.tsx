import React, { useCallback } from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { formatDate, width } from "../../../../../constants/variable"
import FastImage from "react-native-fast-image"
import {
  FONT_MEDIUM_12,
  FONT_MEDIUM_14, FONT_REGULAR_12,
  FONT_SEMI_BOLD_12,
  MARGIN_BOTTOM_4,
  MARGIN_BOTTOM_8, MARGIN_TOP_8,
  ROW,
} from "../../../../../styles/common-style"
import { color } from "../../../../../theme"
import { fontFamily } from "../../../../../constants/font-family"
import { images } from "../../../../../assets/images"
import AppButton from "../../../../../components/app-button/AppButton"
import { navigate } from "../../../../../navigators"
import { ScreenNames } from "../../../../../navigators/screen-names"

interface Props {
  data: any
}

interface ItemVerticalProps {
  title: string
  content: string
  textAlign?: "left" | "right"
  style?: ViewStyle | any
}

const ItemVertical = React.memo(({ title, content, textAlign = "left", style }: ItemVerticalProps) => {
  return (
    <View style={style}>
      <AppText value={title} fontSize={ms(11)} color={color.palette.deepGray} style={MARGIN_BOTTOM_4}
               textAlign={textAlign} />
      <AppText value={content} fontSize={ms(14)} fontFamily={fontFamily.bold}
               textAlign={textAlign} />
    </View>
  )
})

const Item = React.memo(({ title, content, style }: ItemVerticalProps) => {
  return (
    <View style={style}>
      <AppText value={title} color={color.palette.blue} style={FONT_SEMI_BOLD_12} />
      <AppText value={content} style={FONT_REGULAR_12} />
    </View>
  )
})


const BondsSubInfo = React.memo(({ data }: Props) => {
  const org = data?.org
  const info = data?.info
  const { name, description } = org;
  const { maturityDate, releaseDate } = info

  const handleRequest = useCallback(() => {
    navigate(ScreenNames.REQUEST_COUNSELLING)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <AppText value={"Các mốc thời gian trả lãi"} style={styles.label} />
        <View style={ROW}>
          <ItemVertical title={"Ngày phát hành:"} content={formatDate(releaseDate)} style={styles.firstContent} />
          <ItemVertical title={"Ngày trả lãi thứ cuối cùng và là ngày đáo hạn:"} content={formatDate(maturityDate)} />
        </View>
      </View>

      <FastImage source={images.bonds_background} style={styles.image}>
        <AppText value={"Liên hệ tư vấn"} fontSize={ms(14)} fontFamily={fontFamily.bold} />
        <AppText value={"Chuyên viên tư vấn đã sẵn sàng hỗ trợ"} />
        <AppButton title={"Yêu cầu tư vấn"} colorBtn={color.palette.orange} containerStyle={styles.btn}
                   onPress={handleRequest}
                   titleStyle={styles.titleBtn}
        />
      </FastImage>

      <View style={styles.body}>
        <AppText value={"Thông tin"} style={styles.label} />
        <AppText value={description}/>
        <View style={styles.orgContainer}>
          <Item title={'Tổ chức phát hành'} content={name} style={MARGIN_BOTTOM_4}/>
          <Item title={'Tài sản đầu tư'} content={'Trái phiếu'} style={MARGIN_TOP_8}/>
        </View>
      </View>
    </View>
  )
})

export default BondsSubInfo

const styles = ScaledSheet.create({
  container: {},
  body: {
    paddingHorizontal: "16@s",
  },
  label: {
    fontFamily: fontFamily.medium,
    fontSize: "16@ms",
    color: color.primary,
    marginBottom: "12@s",
  },
  firstContent: {
    marginRight: "24@s",
  },
  image: {
    width: width,
    paddingTop: "12@s",
    paddingBottom: "16@s",
    paddingHorizontal: '24@s',
    marginVertical: '16@s'
  },
  titleBtn: {
    fontSize: '11@s',
  },
  btn: {
    width: "115@s",
    height: "30@s",
    borderRadius: '4@s',
    marginTop: '4@s'
  },
  orgContainer: {
    backgroundColor: color.palette.lightBlue,
    borderRadius: '8@s',
    padding: '16@s',
    marginTop: '16@s'
  }
})