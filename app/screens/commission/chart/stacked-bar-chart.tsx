import React from 'react';
import { StyleSheet, ScrollView } from "react-native"
import { StackedBarChart } from "react-native-chart-kit"
import { width } from "../../../constants/variable"

interface dataProps {
  labels: Array<string>
  data: Array<Array<number>>
}
interface Props{
  data: dataProps
}

const chartFirstColor = '#6E94F2'
const chartSecondColor =  "#83D7AE"

// const data = {
//   labels: ["2018","2019","2020", "2021","2022"],
//   // legend: ["L1", "L2", "L3"],
//   data: [
//     [0, 0],
//     [30, 60],
//     [600, 900],
//     [100, 600],
//     [100, 200],
//   ],
//   barColors: [chartFirstColor, chartSecondColor]
// };

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  }


const StackedBar = React.memo(({ data }: Props) => {
  const barColor = {barColors: [chartFirstColor, chartSecondColor]}
  const realData = {...data, ...barColor}

  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
          <StackedBarChart
            style={styles.graphStyle}
            data={realData}
            width={width}
            height={320}
            chartConfig={chartConfig}
            hideLegend={true}
          />
    </ScrollView>
  )
});

export default StackedBar;

const styles = StyleSheet.create({
    container: {},
  graphStyle : {
    marginVertical: 8,
  }
});
