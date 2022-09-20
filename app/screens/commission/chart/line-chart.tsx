import React, { useCallback, useState } from "react"
import { View } from "react-native"
import { LineChart as ChartKit } from "react-native-chart-kit"
import { width } from "../../../constants/variable"
import { color } from "../../../theme"
import Svg, { Rect, Text } from "react-native-svg"
import { ScaledSheet } from "react-native-size-matters"

interface Props {
}

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
}
const chartConfig = {
  backgroundColor: color.background,
  backgroundGradientFrom: color.background,
  backgroundGradientTo: color.background,
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "1",
    stroke: color.palette.lightBlack,
  },
}

const LineChart = React.memo((props: Props) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

  function tooltipAction(data) {
    // check if we have clicked on the same point again
    const isSamePoint = (tooltipPos.x === data.x
      && tooltipPos.y === data.y)

    // if clicked on the same point again toggle visibility
    // else,render tooltip to new position and update its value
    isSamePoint ? setTooltipPos((previousState) => {
        return {
          ...previousState,
          value: data.value,
          visible: !previousState.visible,
        }
      })
      :
      setTooltipPos({
        x: data.x,
        value: data.value, y: data.y,
        visible: true,
      })
  }

  function renderTooltip() {
    return tooltipPos.visible ? <View>
      <Svg>
        <Text
          x={tooltipPos.x}
          y={tooltipPos.y + 20}
          fill="black"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle">
          {tooltipPos?.value?.toFixed(2)}
        </Text>
      </Svg>
    </View> : null
  }

  return (
    <View style={styles.container}>
      <ChartKit
        onDataPointClick={tooltipAction}
        decorator={renderTooltip}
        data={data}
        width={width}
        height={320}
        withHorizontalLines={false}
        withVerticalLines={false}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  )
})

export default LineChart

const styles = ScaledSheet.create({
  container: {},
  tooltip: {
    backgroundColor: color.background,
    padding: 5,
    elevation: 5,
    alignItems: 'center',
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,

    shadowRadius: 3.84,
  },
})
