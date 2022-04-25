import React, { useState } from "react"
import { Pressable, View, ViewStyle } from "react-native"
import CountryPicker from "react-native-country-picker-modal"
import { AppText } from "../../../components/app-text/AppText"
import { ArrowDownSvg } from "../../../assets/svgs"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import i18n from 'i18n-js';

interface Props{
  style?: ViewStyle | any
  changePrefix(e: string): void
}

const CountrySelect = React.memo((props: Props) => {
  const {style, changePrefix} = props
  const [visible, setVisible]= useState<boolean>(false)
  const [selectData, setSelectData] = useState<any>({cca2: 'VN'})

  const openSelect =() => {
    setVisible(true)
  }

  const closeSelect = () => {
    setVisible(false)
  }

  const handleSelect = (val) => {
    changePrefix(val?.callingCode[0] ?? '')
    setSelectData(val)
  }

  return (
   <View style={style}>
     <AppText tx={"label.location"} style={styles.label}/>
     <View style={styles.container}>
       <View style={styles.flagContainer}>
         <CountryPicker
           {...{
             withFilter: true,
             countryCode: selectData.cca2,
             withFlag: true,
             withCallingCode: true,
             withEmoji: false,
             onSelect: handleSelect,
             visible,
             onClose: closeSelect,
             onOpen: openSelect
           }}
         />
       </View>
       <Pressable style={styles.countryContainer} onPress={openSelect}>
         <AppText fontSize={ms(14)} color={selectData?.name ? color.palette.black : color.placeholder}>{selectData?.name ?? i18n.t('placeholder.location')}</AppText>
         <ArrowDownSvg />
       </Pressable>
     </View>
   </View>
  )
});

export default CountrySelect;
CountrySelect.displayName = 'CountrySelect'

const styles = ScaledSheet.create({
  label: {
    fontSize: '12@ms',
    fontFamily: 'Inter-SemiBold',
    marginBottom: s(13)
  },
    container: {
      flexDirection: 'row',
      paddingVertical: '5@s',
      backgroundColor: color.palette.white,
      borderRadius: '5@s',

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 16.00,

      elevation: 24,
    },
  flagContainer: {
    borderRightWidth: 1,
    paddingBottom: '3@s',
    paddingHorizontal: '12@ms',
    borderColor: '#DEDEDE'
  },
  countryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: '12@ms',
  }
});
