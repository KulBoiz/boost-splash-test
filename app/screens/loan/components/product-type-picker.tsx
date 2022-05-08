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
      <AppText value={'Loại vay'} style={[styles.label, FONT_MEDIUM_12]}/>
      <Pressable style={[ROW, SPACE_BETWEEN,styles.container, open && styles.openContainer]} onPress={handleModal}>
        <AppText value={label} style={FONT_MEDIUM_14} capitalize/>
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
    backgroundColor: color.dim,
    padding: '12@s',
    borderRadius: '8@s'
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
    borderRadius: '8@s',
    marginTop: '4@s',
    paddingHorizontal: '12@s',
    backgroundColor: color.dim,

  },
  label:{
    color: color.palette.lighterGray,
    textTransform: 'capitalize',
    marginBottom: '13@s'
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#DEE0E3',
    paddingVertical: '12@s'
  }
});
