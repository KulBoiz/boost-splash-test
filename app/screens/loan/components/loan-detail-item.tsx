import React from 'react';
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { StarSvg } from "../../../assets/svgs"
import FastImage from "react-native-fast-image"
import InterestRate from "./interest-rate"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { truncateString } from "../../../constants/variable"
import { useStores } from "../../../models"

interface Props{}

const LoanDetailItem = React.memo((props: Props) => {
  const {loanStore} = useStores()
  const item = loanStore.productDetail
  const imageUrl = item?.org?.image?.url
  const outstandingAdvantages = item?.outstandingAdvantages
  const backgroundColor = item?.org?.backgroundColor

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
        <InterestRate border interestRate={item?.info?.preferentialRate} endow={item?.info?.preferentialTime} month={12}/>
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
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    padding: '12@s',
  },

  outstandingAdvantages: {
    lineHeight: '16@s',
    marginLeft: '8@ms',
    fontSize: '12@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.orange
  },
});
