import React from 'react';
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { CancelSvg } from "../../assets/svgs"
import AppButton from "../app-button/AppButton"
import { color } from "../../theme"

interface Props{
  visible: boolean,
  title?: string,
  children?: React.ReactNode
  closeModal(): void
}

const AppSectionModal = React.memo((props: Props) => {
  const {visible, title= '', children, closeModal} = props
  return (
      <Modal
        isVisible={visible}
        style={styles.container}
        animationIn="fadeIn"
      animationOut="fadeOut"
      swipeDirection={['up', 'left', 'right', 'down']}
      >
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            <AppText>{title}</AppText>
            <TouchableOpacity onPress={closeModal}>
              <CancelSvg />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {children}
          </View>
        </View>
      </Modal>
  )
});

export default AppSectionModal;
AppSectionModal.displayName = 'AppSectionModal'

const styles = ScaledSheet.create({
    container: {
    // position: 'relative', margin: 0, paddingHorizontal: '12@s',
      justifyContent: 'flex-end',
      margin: 0,
    },
  body: {
      backgroundColor: color.background,
    borderRadius: '8@s',
    padding: '10@s'
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    alignItems: "center"
  },
  contentContainer:{
      minHeight: '200@ms',
      alignItems: 'center',
    justifyContent:'center'
  },
   content: {
      textAlign: "center",
     fontSize: '18@ms',
     lineHeight: '22@s'
   }
});
