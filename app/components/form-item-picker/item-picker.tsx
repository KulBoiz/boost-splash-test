import React, { useState } from "react"
import { View } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import { ScaledSheet } from "react-native-size-matters"
import { color, spacing } from "../../theme"
import { AppText } from "../app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldPath } from "react-hook-form/dist/types"

interface DataProps{
  value: string
  label:string
}

interface Props{
  label:string
  placeholder: string
  errorMessage: string
  setValue: UseFormSetValue<FieldValues>
  data: Array<DataProps>
  name: FieldPath<FieldValues>
  value: string
  handleSelect?: any
}

const ItemPicker = React.memo((props: Props) => {
  const { value, label, placeholder,errorMessage, setValue, data = [{value: '', label: ''}], name, handleSelect} = props
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  const handleSelect = ()=> {
    setValue()
    setOpen(false)
  }
  return (
    <View style={styles.wrapper}>
    <View style={styles.container}>
      <AppText value={label} style={styles.label} color={open ? color.palette.blue : color.palette.black}/>
      <DropDownPicker
        open={open}
        value={value}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        style={styles.dropdownContainer}
        listItemContainerStyle={styles.listItemContainerStyle}
        items={items}
        zIndex={1}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        disableBorderRadius={false}
        itemSeparator={true}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        arrowIconContainerStyle={styles.arrowIconContainerStyle}
      />
    </View>
      {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
    </View>
  )
});

export default ItemPicker;

const styles = ScaledSheet.create({
  wrapper: {
    marginVertical: spacing[3]
  },
  container: {
    backgroundColor: 'transparent',
    borderRadius: '8@s',
    paddingHorizontal: '16@ms',
    borderWidth: 1,
    borderColor: color.palette.blue,
  },
  label:{
    top: '10@s',
    fontSize: '11@ms',
    fontFamily: fontFamily.medium
  },
  placeholder: {
    color: color.palette.deepGray
  },
  dropdownContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderColor: color.palette.blue,
    borderRadius: '8@s',
  },
  dropDownContainerStyle: {
    marginTop: '5@s',
    borderWidth: 1,
    borderColor: color.palette.blue,
    borderRadius: '8@s',
    width: '110%',
    marginLeft: '-5%',
    backgroundColor: color.background
  },
  listItemContainerStyle: {
    paddingHorizontal: '16@ms',
    height: '40@s'
  },
  itemSeparatorStyle:{
    backgroundColor: color.palette.deepGray,
    marginHorizontal: '16@ms',
    height: 0.5
},
  arrowIconContainerStyle: {
    marginBottom: '12@s'
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s'
  }
});
