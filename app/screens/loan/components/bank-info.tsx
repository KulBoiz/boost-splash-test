import React from 'react';
import { View, Image, TouchableOpacity } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { BlueTickSvg, StarSvg, TickSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"
import InterestRate from "./interest-rate"
import { truncateString } from "../../../constants/variable"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../../styles/common-style"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface BankInfoProps{
  item: any
  hasBorder?: boolean
}

const BankInfo = React.memo((props: BankInfoProps) => {
  const {item, hasBorder} = props
  const imageUrl = item?.org?.image?.url
  const backgroundColor = item?.org?.backgroundColor
  const outstandingAdvantages = item?.outstandingAdvantages
  const advantages = item?.advantages?.split("\n")

  return (
    <View style={[styles.container, [styles.border, {borderColor: backgroundColor ?? color.lightBlack}]]}>
      <View style={[styles.header, {backgroundColor: backgroundColor ?? '#005992'}]}>
         <FastImage source={{uri:  imageUrl}} style={styles.bankIcon} resizeMode={'contain'}/>
      </View>

      <View style={styles.body}>
        <View style={styles.headerContent}>
          <AppText value={truncateString(item?.name, 25)} style={styles.name}/>
          {outstandingAdvantages &&
            <View style={styles.row}>
              <StarSvg />
              <AppText value={outstandingAdvantages} style={styles.outstandingAdvantages}/>
            </View>
          }
        </View>
        <InterestRate interestRate={item?.info?.preferentialRate} endow={item?.info?.preferentialTime} month={12}/>

        <View style={styles.contentContainer}>
          {
            advantages?.length ? advantages.map((val, id) => {
              const isLastItem = advantages?.length - 1 === id
              return(
                  <View key={id.toString()} style={[ROW, ALIGN_CENTER, !isLastItem && MARGIN_BOTTOM_8]}>
                    <BlueTickSvg style={{marginRight: ms(5)}}/>
                    <AppText value={val} fontSize={ms(12)}/>
                  </View>
                )
              }) :
                <AppText value={item?.advantages}/>
          }
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigate(ScreenNames.REQUEST_COUNSELLING)}>
          <AppText value={'Yêu cầu tư vấn'} fontSize={ms(14)} color={color.primary}/>
        </TouchableOpacity>
      </View>
    </View>
  )
});

export default BankInfo;
BankInfo.displayName = 'BankInfo'

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginBottom: '12@s'
  },
  border: {
    borderWidth: 1
  },
  bankIcon: {
    width: '80@s',
    height:'30@s'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  interestRateContainer: {
    paddingVertical: '16@s',
  },

  header: {
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s',
    paddingRight: '12@s',
    paddingVertical: '4@s',
  },
  name: {
    lineHeight: '16@s',
    fontFamily: fontFamily.semiBold,
    fontSize: '12@ms',
    color: color.lightBlack
  },
  body: {
    paddingBottom: '12@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    padding: '12@s',
  },
  contentContainer: {
    padding: '12@s'
  },
  outstandingAdvantages: {
    lineHeight: '16@s',
    marginLeft: '8@ms',
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.orange
  },
  button: {
    backgroundColor: '#E4EDFF',
    alignItems: "center",
    borderRadius: '4@s',
    paddingVertical: '8@s',
    marginHorizontal: '12@s'
  }
});
