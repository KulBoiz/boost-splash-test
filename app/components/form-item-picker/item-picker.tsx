import React, { useEffect, useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import { AppText } from "../app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color, spacing } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import {
  ALIGN_CENTER,
  CONTAINER_PADDING,
  FONT_MEDIUM_14,
  FONT_REGULAR_12, FONT_REGULAR_14,
  ROW,
  SPACE_BETWEEN,
} from "../../styles/common-style"
import { UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldPath } from "react-hook-form/dist/types"
import ItemPickerModal from "./item-picker-modal"

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
  const [title, setTitle] = useState<string>('')
  const [modal, setModal] = useState<boolean>(false)

  const handleSelectOption = (val) => {
    setTitle(val.label)
    setValue(name, val.value)
    if (handleSelect) handleSelect(val)
    setModal(false)
  }

  useEffect(()=> {
    if (!value){
      setTitle('')
    }
  },[value])

  return (
    <View style={styles.container}>
      <Pressable style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, styles.border, !!errorMessage && {borderColor: color.palette.angry}]} onPress={()=> setModal(true)}>
        <View>
          <AppText style={styles.label} value={label}/>
          <AppText style={FONT_REGULAR_14} value={title || placeholder} color={title ? color.palette.black : color.palette.gray}/>
        </View>
        <FastImage source={images.arrow_down} style={styles.icon} />
        </Pressable>
      {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
      <ItemPickerModal {...{
        title,
        label,
        visible: modal,
        closeModal: ()=> setModal(false),
        data,
        onPress: handleSelectOption,
      }}/>
    </View>
  )
});

export default ItemPicker;

const styles = ScaledSheet.create({
  container: {
    marginVertical: spacing[3],
  },
  border: {
    paddingHorizontal: '12@ms',
    borderWidth: 1.5,
    borderColor: color.palette.deepGray,
    borderRadius: '3@s',
    paddingVertical: '5@vs'
  },
  label:{
    marginBottom: '4@s',
    fontSize: '11@ms',
    fontFamily: fontFamily.regular
  },
  icon: {
    width: '16@s',
    height: '16@s'
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s'
  }
});
