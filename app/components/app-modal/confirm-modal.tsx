import React from 'react';
import { View } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import AppButton from "../app-button/AppButton"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { FONT_SEMI_BOLD_12 } from "../../styles/common-style"

interface Props{
  visible: boolean,
  cancelTitle?: string,
  submitTitle?: string,
  hideCancel?: boolean,
  title?: string,
  content?:string,
  closeModal(): void
  onPress(): void
}

const ConfirmModal = React.memo((props: Props) => {
  const {visible, title = '', content = '', closeModal, onPress, cancelTitle = '', submitTitle = '', hideCancel = false} = props
  return (
      <Modal
        isVisible={visible}
        style={styles.container}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.body}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.content} value={content} />
          <View style={[styles.btnContainer, {justifyContent: hideCancel ? 'center' : 'space-between'}]}>
            {!hideCancel && <AppButton title={cancelTitle || 'Hủy'} onPress={closeModal} titleStyle={styles.cancelText} style={[styles.btn, styles.cancelBtn]}/> }
            <AppButton title={submitTitle || 'Đồng ý'} onPress={onPress} titleStyle={FONT_SEMI_BOLD_12} style={[styles.btn, styles.submitBtn]}/>
          </View>
        </View>
      </Modal>
  )
});

export default ConfirmModal;

const styles = ScaledSheet.create({
    container: {
      position: 'relative', margin: 0, paddingHorizontal: '36@ms'
    },
  body: {
    backgroundColor:color.background,
    borderRadius: '8@s',
    padding: '24@ms',
  },
  title:{
    color: color.palette.lightBlack,
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
  },
   content: {
     fontSize: '14@ms',
     color: color.palette.lightBlack,
     marginTop: '8@s',
     marginBottom: '24@s',
   },
  btnContainer:{
      flexDirection: 'row',
    justifyContent: "space-between"
  },
  btn:{
    width: '48%',
    height: '40@s',
    borderRadius: '8@s',
    alignItems: "center",
    justifyContent: "center"
  },
  cancelText: {
    color: color.palette.blue,
    fontSize: '12@ms'
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.background,
  },
  submitBtn:{
    backgroundColor: color.palette.blue,

  }
});
