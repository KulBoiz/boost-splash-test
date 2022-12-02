import React, { useEffect, useState } from "react"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldPath } from "react-hook-form/dist/types"
import ItemPickerModal from "./item-picker-modal"
import { truncateString } from "../../constants/variable"
import { TextField } from "../text-field/text-field"
import { Box, Pressable, Row } from "native-base"
import { Keyboard } from "react-native"

interface DataProps {
  value: string
  label: string
}

interface Props {
  label?: string
  placeholder?: string
  errorMessage: string
  setValue: UseFormSetValue<FieldValues>
  data: Array<DataProps>
  name: FieldPath<FieldValues>
  value?: string
  handleSelect?: any
  onChangeSearchText?: any
  clearErrors?: UseFormClearErrors<FieldValues>;
  disable?: boolean
  required?: boolean
}

const ItemPicker = React.memo((props: Props) => {
  const {
    value,
    label,
    placeholder,
    errorMessage,
    setValue,
    data = [{ value: "", label: "" }],
    name,
    handleSelect,
    onChangeSearchText,
    clearErrors,
    required = false,
    disable
  } = props
  const [title, setTitle] = useState<string>("")
  const [modal, setModal] = useState<boolean>(false)

  const handleSelectOption = (val) => {
    setValue(name, val.value)
    setTitle(val.label)
    if (clearErrors) {
      clearErrors(name)
    }
    if (handleSelect) handleSelect(val)
    setModal(false)
  }

  useEffect(() => {
    if (!value) {
      setTitle("")
    }
    if (value || value?.toString() === '0'){
      const t = data?.find(d => d?.value === value)?.label ?? value ?? ''
      setTitle(t)
    }
  }, [value])

  return (
    <Row alignItems="center" style={styles.container}>
      <Box flex={1}>
        <TextField
          required={required}
          label={label}
          placeholder={placeholder}
          value={truncateString(title, 35)}
          editable={false}
          errorMessage={errorMessage}
        />
      </Box>
      <Box position="absolute" right="12px" pt="1">
        <FastImage source={images.arrow_down} style={styles.icon} />
      </Box>
      <Pressable
        onPress={() => {
          Keyboard.dismiss()
          setModal(true)
        }}
        disabled={disable}
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="1"
      />
      <ItemPickerModal
        {...{
          title,
          label,
          visible: modal,
          closeModal: () => setModal(false),
          data,
          onPress: handleSelectOption,
          onChangeSearchText,
        }}
      />
    </Row>
  )
})

export default ItemPicker

const styles = ScaledSheet.create({
  container: {
    // marginVertical: spacing[3],
  },
  icon: {
    width: "16@s",
    height: "16@s",
  },
})
