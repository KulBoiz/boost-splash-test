import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"

interface Props {
}
interface ItemProps {
  leftText: string
  rightText: string
  style?: ViewStyle | any
}

interface ContainerProps {
  leftText: string
  rightText: string
  children: React.ReactNode
}

const Container = React.memo(({ leftText, rightText, children }: ContainerProps) => {
  return (
    <View style={styles.wrapContainer}>
      <View style={styles.header}>
        <AppText value={leftText} style={FONT_BOLD_12} color={color.text}/>
        <AppText value={rightText} style={FONT_BOLD_12} color={color.text}/>
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  )
})

const Item = React.memo(({leftText, rightText, style}: ItemProps)=> {
  return(
    <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, style]}>
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.circle}/>
        <AppText value={leftText} style={FONT_REGULAR_12}/>
      </View>
      <AppText value={`${rightText}%`} style={FONT_BOLD_12}/>
    </View>
  )
})

const MarketTariff = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <Container leftText={'Giá trị mua'} rightText={'Phí mua'}>
        <Item leftText={'< 100,000,000'} rightText={'0'} style={MARGIN_BOTTOM_8}/>
        <Item leftText={'>= 100,000,000'} rightText={'0'}/>
      </Container>
      <Container leftText={'Thời gian nắm giữ'} rightText={'Phí bán'}>
        <Item leftText={'< 12 tháng'} rightText={'2'} style={MARGIN_BOTTOM_8}/>
        <Item leftText={'12 - 24 tháng'} rightText={'0.5'} style={MARGIN_BOTTOM_8}/>
        <Item leftText={'>= 24 tháng'} rightText={'0'}/>
      </Container>
    </View>
  )
})

export default MarketTariff

const styles = ScaledSheet.create({
  container: {},
  wrapContainer: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: "8@s",
    marginBottom: '16@s'
  },
  header: {
    borderTopLeftRadius: '8@s',
    borderTopRightRadius: '8@s',
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    padding: "16@s",
  },
  body: {
    padding: "12@s",
  },
  circle: {
    width: '2@s',
    height: '2@s',
    borderRadius: '1@s',
    marginTop:'2@ms',
    backgroundColor: color.palette.black,
    marginRight: '5@s'
  },
})
