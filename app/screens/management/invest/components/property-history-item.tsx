import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { useStores } from "../../../../models"
import { MARGIN_TOP_8, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { numberWithCommas } from "../../../../constants/variable"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"

interface Props {
  productId: string | number
}

const PropertyHistoryItem = React.memo(({ productId }: Props) => {
  const { assetStore } = useStores()
  const [histories, setHistories] = useState([])

  useEffect(() => {
    assetStore.getFiveTransactionHistory(productId).then(res => {
        setHistories(res)
      },
    )
  }, [])

  if (!histories.length) {
    return <></>
  }
  return (
    <View style={styles.container}>
      <View style={[ROW, SPACE_BETWEEN]}>
        <AppText value={"Thời gian"} style={{ flex: 1 }} />
        <AppText value={"Chương trình"} style={{ flex: 1 }} />
        <AppText value={"Số lượng"} style={{ flex: 1 }} textAlign={"center"} />
        <AppText value={"Giá mua"} style={{ flex: 0.7 }} textAlign={"right"} />
      </View>
      {histories.map((val: any, index) => (
        <View key={index} style={[ROW, SPACE_BETWEEN, MARGIN_TOP_8]}>
          <AppText value={val?.dateSessionTime} style={{ flex: 1 }} fontSize={ms(12)} />
          <AppText value={val?.productProgramNameEn} style={{ flex: 1 }} fontSize={ms(12)} />
          <AppText value={val?.holdingVolume} style={{ flex: 1 }} textAlign={"center"} fontSize={ms(12)} />
          <AppText value={`${numberWithCommas(val?.price)}ᵈ`} style={{ flex: 0.8 }} textAlign={"right"}
                   fontSize={ms(12)} />
        </View>
      ))}
    </View>
  )
})

export default PropertyHistoryItem

const styles = ScaledSheet.create({
  container: {
    borderTopWidth: 1,
    paddingTop: "8@s",
    marginTop: "8@s",
    borderColor: color.palette.D9D9D9,
  },
})
