import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { Image, Linking, View, Text, Pressable } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../constants/font-family"
import { isAndroid } from "../../constants/variable"
import { useStores } from "../../models"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
// import { AppText } from "../../../components/app-text/AppText"


interface Props {
  id?: any
  onFocus?: () => void
}

const BankComponent = observer((props: Props) => {
  const { vietQrStore } = useStores()
  const [banks, setBanks] = useState([])

  useEffect(() => {
    if (isAndroid) {
      vietQrStore?.getBankAndroid().then((res) => {
        setBanks(res?.data?.apps);
      })
    } else {
      vietQrStore?.getBankIos().then((res) => {
        setBanks(res?.data?.apps);
      })
    }
  }, [])

  const openApp = (link) => {
    Linking.openURL(link)
  }

  return (
    <View>
      <AppText
        value="Vui lòng chọn app bạn đang sử dụng"
        fontFamily={fontFamily.bold}
        color={color.palette.D9D9D9}
        fontSize={s(10)}
      />
      <View style={styles.banks}>
        {banks?.map((item: any, index) => (<Pressable
          onPress={() => openApp(item?.deeplink)}
          key={index}
          style={styles.bank}>
          <Image source={{ uri: item?.appLogo }} style={styles.icon} />
          <Text style={styles.bankName}>
            {item?.appName}
          </Text>
        </Pressable>))}
      </View>
    </View>
  )
})

export default BankComponent

const styles = ScaledSheet.create({
  banks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bankName: {
    fontSize: '10@s',
    textAlign: 'center',
  },
  bank: {
    width: '25%',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: "50@s",
    height: "50@s",
  },
})
