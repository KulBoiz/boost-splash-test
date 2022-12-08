import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import moment from "moment"
import { formatDate } from "../../../../constants/variable"

interface Props {
  fee: any[]
}

interface TextProps {
  isContent?: boolean
  title: string
  flex?: number
  textAlign?: 'center' | 'left' | 'right'
  style?: ViewStyle
}

const TextCompoment = React.memo((props: TextProps) => {
  const { isContent = false, title, flex, textAlign, style } = props
  return <AppText value={title} style={[{flex}, style]} textAlign={textAlign ?? "left"} color={isContent ? "#4E5A65" : "#7F868D"} fontSize={isContent ? ms(10) : ms(12)} />
})

const SaleFeeInfo = React.memo(({ fee = [] }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextCompoment title={"Ngày mua"} flex={1}/>
        <TextCompoment title={"TG nắm giữ"} flex={0.9}/>
        <TextCompoment title={"SL bán"} flex={0.6}/>
        <TextCompoment title={"Phí"} />
      </View>
      {fee.length > 0 ?
        <>
          {fee.map((value, index) => {
            const buyDate = moment(new Date()).subtract(value?.holdingDay, 'days')
            return(
              <View style={[ROW, SPACE_BETWEEN]} key={index}>
              <TextCompoment title={`${formatDate(buyDate)} (Giờ VN)`} isContent flex={0.9}/>
              <TextCompoment title={`${value?.holdingDay} ngày`} isContent flex={1} textAlign={"center"}/>
              <TextCompoment title={value?.volumSell} isContent flex={0.65} textAlign={"center"} />
              <TextCompoment title={`${value?.feeRate}%`} isContent flex={0.3} textAlign={"right"} />
            </View>
            )})}
        </>
       : <AppText value={'Không có dữ liệu'} color={'#4E5A65'} style={{alignSelf: 'center'}}/>
      }
    </View>
  )
})

export default SaleFeeInfo

const styles = ScaledSheet.create({
  container: {
    marginTop: '8@s',
    paddingHorizontal: "24@s",
    backgroundColor: color.palette.lighterGrey,
    paddingBottom: "12@s",
    borderRadius: '4@s'
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "4@s",
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEE',
    marginBottom: '4@s'
  },
})
