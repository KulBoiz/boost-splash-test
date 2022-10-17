import React from "react"
import { View } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { presets } from "../../../../../constants/presets"
import ItemView from "../../../../loan/components/item-view"
import { FONT_BOLD_12 } from "../../../../../styles/common-style"
import { color } from "../../../../../theme"
import { s, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../../models"

interface Props {
}

interface ItemProps {
  title: string
  content: string
  contentColor?: string
  margin?: boolean
}

const Item = React.memo(({ title, content, contentColor, margin = false }: ItemProps) => {
  return <ItemView
    title={title} content={content}
    contentStyle={[FONT_BOLD_12, { color: contentColor ?? color.palette.black }]}
    style={margin ? {marginBottom: s(12)} : {}}
  />
})

const TransactionInfo = React.memo((props : Props) => {
  const {investStore} = useStores()
  const {bondsDetail} = investStore
  const info = investStore?.bondsDetail?.info
  console.log(investStore?.bondsDetail)
  return (
    <View style={styles.container}>
      <AppText value={"Thông tin giao dịch"} style={presets.label} />
      <View style={styles.itemContainer}>
        <Item title={"Tên trái phiếu"} content={bondsDetail?.name} margin />
        <Item title={"Số lượng trái phiếu"} content={""} margin/>
        <Item title={"Kỳ hạn trái phiếu"} content={""} margin/>
        <Item title={"Lãi suất"} content={""} margin/>
        <Item title={"Phí giao dịch"} content={""} margin/>
        <Item title={"Ngày đầu tư"} content={""} margin/>
        <Item title={"Ngày kết thúc"} content={""} margin/>
        <Item title={"Lãi dự kiến"} content={""} margin/>
        <Item title={"Thuế đầu tư"} content={""} />
      </View>
    </View>
  )
})

export default TransactionInfo

const styles = ScaledSheet.create({
  container: {},
  itemContainer: {
    borderRadius: "8@s",
    padding: "16@s",
    borderWidth: 1,
    borderColor: color.primary,
  },
})
