import React from 'react';
import { View, Pressable } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { AppText } from '../../components/app-text/AppText';
import { truncateString } from '../../constants/variable';
import { BlueTickSvg } from "../../assets/svgs"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../styles/common-style"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { images } from "../../assets/images"

interface InsuranceItemProps{
  item: any
}
const content = "Bảo vệ bạn trước rủi ro tai nạn 27/4\nGiá tối thiểu chỉ 230 đồng/ngày và 84.000 đồng/ năm\nNhận hoa hồng tới 34% Phí bảo hiểm ( NO VAT)"


const InsuranceItem = React.memo((props: InsuranceItemProps) => {
  const {item} = props
  const imageUrl = item?.org?.image?.url
  // const advantages = item?.advantages?.split("\n")
  const productContent = content.split("\n")

  const handlePress = () => {
    // navigate(ScreenNames.LOAN_DETAIL)
  }
  return (
    <Pressable
      style={[styles.container, styles.border]}
      onPress={handlePress}>
      <View style={styles.header}>
          <View style={[ROW, ALIGN_CENTER]} >
            {/* <FastImage source={{uri:  imageUrl}} style={styles.bankIcon} resizeMode={'contain'}/> */}
            <FastImage source={images.avatarDefault} style={styles.bankIcon}/>
            <View>
              <AppText value={'Bảo hiểm'} fontSize={ms(11)} />
              <AppText value={'Tai nạn cá nhân'} fontSize={ms(14)} fontFamily={fontFamily.bold} color={color.primary}/>
            </View>
          </View>
          <FastImage source={images.arrow_right} style={styles.rightIcon}/>
      </View>

      <View style={styles.body}>
          {
            productContent?.length ? productContent.map((val, id) => {
              const isLastItem = productContent?.length - 1 === id
              return(
                  <View key={id.toString()} style={[ROW, ALIGN_CENTER, !isLastItem && MARGIN_BOTTOM_8]}>
                    <BlueTickSvg style={{marginRight: ms(5)}}/>
                    <AppText value={truncateString(val, 45)} fontSize={ms(12)}/>
                  </View>
                )
              }) :
                <AppText value={item?.advantages}/>
          }
      </View>
    </Pressable>
  )
});

export default InsuranceItem;
InsuranceItem.displayName = 'InsuranceItem'

const styles = ScaledSheet.create({
  container: {
    padding: '20@s',
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginBottom: '12@s',
  },
  border: {
    borderWidth: 1,
    borderColor: color.palette.lightBlack
  },
  rightIcon: {
    width: '16@s',
    height:'16@s',
  },
  bankIcon: {
    width: '64@s',
    height:'24@s',
    marginRight: '16@s'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  header: {
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s',
    flexDirection: "row",
    alignItems:"center",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.BABABA,
    paddingBottom: '20@s'
  },
  body: {
    paddingTop: '20@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
  },
});
