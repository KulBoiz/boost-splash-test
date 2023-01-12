import React, { useState } from "react"
import { Keyboard, Pressable } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { CalenderSvg } from "../../assets/svgs"
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import moment from "moment"
import { FieldPath } from "react-hook-form/dist/types"
import ModalDatePicker from "./modal-pick-date"
import { isAndroid } from "../../constants/variable"
import DateTimePicker from "@react-native-community/datetimepicker"
import { TextField } from "../text-field/text-field"
import { Box, Row } from "native-base"

interface Props {
  value: string
  setValue: UseFormSetValue<FieldValues>
  errorMessage: string
  label: string
  placeholder: string
  labelTx: string
  placeholderTx: string
  name: FieldPath<FieldValues>
  isMaximumDate?: boolean
  isMinimumDate?: boolean
  clearErrors?: UseFormClearErrors<FieldValues>
  disable?: boolean
  required?: boolean
}

const DatePicker = React.memo((props: Props) => {
  const {
    value,
    setValue,
    errorMessage,
    placeholder,
    label,
    name,
    isMaximumDate = true,
    isMinimumDate = false,
    required = false,
    labelTx,
    placeholderTx,
    clearErrors,
    disable = false
  } = props
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setDate(currentDate)
    setValue(name, selectedDate)
    if (clearErrors) {
      clearErrors(name)
    }
    if (isAndroid){
      setShow(false)
    }
  }

  const showMode = () => {
    setShow(!show)
  }

  return (
    <Row alignItems="center" style={styles.container}>
      <Box flex={1}>
        <TextField
          required={required}
          label={label}
          placeholder={placeholder}
          labelTx={labelTx}
          placeholderTx={placeholderTx}
          value={value ? moment(value).format("DD/MM/YYYY") : ""}
          editable={false}
          errorMessage={errorMessage}
        />
        <Box position="absolute" right="12px" pt="95%">
          <CalenderSvg/>
        </Box>
      </Box>
      <Pressable
        onPress={() => {
          Keyboard.dismiss()
          showMode()
        }}
        // position="absolute"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
        disabled={disable}
      />
      {isAndroid ? (
        <>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"date"}
              display={"default"}
              onChange={onChange}
              maximumDate={isMaximumDate ? new Date() : undefined}
              minimumDate={isMinimumDate ? new Date() : undefined}
            />
          )}
        </>
      ) : (
        <ModalDatePicker
          visible={show}
          onChange={onChange}
          date={date}
          closeModal={() => setShow(false)}
          isMaximumDate={isMaximumDate}
          isMinimumDate={isMinimumDate}
        />
      )}
    </Row>
  )
})

export default DatePicker

const styles = ScaledSheet.create({
  container: {
    flex:1
    // marginVertical: spacing[3],
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: "4@s",
    // paddingVertical: isAndroid ? '3@s' : 9.5,
    paddingHorizontal: "12@ms",
  },
  errorMessage: {
    fontFamily: fontFamily.medium,
    color: color.palette.angry,
    fontSize: "12@ms",
    marginTop: "10@s",
    position: "absolute",
    top: "-7@s",
  },
  label: {
    fontSize: "11@ms",
    fontFamily: fontFamily.medium,
    marginBottom: "4@s",
  },
})
