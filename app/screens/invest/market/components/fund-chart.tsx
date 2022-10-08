import React from "react"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import { AppText } from "../../../../components/app-text/AppText"
import { formatDate, hexToRgbA, numberWithCommas, width } from "../../../../constants/variable"
import { color } from "../../../../theme"
import { presets } from "../../../../constants/presets"
import { get, maxBy } from "lodash"
import { s, ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_BOLD_12, MARGIN_BOTTOM_16 } from "../../../../styles/common-style"

interface Props {
  data: any
}

const ptData2 = [
  { value: 130, date: "1 Apr 2022" },
  { value: 130, date: "2 Apr 2022" },
  { value: 150, date: "3 Apr 2022" },
  { value: 120, date: "4 Apr 2022" },
  { value: 110, date: "5 Apr 2022" },
  { value: 125, date: "6 Apr 2022" },
  { value: 160, date: "7 Apr 2022" },
  { value: 100, date: "8 Apr 2022" },

  { value: 260, date: "9 Apr 2022" },
  {
    value: 200,
    date: "10 Apr 2022",
    label: "10 Apr",
    labelTextStyle: { color: "lightgray", width: 60 },
  },
  { value: 210, date: "11 Apr 2022" },
  { value: 220, date: "12 Apr 2022" },
  { value: 310, date: "13 Apr 2022" },
  { value: 355, date: "14 Apr 2022" },
  { value: 250, date: "15 Apr 2022" },
  { value: 320, date: "16 Apr 2022" },

  { value: 320, date: "17 Apr 2022" },
  { value: 255, date: "18 Apr 2022" },
  { value: 235, date: "19 Apr 2022" },
  {
    value: 300,
    date: "20 Apr 2022",
    label: "20 Apr",
    labelTextStyle: { color: "lightgray", width: 60 },
  },
  { value: 220, date: "21 Apr 2022" },
  { value: 235, date: "22 Apr 2022" },
  { value: 230, date: "23 Apr 2022" },
  { value: 255, date: "24 Apr 2022" },

  { value: 190, date: "25 Apr 2022" },
  { value: 220, date: "26 Apr 2022" },
  { value: 205, date: "27 Apr 2022" },
  { value: 230, date: "28 Apr 2022" },
  { value: 210, date: "29 Apr 2022" },
  {
    value: 200,
    date: "30 Apr 2022",
    label: "30 Apr",
    labelTextStyle: { color: "lightgray", width: 60 },
  },
  { value: 220, date: "1 May 2022" },
  { value: 220, date: "2 May 2022" },
  { value: 220, date: "3 May 2022" },
  { value: 230, date: "4 May 2022" },
  { value: 210, date: "5 May 2022" },
]

const FundChart = React.memo(({ data }: Props) => {
  const {priceUpdateHistories} = data?.info
  const highestNav = get(maxBy(priceUpdateHistories, 'price'), 'price', 0) + 5000

  const chartData = priceUpdateHistories ? priceUpdateHistories?.map((e, index)=> {
    if (index === 0) return {value: e?.price, date: formatDate(e?.updatedAt), label: formatDate(e?.updatedAt)}
    if (index + 1 === priceUpdateHistories?.length) return {value: e?.price, date: formatDate(e?.updatedAt), label: formatDate(e?.updatedAt)}
    return {value: e?.price, date: formatDate(e?.updatedAt)}
  }) : []

  return (
    <View
      style={styles.container}>
      <AppText value={'Biểu đồ tăng trưởng NAV'} style={[presets.label, MARGIN_BOTTOM_16]}/>
      <LineChart
        areaChart
        data={chartData}
        // data2={ptData2}
        width={width *0.72}
        hideDataPoints
        spacing={10}
        color={hexToRgbA(color.primary, 0.7)}
        // color2={hexToRgbA(color.palette.orange, 0.7)}
        thickness={1.5}
        startFillColor={hexToRgbA(color.primary, 0.1)}
        endFillColor={hexToRgbA(color.background, 0.1)}
        startOpacity={0.2}
        endOpacity={0.1}
        initialSpacing={0}
        noOfSections={5}
        maxValue={highestNav}
        yAxisColor={color.palette.deepGray}
        showXAxisIndices
        xAxisIndicesColor={color.palette.deepGray}
        xAxisIndicesHeight={1}
        xAxisIndicesWidth={7}
        yAxisThickness={1}
        xAxisLabelTextStyle={styles.xLabel}
        hideRules
        hideOrigin
        yAxisTextStyle={{ color: color.palette.lightBlack }}
        yAxisSide="right"
        showReferenceLine1
        yAxisLabelWidth={s(45)}
        yAxisLabelContainerStyle={{paddingLeft: 5}}
        referenceLine1Config={{color: color.palette.deepGray, dashWidth: 10, thickness: 2}}
        referenceLine1Position={highestNav-5000}
        verticalLinesUptoDataPoint
        xAxisColor={color.palette.deepGray}
        pointerConfig={{
          pointerStripHeight: 160,
          pointerStripColor: color.palette.deepGray,
          pointerStripWidth: 2,
          pointerColor: color.primary,
          radius: 4,
          pointerLabelWidth: 100,
          pointerLabelHeight: 90,
          activatePointersOnLongPress: true,
          autoAdjustPointerLabelPosition: false,
          pointerLabelComponent: items => {
            return (
              <View
                style={styles.toolkit}>
                <AppText style={{ fontSize: 14, marginBottom: 6, textAlign: "center" }}>
                  {items[0].date}
                </AppText>

                <View style={ALIGN_CENTER}>
                  <AppText style={FONT_BOLD_12}>
                    {numberWithCommas(items[0].value)} VNĐ
                  </AppText>
                  {/* <AppText style={{ fontWeight: "bold", textAlign: "center" }}> */}
                  {/*  {"$" + items[1].value + ".0"} */}
                  {/* </AppText> */}
                </View>
              </View>
            )
          },
        }}
      />
    </View>
  )
})

export default FundChart

const styles = ScaledSheet.create({
  container: {
    paddingLeft: '16@s',
    backgroundColor: color.background,
    paddingBottom: '16@s',
    borderBottomWidth: 1,
    borderBottomColor: color.line
  },
  xLabel: {
    marginTop: '-25@s',
    width: '700@s',
    color: color.palette.lightBlack
  },
  toolkit: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: color.background,
    marginTop: '-10@s',
    marginLeft: '-30@s',
    padding: '5@s',
    borderRadius: '8@s'
  }
})
