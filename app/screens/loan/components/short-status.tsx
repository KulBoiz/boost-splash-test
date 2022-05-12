import React from "react"
import { Linking, Platform, Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { ClockSvg, PhoneSvg, RightArrowSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import moment from "moment"
import { hidePhoneNumber } from "../../../constants/variable"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { CheckStatus } from "../constants"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"

interface Props{
  item: any
}

const ShortStatus = observer(({ item }: Props) => {
  if (!item) {
    return <></>
  }
  // @ts-ignore
  const { loanStore } = useStores()
  const status = item?.status
  const name = item?.user?.fullName || ''
  const tel = item?.user?.tels?.[0]?.tel
  const assignee = item?.assignee

  const formatPhone = tel ? hidePhoneNumber(tel) : ''

  const _handleCall = (item) => {
    let phoneNumber = '';
    if (assignee?.phone?.length === 0) {
      return;
    }
    if (Platform.OS === 'android') {
      phoneNumber = `tel:+${assignee?.phone}`;
    } else {
      phoneNumber = `telprompt:+${assignee?.phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <Pressable style={styles.container} onPress={() => {
      loanStore.setTaskDetail(item)
      loanStore.getLoanDetail(item?.id)
      navigate(ScreenNames.PROFILE_DETAIL)
    }}>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.customerName"} capitalize style={styles.title}/>
        <AppText value={`${name} - ${formatPhone}`}/>
      </View>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.status"} capitalize style={styles.title}/>
        <View style={styles.wrapSpace}>
          <AppText value={CheckStatus(status).text}
          color={CheckStatus(status).color}/>
          <View style={styles.boxArrow}>
            <RightArrowSvg width={s(6)} height={s(12)}/>
          </View>
        </View>
      </View>
      <View style={[styles.row, styles.itemContainer]}>
        <AppText tx={"loan.financialSpecialist"} capitalize style={styles.title}/>
        <View style={styles.wrapSpace}>
          <Pressable style={styles.row} onPress={_handleCall}>
            <AppText value={assignee?.fullName} style={styles.text}/>
            <PhoneSvg />
          </Pressable>
          <View style={styles.row}>
            <ClockSvg />
            <AppText value={moment(item?.createdAt).fromNow()} style={styles.time}/>
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
    width: '115@ms'
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

    elevation: 12,
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
