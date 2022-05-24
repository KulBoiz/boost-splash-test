import React, { useState } from "react"
import { Pressable, View } from "react-native"
import DateTimePicker  from "@react-native-community/datetimepicker"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../app-text/AppText"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { CalenderSvg } from "../../assets/svgs"


interface Props{
  value : string
  setValue(): void
  errorMessage: string
  label: string
  placeholder: string
}

const DatePicker = React.memo((props: Props) => {
  const {value, setValue, errorMessage, placeholder, label} = props
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(!show);
  };


  return (
    <View style={styles.container}>
      <Pressable style={styles.wrapper} onPress={showMode}>
        <AppText value={label} style={styles.label} color={color.palette.black}/>

        <CalenderSvg />
      </Pressable>
      {!!errorMessage && <AppText value={errorMessage} style={styles.errorMessage}/> }
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display={'inline'}
          onChange={onChange}
        />
      )}
    </View>
  )
});

export default DatePicker;

const styles = ScaledSheet.create({
    container: {},
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: color.palette.blue,
    borderRadius: '12@s',
    paddingVertical: '12@s',
    paddingHorizontal: '16@ms'
  },
  datePicker:{
      flex:1,
    backgroundColor: 'transparent'
  },
  errorMessage: {
    fontFamily: 'Inter-Medium',
    color: color.palette.angry,
    fontSize: '13@ms',
    marginTop: '10@s'
  },
  label:{
    fontSize: '11@ms',
    fontFamily: fontFamily.medium
  },
});
