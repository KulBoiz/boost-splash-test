import React from 'react';
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { BlueTickSvg, StarSvg } from "../../../assets/svgs"
import FastImage from "react-native-fast-image"
import InterestRate from "./interest-rate"
import { color } from "../../../theme"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { truncateString } from "../../../constants/variable"
import { useStores } from "../../../models"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, MARGIN_TOP_8, ROW } from "../../../styles/common-style"

interface Props{}

const LoanDetailItem = React.memo((props: Props) => {
  const {loanStore} = useStores()
  const item = loanStore.productDetail
  const imageUrl = item?.org?.image?.url
  const outstandingAdvantages = item?.outstandingAdvantages
  const advantages = item?.advantages?.split("\n")?.slice(0,3)
  const backgroundColor = item?.org?.backgroundColor

  return (
    <View style={[styles.container, [styles.border, {borderColor: backgroundColor ?? color.lightBlack}]]}>
      <View style={[styles.header, {backgroundColor: backgroundColor ?? '#005992'}]}>
        <FastImage source={{uri:  imageUrl}} style={styles.bankIcon} resizeMode={'contain'}/>
      </View>

      <View style={styles.body}>
        <View style={styles.headerContent}>
          <AppText value={item?.name} style={styles.name}/>
        </View>
        <InterestRate border interestRate={item?.info?.preferentialRate} endow={item?.info?.preferentialTime} month={12}/>
        <View style={styles.wrapInfo}>
          {outstandingAdvantages &&
            <View style={styles.row}>
              <StarSvg />
              <AppText value={outstandingAdvantages} style={styles.outstandingAdvantages}/>
            </View>
          }
          {
            advantages?.length ? advantages.map((val, id) => {
                return(
                  <View key={id.toString()} style={[ROW, MARGIN_TOP_8, {width: '93%'}]}>
                    <BlueTickSvg style={styles.tick}/>
                    <AppText value={val} fontSize={ms(12)}/>
                  </View>
                )
              }) :
              <AppText value={item?.advantages}/>
          }
        </View>
      </View>
    </View>
  )
});

export default LoanDetailItem;
LoanDetailItem.displayName = 'LoanDetailItem'

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginBottom: '12@s',
  },
  border: {
    borderWidth: 1
  },
  bankIcon: {
    width: '80@s',
    height:'30@s'
  },
  wrapInfo: {
    padding: '12@s'
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
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
  },
  headerContent: {
    padding: '12@s',
  },
  tick: {
    marginRight: '5@ms',
    marginTop: '1@ms'
  },
  outstandingAdvantages: {
    width: '92%',
    lineHeight: '16@s',
    marginLeft: '8@ms',
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.orange
  },
});
