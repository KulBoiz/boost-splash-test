import React from 'react';
import { View, StyleSheet, ViewStyle } from "react-native"
import { MARGIN_BOTTOM_16, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme"

interface Props{}
interface ItemProps {
  leftContent: string
  rightContent: string
  isBold?: boolean
  style?: ViewStyle | any
}

const Item = React.memo(({ leftContent, rightContent, isBold, style }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN, style]}>
      <AppText value={leftContent} fontSize={ms(11)} fontFamily={isBold ? fontFamily.bold : fontFamily.regular}
               color={color.text} />
      <AppText value={rightContent} fontSize={ms(11)} fontFamily={isBold ? fontFamily.bold : fontFamily.regular}
               color={color.text} />
    </View>
  )
})
const ItemDescriptionFund = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Item leftContent={"VINACAPITAL"} rightContent={"Chương trình mua"} />
        <Item leftContent={"TVPF"} rightContent={"Linh hoạt"} isBold style={MARGIN_BOTTOM_16} />
        <Item leftContent={"Số lượng CCQ hiện có"} rightContent={"Loại quỹ"} />
        <Item leftContent={"4.94"} rightContent={"Quỹ mở"} isBold />
      </View>
    </View>
  )
});

export default ItemDescriptionFund;

const styles = ScaledSheet.create({
    container: {},
  headerContainer: {
    paddingHorizontal: "16@s",
    paddingVertical: "20@s",
    backgroundColor: color.palette.navi,
    borderRadius: "4@s",
  },
});
