import React from 'react';
import { View, Pressable } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { LinearGradient } from 'expo-linear-gradient';

interface Props{
  index: number
  setIndex(e: number): void
}

const TAB = [
  {
    label: 'Vay vốn',
    index: 0
  },
  {
    label: 'Bảo hiểm',
    index: 1
  },
  {
    label: 'Đầu tư',
    index: 2
  },
]

const TabSelect = React.memo((props: Props) => {
  const {index, setIndex} = props
  return (
    <View style={styles.container}>
      {TAB.map((e)=> {
        const isSelect = index === e.index
        return (
          <>
            {isSelect ?
              <Pressable key={e.index} style={styles.itemContainer} onPress={()=> setIndex(e.index)}>
                <LinearGradient colors={['#074ED7', '#3E7AFE']} style={styles.linear}>
                  <AppText value={e.label} color={color.palette.white} fontSize={ms(14)} fontFamily={fontFamily.bold}/>
                </LinearGradient>
              </Pressable>
              :
              <Pressable key={e.index} style={styles.itemContainer} onPress={()=> setIndex(e.index)}>
                <AppText value={e.label} color={color.palette.BABABA} fontSize={ms(14)} fontFamily={fontFamily.semiBold}/>
              </Pressable>
            }
          </>
        )}
      )}
    </View>
  )
});

export default TabSelect;

const styles = ScaledSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: '80@s',
      backgroundColor: color.background,
      padding: '4@s',
      marginHorizontal: '24@ms',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,

      elevation: 3,
    },
  itemContainer: {
    width: '33.3333%',
    alignItems: "center",
    justifyContent: "center",
  },
  linear: {
    width: '100%',
    alignItems: "center",
    borderRadius: '20@s',
    paddingVertical: '12@s'
  },
});
