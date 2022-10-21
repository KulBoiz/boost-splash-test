import React, { useRef } from "react"
import { View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import { Modalize } from "react-native-modalize"
import DualButton from "../../../components/app-button/dual-button"
import Signature from "./components/signature"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const TradeRegistration = React.memo((props: Props) => {
  const modalizeRef = useRef<Modalize>(null)

  const onOpen = React.useCallback(() => {
    modalizeRef.current?.open()
  }, [])

  const handleConfirm = React.useCallback(() => {
    //
  }, [])


  return (
    <View style={styles.container}>
      <AppHeader headerText={"Giấy ĐKGD"} isBlue />
      <View style={styles.body}>
        <View style={{ flex: 1 }} />
        <Signature modalizeRef={modalizeRef} handleConfirm={handleConfirm} />
        <DualButton leftTitle={"Tải ảnh lên"} rightTitle={"Ký điện tử"} rightPress={onOpen} />
      </View>

    </View>
  )
})

export default TradeRegistration

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: "16@s",
    paddingBottom: "24@s",
  },
})
