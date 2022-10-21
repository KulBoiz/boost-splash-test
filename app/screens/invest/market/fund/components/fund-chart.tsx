import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import { AppText } from "../../../../../components/app-text/AppText"
import { formatDate, hexToRgbA, numberWithCommas, width } from "../../../../../constants/variable"
import { color } from "../../../../../theme"
import { presets } from "../../../../../constants/presets"
import { get, maxBy } from "lodash"
import { s, ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_BOLD_12, MARGIN_BOTTOM_16 } from "../../../../../styles/common-style"
import { observer } from "mobx-react-lite"
import { getDateInPast, getPriceUpdateHistoriesByTime, sortNavHistoryByNavDate } from "../../constants"
import ChartFilter from "./chart-filter"

interface Props {
  data: any
  navs: any
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
]

const FundChart = observer(({ data, navs }: Props) => {
  const firstDay = new Date("1/1/2000")
  firstDay.setFullYear(new Date().getFullYear())

  const priceUpdateHistoriesForTheFirstDay = getPriceUpdateHistoriesByTime(navs, firstDay)
  const priceUpdateHistoriesForTheLastSixMonths = getPriceUpdateHistoriesByTime(navs, getDateInPast({ month: 6 }))
  const priceUpdateHistoriesForTheLastOneYear = getPriceUpdateHistoriesByTime(navs, getDateInPast({ year: 1 }))
  const priceUpdateHistoriesForTheLastThreeYear = getPriceUpdateHistoriesByTime(navs, getDateInPast({ year: 3 }))
  const [nav, setNav] = useState<any>([])

  const highestNav = get(maxBy(nav, "nav"), "nav", 0) + 5000

  const chartData = nav ? nav?.map((e, index) => {
    if (index === 0) return { value: e?.nav, date: formatDate(e?.navDate), label: formatDate(e?.navDate) }
    if (index + 1 === navs?.length) return {
      value: e?.nav,
      date: formatDate(e?.navDate),
      label: formatDate(e?.navDate),
    }
    return { value: e?.nav, date: formatDate(e?.navDate) }
  }) : []

  useEffect(() => {
    setNav(sortNavHistoryByNavDate(priceUpdateHistoriesForTheFirstDay))
  }, [navs])

  const tabsConfig = [
    {
      label: "YTD",
      key: "YTD",
      data: sortNavHistoryByNavDate(priceUpdateHistoriesForTheFirstDay),
    },
    {
      label: "6 tháng",
      key: 6,
      data: sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastSixMonths),
    },
    {
      label: "1 năm",
      key: 12,
      data: sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastOneYear),
    },
    {
      label: "3 năm",
      key: 36,
      data: sortNavHistoryByNavDate(priceUpdateHistoriesForTheLastThreeYear),
    },
    {
      label: "Tất cả",
      key: "all",
      data: sortNavHistoryByNavDate(navs),
    },
  ]

  return (
    <View
      style={styles.container}>
      <AppText value={"Biểu đồ tăng trưởng NAV"} style={[presets.label, MARGIN_BOTTOM_16]} />
      <ChartFilter filterData={tabsConfig} onPress={setNav} />
      <LineChart
        areaChart
        data={chartData}
        // data2={ptData2}
        width={width * 0.72}
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
        // maxValue={highestNav}
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
        // showReferenceLine1
        yAxisLabelWidth={s(45)}
        yAxisLabelContainerStyle={{ paddingLeft: 5 }}
        // referenceLine1Config={{color: color.palette.deepGray, dashWidth: 10, thickness: 2}}
        // referenceLine1Position={highestNav-5000}
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
    paddingLeft: "16@s",
    backgroundColor: color.background,
    paddingBottom: "16@s",
    borderBottomWidth: 1,
    borderBottomColor: color.line,
  },
  xLabel: {
    marginTop: "-25@s",
    width: "700@s",
    color: color.palette.lightBlack,
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
    marginTop: "-10@s",
    marginLeft: "-30@s",
    padding: "5@s",
    borderRadius: "8@s",
  },
})
