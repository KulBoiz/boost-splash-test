import React from "react"
import { View, TouchableOpacity, Linking, Platform } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { filter } from "lodash"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import { useStores } from "../../../models"
import { convertViToEn, isIos } from "../../../constants/variable"
import * as SMS from 'expo-sms';

interface Props {
  item: any
  isContact?: boolean
  isFina?: boolean
}
const downloadLink = 'https://qrd.by/rj4hoi'
const Button = React.memo(({ phone }: any) => {
  const { authStoreModel } = useStores()
  const { user } = authStoreModel
  const { refCode, fullName } = user

  const sendSMS = async (phone) => {
    const content = `(TULIP) - ${convertViToEn(fullName)} gioi thieu ban su dung FINA\n${downloadLink}\nMa gioi thieu: ${refCode}`

    const { result } = await SMS.sendSMSAsync(phone, content);
    console.log(result)
    // const separator = Platform.OS === 'ios' ? '&' : '?'
    //
    // const url = `sms:${phone}${separator}body=${content}`
    //
    // Linking.openURL(url)
  }

  return (
    <TouchableOpacity style={styles.normalBtn} onPress={() => { sendSMS(phone) }}>
      <AppText value={'Mời'} style={styles.text} color={color.text} />
    </TouchableOpacity>
  )
})

const User = React.memo(() => {
  return (
    <View style={styles.normalBtn}>
      <AppText value={'FINA'} style={styles.text} color={color.text} />
    </View>
  )
})

const textColor = '#6D747C'
const FriendZoneItem = React.memo(({ item, isContact = true, isFina = false }: Props) => {
  const avatarName = item?.givenName ? item?.givenName?.trim().charAt(0) : item?.familyName?.trim()?.charAt(0)
  const phoneNo = filter(item?.phoneNumbers, { label: 'mobile' })?.[0]?.number ?? item?.phoneNumbers?.[0]?.number

  return (
    <View style={styles.container}>
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.circleAvatar}>
          <AppText value={avatarName} style={styles.text} />
          {!isContact && <View style={styles.wrapIcon}>
            <FastImage source={images.common_circle_checked} tintColor={color.palette.green} style={styles.icon} />
          </View>}
        </View>
        <View style={{width: '60%'}}>
          <AppText numberOfLines={1} value={item?.givenName ? `${item?.givenName} ${item?.familyName}` : `${item?.familyName}`} style={styles.text} />
          <AppText value={phoneNo} style={styles.text} color={textColor} />
        </View>
      </View>
      {
        !isFina ? <Button phone={phoneNo} /> : <User />
      }

    </View>
  )
})

export default FriendZoneItem

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: '12@s',
    justifyContent: "space-between"
  },
  circleAvatar: {
    width: "40@s",
    height: "40@s",
    borderRadius: '20@s',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: "center",
    borderColor: color.palette.BABABA,
    marginRight: '8@s'
  },
  wrapIcon: {
    position: "absolute",
    bottom: -3,
    right: -3,
    backgroundColor: color.background
  },
  text: {
    fontSize: '15@ms',
    lineHeight: isIos ? undefined : '20@s',
    fontFamily: fontFamily.medium
  },
  icon: {
    width: "16@s",
    height: "16@s",
  },
  normalBtn: {
    paddingVertical: '8@s' ,
    backgroundColor: color.blue.blue_02,
    borderRadius: '32@s',
    paddingHorizontal: '20@s'
  }
})
