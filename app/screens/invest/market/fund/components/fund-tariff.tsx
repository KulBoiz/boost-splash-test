import React from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../../../components/app-text/AppText"
import { color } from "../../../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import {
  ALIGN_CENTER,
  FONT_BOLD_12,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../../styles/common-style"
import { filter } from "lodash"


interface Props {
  productDetail: any
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
        <AppText value={leftText} style={FONT_BOLD_12} color={color.text} />
        <AppText value={rightText} style={FONT_BOLD_12} color={color.text} />
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  )
})

const Item = React.memo(({ leftText, rightText, style }: ItemProps) => {
  return (
    <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, style]}>
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.circle} />
        <AppText value={leftText} style={FONT_REGULAR_12} />
      </View>
      <AppText value={`${rightText}%`} style={FONT_BOLD_12} />
    </View>
  )
})

const FundTariff = React.memo(({ productDetail }: Props) => {
  const feesBuy = filter(productDetail?.fees, { type: "BUY" }) ?? []
  const feesSell = filter(productDetail?.fees, { type: "SELL" }) ?? []

  return (
    <View style={styles.container}>
      <Container leftText={"Giá trị mua"} rightText={"Phí mua"}>
        {feesBuy?.length > 0 ?
          <>
            {feesBuy?.map((fee) => (
              <Item key={fee?.id} leftText={fee?.endOperatorCode === "&" ?
                "_" : `Từ ${fee?.beginValue} ${
                  fee?.endValue !== -1 ? `- ${fee?.endValue}` : ""
                } ngày ${fee?.endOperatorCode === "&" ? "trở lên" : ""}`} rightText={`${fee?.rate ?? ""}`}
                    style={MARGIN_BOTTOM_8} />
            ))}
          </> : <AppText value={"Không có dữ liệu"} textAlign={"center"} />
        }
      </Container>

      <Container leftText={"Thời gian nắm giữ"} rightText={"Phí bán"}>
        {feesSell?.length > 0 ?
          <>
            {feesSell?.map((fee) => (
              <Item key={fee?.id} leftText={`Từ ${fee?.beginValue} ${
                  fee?.endValue !== -1 ? `- ${fee?.endValue}` : ""
                } ngày ${fee?.endOperatorCode === "&" ? "trở lên" : ""}`} rightText={`${fee?.rate ?? ""}`}
                    style={MARGIN_BOTTOM_8} />
            ))}
          </> : <AppText value={"Không có dữ liệu"} textAlign={"center"} />
        }
      </Container>
    </View>
  )
})

export default FundTariff

const styles = ScaledSheet.create({
  container: {
    marginTop: "16@s",
  },
  wrapContainer: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: "8@s",
    marginBottom: "16@s",
  },
  header: {
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.primary,
    padding: "16@s",
  },
  body: {
    padding: "12@s",
  },
  circle: {
    width: "2@s",
    height: "2@s",
    borderRadius: "1@s",
    marginTop: "2@ms",
    backgroundColor: color.palette.black,
    marginRight: "5@s",
  },
})
