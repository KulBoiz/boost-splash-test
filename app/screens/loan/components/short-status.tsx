import React from "react"
import { Linking, Platform, Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { ClockSvg, PhoneSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import moment from "moment"
import { hidePhoneNumber } from "../../../constants/variable"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { mappingStatus } from "../constants"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import RenderStatus from "../../../components/status/render-status"
import { fontFamily } from "../../../constants/font-family"

const fullName = (user) => {
  if (!user) return ""
  if (user?.fullName) return user.fullName
  if (user?.firstName || user?.lastName) return user?.firstName + " " + user?.lastName
  return "***"
}

interface Props {
  item: any
}

const ShortStatus = observer(({ item }: Props) => {
  if (!item) {
    return <></>
  }
  const { loanStore } = useStores()
  const status = item?.status
  const name = fullName(item?.user)
  const tel = item?.user?.tels?.[0]?.tel
  const assignee = item?.assignee

  const formatPhone = tel ? hidePhoneNumber(tel) : ""

  const _handleCall = (item) => {
    let phoneNumber = ""
    if (assignee?.phone?.length === 0) {
      return
    }
    if (Platform.OS === "android") {
      phoneNumber = `tel:+${assignee?.phone}`
    } else {
      phoneNumber = `telprompt:+${assignee?.phone}`
    }
    Linking.openURL(phoneNumber)
  }

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        loanStore.setTaskDetail(item)
        loanStore.getLoanDetail(item?.id)
        navigate(ScreenNames.PROFILE_DETAIL)
      }}
    >
      <View style={styles.header}>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText value={name} style={styles.name} />
          <RenderStatus
            status={mappingStatus(status, item)?.status}
            statusColor={mappingStatus(status, item)?.color}
            backgroundColor={mappingStatus(status, item)?.background}/>
        </View>
        <AppText value={`${formatPhone}`} fontSize={ms(10)} color={color.primary} fontFamily={fontFamily.semiBold} />
      </View>

      <View style={styles.body}>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText tx={"loan.financialSpecialist"} capitalize style={styles.title} />
          <AppText value={"Thời gian cập nhật"} style={styles.title} />
        </View>
        <View style={[ROW, SPACE_BETWEEN]}>
          <Pressable style={[ROW, ALIGN_CENTER]} onPress={_handleCall}>
            <AppText value={fullName(assignee)} capitalize style={styles.title} />
            <View style={styles.wrapPhone}>
              <PhoneSvg width={s(9)} height={s(9)}/>
            </View>
          </Pressable>
          <AppText value={moment(item?.createdAt).format('HH:mm-DD/MM/YYYY')} style={styles.text} />
        </View>
      </View>
    </Pressable>
  )
})

export default ShortStatus
ShortStatus.displayName = "ShortStatus"

const styles = ScaledSheet.create({
  container: {
    padding: "12@s",
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: '8@s',
    marginBottom: "12@s",
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: '8@s'
  },
  body: {
    paddingTop: '12@s'
  },
  name: {
    fontSize: "12@ms",
    fontFamily: fontFamily.bold
  },
  title: {
    color: "#AAADB7",
    fontSize: "11@ms",
  },
  text: {
    fontSize: '10@ms'
  },
  wrapPhone: {
    width: '16@s',
    height: '16@s',
    borderRadius: '8@s',
    marginLeft: '4@s',
    backgroundColor: color.palette.lighterGrey,
    alignItems: "center",
    justifyContent: "center"
  }
})
