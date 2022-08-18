import React, { useCallback, useState } from "react"
import { View, ScrollView } from "react-native"
import { AppText } from "../../components/app-text/AppText"
import {
  MARGIN_BOTTOM_8,
  ROW,
} from "../../styles/common-style"
import { LOAN_PROCESS } from "./constants"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../constants/font-family"
import DashedLine from "react-native-dashed-line"

interface Props{}

const LoanProcess = React.memo((props: Props) => {
  const [itemHeight, setItemHeight] = useState<number>(0)

  return (
    <ScrollView style={styles.container}>
      <AppText value={'Quy trình vay vốn'} center style={styles.label}/>
      {
        LOAN_PROCESS.map((val, index)=> {
          return(
            <View key={index.toString()} style={ROW} onLayout={useCallback((event) => {
              const { height } = event.nativeEvent.layout;
              setItemHeight(height)
            }, [])}>

              {!(LOAN_PROCESS.length - 1 === index) &&
                <DashedLine axis='vertical' dashLength={4} dashThickness={1} dashGap={5} dashColor='gray' style={[styles.dashLine, { height: itemHeight }]} />
              }
                <View style={styles.blueCircle}>
                <AppText value={index + 1} fontFamily={fontFamily.bold} color={color.primary}/>
              </View>
              <View style={[ROW, MARGIN_BOTTOM_8]}>
                <View style={styles.wrapContent}>
                  <AppText value={val.title} style={MARGIN_BOTTOM_8} fontFamily={fontFamily.medium}/>
                  {val.children.map((e,i)=> (
                    <View  key={i.toString()} style={ROW}>
                      <View style={styles.circle}/>
                      <AppText value={e} style={styles.contentText}/>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
});

export default LoanProcess;

const styles = ScaledSheet.create({
  container: {},
  dashLine: {
    top: '10@s',
    left: '25@s',
    position: 'absolute',
    zIndex: -1
},
  label: {
    marginTop: '18@s',
    marginBottom: '8@s',
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold
  },
  blueCircle: {
    marginTop: '5@s',
    marginLeft:'16@ms',
    marginRight:'5@ms',
    backgroundColor: color.palette.lightBlue,
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    marginTop: '7@s',
    marginLeft: '10@s',
    marginRight: '7@s',
    width: '3@s',
    height: '3@s',
    borderRadius: '1.5@s',
    backgroundColor: color.palette.deepGray
  },
  wrapContent: {
    borderRadius: '8@s',
    backgroundColor: color.background,
    padding: '8@s',
    width:'90%'
  },
  contentText: {
    fontSize: '13@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.gray,
    lineHeight: '18@s'
  }
});
