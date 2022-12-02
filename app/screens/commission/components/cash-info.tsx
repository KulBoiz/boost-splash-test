import React, { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import AppButton from "../../../components/app-button/AppButton"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { hexToRgbA, numberWithCommas } from "../../../constants/variable"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite"

interface Props {
}

const CashInfo = observer((props: Props) => {
  const {commissionStore} = useStores()
  const {amount} = commissionStore

  useEffect(() => {
    commissionStore.getCommissionAmount()
  }, [])

  const [showCash, setShowCash] = useState<boolean>(false)
  const cash = showCash ? numberWithCommas(amount.toFixed(0)) : "*********"

  function handleShowHide() {
    setShowCash(!showCash)
  }

  return (
    <View style={styles.container}>
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN]}>
        <View>
          <AppText value={"Số tiền có thể rút"} color={hexToRgbA(color.palette.white, 0.6)} fontSize={ms(16)} />
          <View style={[ROW, ALIGN_CENTER, {marginTop: ms(4)}]}>
            <Pressable onPress={handleShowHide}>
              <FastImage source={showCash ? images.open_eye : images.close_eye} style={styles.icon} tintColor={color.palette.white} />
            </Pressable>
            <AppText value={`${cash} đ`} fontSize={ms(24)} fontFamily={fontFamily.bold} color={color.text}/>
          </View>
        </View>
        {/* <AppButton title={"Rút tiền"} onPress={() => {
          //
        }} containerStyle={styles.btn} disable={true}/> */}
      </View>
    </View>
  )
})

export default CashInfo

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.primary,
    paddingHorizontal: '16@s',
    paddingBottom: '20@s'
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginRight: '8@s'
  },
  btn: {
    backgroundColor: color.palette.orange,
    width: '30%',
    height: '40@s'
  }
})
