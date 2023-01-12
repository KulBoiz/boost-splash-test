import React from "react"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import DateTimePicker from "@react-native-community/datetimepicker"
import { View } from "react-native"
import { AppText } from "../app-text/AppText"

interface Props {
  visible: boolean,
  date: any
  isMaximumDate?: boolean
  isMinimumDate?: boolean

  onChange(event: any, selectedDate: any): void

  closeModal(): void
}

const ModalDatePicker = React.memo((props: Props) => {
  const { visible, onChange, date, closeModal, isMaximumDate = true, isMinimumDate = false } = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={closeModal}
    >
      <View style={styles.dateContainer}>
        <View style={styles.header}>
          <AppText value={"Hủy"} style={styles.headerText} textAlign={'left'} onPress={closeModal}/>
          <AppText value={"Chọn giá trị"} />
          <AppText value={"Xong"} style={styles.headerText} textAlign={'right'} onPress={closeModal}/>
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display={"spinner"}
          onChange={onChange}
          themeVariant="light"
          maximumDate={isMaximumDate ? new Date() : undefined}
          minimumDate={isMinimumDate ? new Date() : undefined}
        />
      </View>

    </Modal>
  )
})

export default ModalDatePicker

const styles = ScaledSheet.create({
  container: {
    position: "relative",
    justifyContent: "flex-end",
    margin: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "16@s",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.BABABA,
    paddingBottom: '12@s',
    paddingTop: '4@s'
  },
  headerText: {
    color: color.primary,
    width: '50@s',
    fontSize: '16@ms'
  },
  dateContainer: {
    backgroundColor: color.background,
    paddingTop: "10@s",
    borderTopLeftRadius: "8@s",
    borderTopRightRadius: "8@s",
  },
})
