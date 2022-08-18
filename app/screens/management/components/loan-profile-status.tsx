import { observer } from "mobx-react-lite"
import moment from "moment"
import React from "react"
import { Pressable, View } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import RenderStatus from "../../../components/status/render-status"
import { fontFamily } from "../../../constants/font-family"
import { numberWithCommas } from "../../../constants/variable"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"
import { mappingStatus } from "../../loan/constants"

const fullName = (user) => {
  if (!user) return ""
  if (user?.fullName) return user.fullName
  if (user?.firstName || user?.lastName) return user?.firstName + " " + user?.lastName
  return "***"
}

interface Props {
  item: any
}

const RenderItem = ({label, content}: {label: string, content: string}) => {
  return(
    <View style={styles.itemContainer}>
      <AppText value={label} style={styles.title}/>
      <AppText value={content} style={styles.text}/>
    </View>
  )
}

const LoanProfileStatus = observer(({ item }: Props) => {
  if (!item) {
    return <></>
  }
  const { loanStore } = useStores()
  const status = item?.status
  const name = fullName(item?.user)

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
        <AppText value={`HSV${item?.code ? ' - ' + item?.code : ''}`} fontSize={ms(10)} color={color.primary} fontFamily={fontFamily.semiBold} />
      </View>

      <View style={styles.body}>
        <RenderItem label={'Khách hàng'} content={name}/>
        <RenderItem label={'Cập nhật lần cuối'} content={moment(item?.updatedAt).format('HH:mm-DD/MM/YYYY')}/>
        <RenderItem label={'Số tiền vay'} content={`${numberWithCommas(100000000000)}vnđ`}/>
      </View>
    </Pressable>
  )
})

export default LoanProfileStatus
LoanProfileStatus.displayName = "LoanProfileStatus"

const styles = ScaledSheet.create({
  container: {
    padding: "12@s",
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: '8@s',
    marginBottom: "12@s",
  },
  itemContainer: {
    width: '33.333%'
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    paddingBottom: '8@s'
  },
  body: {
    paddingTop: '12@s',
    flexDirection: 'row',
    justifyContent: "space-between"
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
})
