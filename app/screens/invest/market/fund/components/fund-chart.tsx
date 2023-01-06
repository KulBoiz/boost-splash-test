import React, { useEffect, useState } from "react"
import { Pressable, View } from "react-native"
import { LineChart } from "react-native-gifted-charts"
import { AppText } from "../../../../../components/app-text/AppText"
import { formatDate, hexToRgbA, numberWithCommas, width } from "../../../../../constants/variable"
import { color } from "../../../../../theme"
import { presets } from "../../../../../constants/presets"
import { get, head, last, maxBy, minBy } from "lodash"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { ALIGN_CENTER, FONT_BOLD_12, MARGIN_BOTTOM_16, ROW, SPACE_BETWEEN } from "../../../../../styles/common-style"
import { observer } from "mobx-react-lite"
import { getDateInPast, getPriceUpdateHistoriesByTime, sortNavHistoryByNavDate } from "../../constants"
import ChartFilter from "./chart-filter"

interface Props {
  data: any
  navs: any

  setScrollAble(e: boolean): void
}

const FundChart = observer(({ data, navs, setScrollAble }: Props) => {
  const firstDay = new Date("1/1/2000")
  firstDay.setFullYear(new Date().getFullYear())

  const priceUpdateHistoriesForTheFirstDay = getPriceUpdateHistoriesByTime(navs, firstDay)
  const priceUpdateHistoriesForTheLastSixMonths = getPriceUpdateHistoriesByTime(navs, getDateInPast({ month: 6 }))
  const priceUpdateHistoriesForTheLastOneYear = getPriceUpdateHistoriesByTime(navs, getDateInPast({ year: 1 }))
  const priceUpdateHistoriesForTheLastThreeYear = getPriceUpdateHistoriesByTime(navs, getDateInPast({ year: 3 }))
  const [nav, setNav] = useState<any>([])

  const highestNav = get(maxBy(nav, "nav"), "nav", 0) + 1000
  const minNav = get(minBy(nav, "nav"), "nav", 0)
  const startDate = get(head(nav), "navDate")
  const endDate = get(last(nav), "navDate")

  const chartData = nav ? nav?.map((e, index) => {
    if (index === 0) return {
      value: e?.nav, date: formatDate(e?.navDate),
    }
    if (index === nav?.length - 1) return {
      value: e?.nav,
      date: formatDate(e?.navDate),
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
    <Pressable
      onPressIn={() => setScrollAble(false)}
      onPressOut={() => setScrollAble(true)}
      style={styles.container}>
      <AppText value={"Biểu đồ tăng trưởng NAV"} style={[presets.label, MARGIN_BOTTOM_16]} />
      <ChartFilter filterData={tabsConfig} onPress={setNav} />
      <View style={{ paddingLeft: width * 0.022 }}>
        <LineChart
          horizontalRulesStyle={{ width: width * 0.865 }}
          areaChart
          data={chartData}
          // data2={ptData2}
          width={width * 0.85}
          curved
          adjustToWidth
          disableScroll
          // spacing={30}
          initialSpacing={0}
          hideDataPoints
          // scrollToEnd
          scrollAnimation={false}
          color={hexToRgbA(color.primary, 0.7)}
          // color2={hexToRgbA(color.palette.orange, 0.7)}
          thickness={1.5}
          startFillColor={hexToRgbA(color.primary, 0.1)}
          endFillColor={hexToRgbA(color.background, 0.1)}
          startOpacity={0.2}
          endOpacity={0.1}
          noOfSections={4}
          stepValue={highestNav / 4}
          maxValue={highestNav}
          // yAxisOffset={minNav}
          minValue={minNav}
          showXAxisIndices
          xAxisIndicesColor={color.palette.deepGray}
          xAxisIndicesHeight={1}
          xAxisIndicesWidth={7}
          yAxisThickness={1}
          // xAxisLabelTextStyle={styles.xLabel}
          xAxisColor={color.palette.deepGray}
          hideRules
          hideOrigin
          yAxisColor={color.palette.deepGray}
          yAxisTextStyle={{
            color: color.palette.lightBlack,
            right: s(-70),
            position: "absolute",
          }}
          yAxisSide="right"
          yAxisLabelWidth={s(50)}
          yAxisLabelContainerStyle={{ zIndex: -1 }}
          // showReferenceLine1
          // referenceLine1Config={{color: color.palette.deepGray, dashWidth: 10, thickness: 2}}
          // referenceLine1Position={highestNav-5000}
          verticalLinesUptoDataPoint
          getPointerProps={(pointerProps) => {
            if (pointerProps.pointerIndex > 0) {
              setScrollAble(false)
              return
            }
            setScrollAble(true)
          }}
          pointerConfig={{
            // pointerStripHeight: 160,
            pointerStripColor: color.palette.deepGray,
            pointerStripWidth: 2,
            pointerColor: color.primary,
            radius: 4,
            pointerLabelWidth: s(100),
            pointerLabelHeight: 90,
            // set to false => can not scroll
            activatePointersOnLongPress: false,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: items => {
              return (
                <View style={styles.toolkit}>
                  <AppText style={{ fontSize: ms(14), textAlign: "center" }}>
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

      <View style={[ROW, SPACE_BETWEEN, styles.wrapDate]}>
        <AppText value={formatDate(startDate)} />
        <AppText value={formatDate(endDate)} />
      </View>
    </Pressable>
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
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: color.background,
    marginTop: "10@s",
    padding: "5@s",
    borderRadius: "8@s",
  },
  wrapDate: {
    paddingLeft: "4@s",
    paddingRight: "20@s",
  },
})
