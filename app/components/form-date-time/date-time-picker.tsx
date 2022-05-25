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
      <Pressable style={styles.wrapper} onPress={showMode}>
        <View>
          <AppText value={label} style={styles.label} color={color.palette.black}/>
          <AppText
            value={value ? moment(value).format('DD/MM/YYYY') : placeholder}
             style={FONT_MEDIUM_14} color={value ? color.palette.black : color.palette.deepGray}
          />
        </View>
        <CalenderSvg />
      </Pressable>
      {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
        <ModalDatePicker visible={show} onChange={onChange} date={date} closeModal={()=> setShow(false)}/>
    </View>
  )
});

export default DatePicker;

const styles = ScaledSheet.create({
  container: {
    paddingVertical: spacing[3]
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.palette.blue,
    borderRadius: '12@s',
    paddingVertical: '11@ms',
    paddingHorizontal: '16@ms'
  },
  datePicker: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s'
  },
  label: {
    fontSize: '11@ms',
    fontFamily: fontFamily.medium,
    marginBottom: '4@s'
  },
});
