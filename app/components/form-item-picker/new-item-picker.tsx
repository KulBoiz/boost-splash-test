import React, { useEffect, useState } from "react"
import { View, Pressable, ViewStyle } from "react-native"
import { AppText } from "../app-text/AppText"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import { fontFamily } from "../../constants/font-family"
import { color, spacing } from "../../theme"
import { ScrollView } from "react-native-gesture-handler"
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
  handleSelectBank?: any
}

const NewItemPicker = React.memo((props: Props) => {
  const { value, label, placeholder,errorMessage, setValue, data = [{value: '', label: ''}], name, handleSelectBank} = props
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  const toggleItem = () => {
    setOpen(!open)
  }

  const handleSelect = (val) => {
    setTitle(val.label)
    setValue(name, val.value)
    setOpen(false)
    if (handleSelectBank) handleSelectBank(val)
  }

  useEffect(()=> {
    if (!value){
      setTitle('')
    }
  },[value])

  return (
    <View style={styles.container}>
      <Pressable style={styles.valueContainer} onPress={toggleItem}>
        <View>
          <AppText value={label} style={styles.label}/>
          <AppText style={FONT_MEDIUM_14} value={title || placeholder} color={title ? color.palette.lightBlack : color.palette.gray}/>
        </View>
        <FastImage source={open ? images.arrow_up : images.arrow_down} style={styles.icon}/>
      </Pressable>
      {open &&
        <View>
          <ScrollView style={styles.itemContainer}>
            {data.map((val, index) => (
              <Pressable key={index.toString()} style={styles.item} onPress={()=> handleSelect(val)}>
                <AppText value={val.label} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      }
      {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
    </View>
  )
});

export default NewItemPicker;

const styles = ScaledSheet.create({
  container: {
    marginVertical:spacing[3],
    zIndex: 1
  },
  icon: {
    width: '16@ms',
    height: '16@ms'
  },
  valueContainer:{
    flexDirection: 'row',
    borderRadius: '12@s',
    borderWidth:1,
    borderColor: color.palette.blue,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: '10@s',
    paddingHorizontal: '16@ms'
  },
  label:{
    marginBottom: '4@s',
    fontSize: '11@ms',
    fontFamily: fontFamily.medium
  },
  itemContainer:{
    zIndex: 1,
    marginTop: '4@s',
    borderRadius: '12@s',
    borderWidth:1,
    borderColor: color.palette.blue,
    paddingHorizontal: '16@ms',
    height: '120@s',
    width: '100%',
  },
  item: {
    paddingVertical: '16@s',
    borderBottomWidth: 1,
    borderColor: color.palette.BABABA
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s'
  }
});
