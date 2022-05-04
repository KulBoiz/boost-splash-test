import React from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { ClockSvg, PhoneSvg, RightArrowSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import moment from "moment"
import { hidePhoneNumber } from "../../../constants/variable"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props{
  item?: any
}

const ShortStatus = React.memo(({ item }: Props) => {
  const status = item?.status
  return (
    <Pressable style={styles.container} onPress={()=> navigate(ScreenNames.PROFILE_DETAIL)}>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.customerName"} capitalize style={styles.title}/>
        <AppText value={`${item?.name ?? 'Nguyễn Thị Thanh Tâm'} - ${hidePhoneNumber('01231231')}`}/>
      </View>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.status"} capitalize style={styles.title}/>
        <View style={styles.wrapSpace}>
          <AppText tx={status === 'approve' ? 'loan.successfulDisbursement' : 'loan.beingAppraised'}
          color={status === 'approve' ? color.palette.green : color.palette.orange }/>
          <View style={styles.boxArrow}>
            <RightArrowSvg width={s(6)} height={s(12)}/>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.financialSpecialist"} capitalize style={styles.title}/>
        <View style={styles.wrapSpace}>
          <View style={styles.row}>
            <AppText value={'Nguyễn Văn A'} style={styles.text}/>
            <PhoneSvg />
          </View>
          <View style={styles.row}>
            <ClockSvg />
            <AppText value={moment(1641231123312).fromNow()} style={styles.time}/>
          </View>
        </View>
      </View>
    </Pressable>
  )
});

export default ShortStatus;
ShortStatus.displayName = 'ShortStatus'

const styles = ScaledSheet.create({
  container: {
    paddingVertical: '16@s',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.whiteDarker
  },
  itemContainer:{
    marginBottom: '12@s'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  title: {
    color: '#AAADB7',
    fontSize: '12@ms',
    width: '120@ms'
  },
  boxArrow: {
    marginBottom: '8@s',
    backgroundColor: color.palette.white,
    width: '16@s',
    height: '16@s',
    borderRadius: '4@s',
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: '2@ms',
    shadowColor: color.palette.blue ,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.00,

    elevation: 24,
  },
  wrapSpace:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  text: {
    fontSize: '12@ms',
    color: color.palette.black,
    marginRight: '10@ms'
  },
  time: {
    fontSize: '12@ms',
    color: '#AEAEB2',
    marginLeft: '6@ms'
  }
});
