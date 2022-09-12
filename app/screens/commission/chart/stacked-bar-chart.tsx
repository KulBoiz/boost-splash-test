import React from 'react';
import { StyleSheet, ScrollView } from "react-native"
import { StackedBarChart } from "react-native-chart-kit"
import { width } from "../../../constants/variable"
import { color } from "../../../theme"

interface Props{}

const data = {
  labels: ["1991", "1992","1993", "1994","1995", "1996","1997", "1998","1999", "2000","2001", "2002"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 90],
    [30, 60],
    [60, 60],
    [30, 60],
    [60, 90],
    [30, 60],
    [60, 60],
    [30, 60],
    [60, 90],
    [30, 60],
    [60, 60],
    [30, 60],
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
            width={width*3}
            height={320}
            chartConfig={{
              backgroundColor: color.background,
              backgroundGradientFrom: color.background,
              backgroundGradientTo: color.background,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                // borderRadius: 16,
              },
            }}
            hideLegend={false}
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
