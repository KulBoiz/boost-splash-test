import React from 'react';
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "../app-text/AppText"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { ScaledSheet } from "react-native-size-matters"
import { SuccessSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"
import { FONT_REGULAR_14 } from "../../styles/common-style"

interface Props{
  visible: boolean,
  title?: string,
  onPress(): void
}

const SuccessModal = React.memo((props: Props) => {
  const {visible, title= '', onPress} = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onPress}
    >
      <View style={styles.body}>
          <SuccessSvg />
          <AppText style={[FONT_REGULAR_14, styles.title]}>{title}</AppText>
          <AppText value={'Thành công'} style={styles.successText}/>
      </View>
    </Modal>
  )
});

export default SuccessModal;

const styles = ScaledSheet.create({
  container: {
    position: 'relative', margin: 0, paddingHorizontal: '12@s'
  },
  body: {
    backgroundColor: Colors.white,
    borderRadius: '8@s',
    paddingVertical: '90@s',
    paddingHorizontal: '16@ms',
    alignItems: "center"
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  title: {
    marginTop: '24@s',marginBottom: '8@s'
  },
  successText: {
    fontFamily: fontFamily.bold,
    fontSize: '24@ms',
    color: color.palette.green
  }

});
