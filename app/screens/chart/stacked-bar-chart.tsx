import React from 'react';
import { View, StyleSheet, ScrollView } from "react-native"
import { StackedBarChart } from "react-native-chart-kit"
import { width } from "../../constants/variable"

interface Props{}

const data = {
  labels: ["Test1", "Test2","Test1", "Test2","Test1", "Test2","Test1", "Test2","Test1", "Test2","Test1", "Test2"],
  legend: ["L1", "L2", "L3"],
  data: [
    [60, 60, 90],
    [30, 30, 60],
    [60, 60, 60],
    [30, 30, 60],
    [60, 60, 90],
    [30, 30, 60],
    [60, 60, 60],
    [30, 30, 60],
    [60, 60, 90],
    [30, 30, 60],
    [60, 60, 60],
    [30, 30, 60],
  ],
  barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
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
    <ScrollView style={styles.container} horizontal>
      {chartConfigs.map((chartConfig, index) => {
        const labelStyle = {
          color: chartConfig.color(),
          marginVertical: 10,
          textAlign: 'center',
          fontSize: 16
        }
        const graphStyle = {
          marginVertical: 8,
          paddingHorizontal: 20
        }
        return(
          <StackedBarChart
            key={index}
            style={graphStyle}
            data={data}
            width={width*3}
            height={320}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
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
