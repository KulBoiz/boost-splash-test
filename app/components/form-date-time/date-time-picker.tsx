import React, { useState } from "react"
import { Pressable, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../app-text/AppText"
import { color, spacing } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { CalenderSvg } from "../../assets/svgs"
import { UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import moment from "moment"
import { FieldPath } from "react-hook-form/dist/types"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
import ModalDatePicker from "./modal-pick-date"
import { isAndroid } from "../../constants/variable"
import DateTimePicker from "@react-native-community/datetimepicker"


interface Props {
  value: string
  setValue: UseFormSetValue<FieldValues>
  errorMessage: string
  label: string
  placeholder: string
  name: FieldPath<FieldValues>
}

const DatePicker = React.memo((props: Props) => {
  const { value, setValue, errorMessage, placeholder, label, name } = props
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setValue(name, selectedDate)
  };

  const showMode = () => {
    setShow(!show);
  };


  return (
    <View style={styles.container}>
      <Pressable style={[styles.wrapper , {borderColor: errorMessage ? color.palette.angry : color.palette.blue, }]} onPress={showMode}>
        <View>
          <AppText value={label} style={styles.label} color={color.palette.black}/>
          <AppText
            value={value ? moment(value).format('DD/MM/YYYY') : placeholder}
             style={FONT_MEDIUM_14} color={value ? color.palette.black : color.palette.deepGray}
          />
        </View>
        <CalenderSvg />
      </Pressable>
      <View>
        {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
      </View>
      {isAndroid ?
        <>
          {
            show && <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display={'default'}
            onChange={onChange}
          />
          }
        </>
        : <ModalDatePicker visible={show} onChange={onChange} date={date} closeModal={()=> setShow(false)}/>
      }
    </View>
  )
});

export default DatePicker;

const styles = ScaledSheet.create({
  container: {
    marginVertical: spacing[3],
    paddingTop: isAndroid ? '5.5@vs' : '4.5@vs'
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: '4@s',
    paddingVertical: '5.5@vs',
    paddingHorizontal: '16@ms'
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s',
    position: "absolute",
    top: '-5@s'
  },
  label: {
    fontSize: '11@ms',
    fontFamily: fontFamily.medium,
    marginBottom: '4@s'
  },
});
