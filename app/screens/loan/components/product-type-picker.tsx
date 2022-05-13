import React, {  useState } from "react"
import { Pressable, View } from "react-native"
import { PRODUCT_TYPE, PRODUCT_TYPES_OPTIONS } from "../constants"
import { ScaledSheet } from "react-native-size-matters"
import { color, spacing } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import {
  FONT_BOLD_14,
  FONT_MEDIUM_12,
  FONT_MEDIUM_14,
  FONT_SEMI_BOLD_14,
  ROW,
  SPACE_BETWEEN,
} from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"

interface Props{
  value: string,
  setValue(e: any): void
}

const ProductTypePicker = React.memo((props: Props) => {
  const {value, setValue} = props
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(PRODUCT_TYPES_OPTIONS[0].label);

  const handlePress = (val) => {
    setValue(val.value)
    setLabel(val.label)
    setOpen(false)
  }
  const handleModal = () => {
    setOpen(!open)
  }
  return (
    <View style={styles.wrapper}>
      <Pressable style={[ROW, SPACE_BETWEEN,styles.container, styles.openContainer]} onPress={handleModal}>
        <View>
        <AppText value={'Loại vay'} style={[styles.label]}/>
        <AppText value={label} style={FONT_MEDIUM_14} capitalize/>
        </View>
        <FastImage
          source={open ? images.arrow_up : images.arrow_down}
          style={styles.icon}
          tintColor={color.palette.lightBlack}
        />
      </Pressable>
      {open &&
        <View style={styles.itemWrapper}>
          {PRODUCT_TYPES_OPTIONS.map((val, index)=> {
          return(
            <Pressable key={val.label + index.toString()}
                       onPress={()=> handlePress(val)}
                       style={styles.itemContainer}
            >
              <AppText value={val.label} style={value === val.value ? FONT_BOLD_14 : FONT_MEDIUM_14}/>
            </Pressable>
          )
        })}
        </View>
      }
    </View>
  )
});

export default ProductTypePicker;

const styles = ScaledSheet.create({
  wrapper: {
    marginVertical: spacing[3]
  },
  container: {
    paddingVertical: '11@ms',
    paddingHorizontal: '16@ms',
    borderRadius: '12@s',
    alignItems: "center"
  },
  icon :{
    width: '16@s',
    height: '16@s'
  },
  openContainer:{
    borderWidth: 1,
    borderColor: color.palette.blue,
  },
  itemWrapper: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    borderRadius: '12@s',
    marginTop: '4@s',
    paddingHorizontal: '16@s',

  },
  label:{
    fontSize: '11@ms',
    fontFamily: fontFamily.medium,
    color: color.palette.lightBlack,
    marginBottom: '4@s'
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#DEE0E3',
    paddingVertical: '20@ms'
  }
});
