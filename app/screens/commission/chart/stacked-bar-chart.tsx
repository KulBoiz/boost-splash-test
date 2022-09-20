import React from 'react';
import { StyleSheet, ScrollView } from "react-native"
import { StackedBarChart } from "react-native-chart-kit"
import { width } from "../../../constants/variable"
import { color } from "../../../theme"

interface Props{}

const data = {
  labels: ["2018","2019","2020", "2021","2022"],
  // legend: ["L1", "L2", "L3"],
  data: [
    [0, 0],
    [30, 60],
    [600, 900],
    [100, 600],
    [100, 200],
  ],
  barColors: ["#6E94F2", "#83D7AE"]
};

const chartConfigs = [
  {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
  },
]

const StackedBar = React.memo((props: Props) => {
  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      {chartConfigs.map((chartConfig, index) => {
        const labelStyle = {
          color: chartConfig.color(),
          marginVertical: 10,
          textAlign: 'center',
          fontSize: 16
        }
        const graphStyle = {
          marginVertical: 8,
        }
        return(
          <StackedBarChart
            key={index}
            style={graphStyle}
            data={data}
            width={width}
            height={320}
            chartConfig={{
              backgroundColor: color.background,
              backgroundGradientFrom: color.background,
              backgroundGradientTo: color.background,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                paddingHorizontal:10
                // borderRadius: 16,
              },
            }}
            hideLegend={true}
          />
        )
      })}
    </ScrollView>
  )
});

export default StackedBar;

const styles = StyleSheet.create({
    container: {},
  graphStyle :{

  }
});
