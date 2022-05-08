import React, { useEffect, useState } from "react"
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { PRODUCT_TYPES_OPTIONS } from "../constants"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"

interface Props{
  value: string,
  setValue(e: any): void
}

const ProductTypePicker = React.memo((props: Props) => {
  const {value, setValue} = props
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(PRODUCT_TYPES_OPTIONS);

  useEffect(()=> {

  },[])
  return (
    <DropDownPicker
      listMode={'SCROLLVIEW'}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      dropDownContainerStyle={styles.listItemContainerStyle}
    />
  )
});

export default ProductTypePicker;

const styles = ScaledSheet.create({
  container: {},
  listItemContainerStyle: {
    marginTop: '10@s',
      borderColor: color.palette.blue,
    borderWidth: 1
  }
});
