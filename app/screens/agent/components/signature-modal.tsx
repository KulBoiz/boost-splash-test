import React, { useRef } from "react"
import { View } from "react-native"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import SignatureCapture from 'react-native-signature-capture';
import { color } from "../../../theme"
import { AppText } from "../../../components/app-text/AppText"
import AppButton from "../../../components/app-button/AppButton"
import { FONT_MEDIUM_12, FONT_SEMI_BOLD_12 } from "../../../styles/common-style"

interface Props{
  visible: boolean,
  closeModal(): void
  onSubmit(): void
}

const SignatureModal = React.memo((props: Props) => {
  const {visible, closeModal, onSubmit} = props
  const signRef = useRef(null)

  const resetSign = () =>  {
    // @ts-ignore
    signRef.current.resetImage();
  }
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.body}>
        <View style={styles.title}>
          <AppText value={'Vẽ chữ ký của bạn vào đây'} style={FONT_MEDIUM_12}/>
        </View>
        <AppText value={'Ký lại'} style={styles.reset} onPress={resetSign}/>
        <SignatureCapture
          ref={signRef}
          style={styles.signature}
          strokeColor={color.palette.lightBlack}
          showTitleLabel={false}
          showNativeButtons={false}
          showBorder={false}
          minStrokeWidth={5}
          maxStrokeWidth={5}
        />
        <View style={styles.btnContainer}>
          <AppButton title={'Hủy'} onPress={closeModal} titleStyle={styles.cancelText} style={[styles.btn, styles.cancelBtn]}/>
          <AppButton title={'Tiếp tục'} onPress={onSubmit} titleStyle={FONT_SEMI_BOLD_12} style={[styles.btn, styles.submitBtn]}/>
        </View>
      </View>

    </Modal>
  )
});

export default SignatureModal;

const styles = ScaledSheet.create({
  container: {
    position: 'relative', margin: 0, paddingHorizontal: '36@ms'
  },
  reset: {
    color: color.palette.blue,
    top: '30@s',
    left: '20@ms',
    zIndex: 1
  },
  body: {
    backgroundColor: color.palette.lightBlue,
    borderRadius: '8@s',
  },
  title: {
    paddingVertical: '24@s',
    alignItems: "center"
  },
  signature: {
    height: '250@vs'
  },
  btnContainer:{
    flex:1 ,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: '16@ms',
    paddingVertical: '36@s',
    backgroundColor: color.palette.lightBlue,
    alignItems:"center",
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s'
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
    backgroundColor: 'transparent',
  },
  submitBtn:{
    backgroundColor: color.palette.blue,
  }
});
