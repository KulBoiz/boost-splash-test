import React from 'react';
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { View } from 'react-native';

interface Props{
  visible: boolean,
  onChange(event: any, selectedDate: any): void
  date: any
  closeModal():void
}

const ModalDatePicker = React.memo((props: Props) => {
  const {visible, onChange, date,closeModal} = props
  return (
      <Modal
        isVisible={visible}
        style={styles.container}
        animationIn="fadeIn"
        animationOut="fadeOut"
        onBackdropPress={closeModal}
      >
        <View style={styles.dateContainer}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display={'inline'}
            onChange={onChange}
          />
        </View>

      </Modal>
  )
});

export default ModalDatePicker;

const styles = ScaledSheet.create({
    container: {
      position: 'relative',
      justifyContent: 'flex-end',
      margin: 0,
    },
  dateContainer: {
      backgroundColor: color.background,
    paddingTop: '10@s',
    borderTopLeftRadius: '8@s',
    borderTopRightRadius: '8@s'
  }
});
