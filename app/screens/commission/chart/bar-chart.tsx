import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { BarChart as Chart } from "react-native-chart-kit"
import { width } from "../../../constants/variable"

interface dataProps {
  labels: Array<string>
  datasets: any
}

interface Props {
  data: dataProps
}

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForHorizontalLabels: {x: 65}
}

const BarChart = React.memo(({ data }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Chart
        style={styles.graphStyle}
        data={data}
        width={width}
        height={220}
        // yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={20}
      />
    </ScrollView>
  )
})

export default BarChart

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  graphStyle: {
    marginVertical: 20,
  },
})
