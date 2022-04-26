import React from 'react';
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "../app-text/AppText"
import { Colors } from "react-native/Libraries/NewAppScreen"
import { ScaledSheet } from "react-native-size-matters"
import { CancelSvg } from "../../assets/svgs"
import AppButton from "../app-button/AppButton"

interface Props{
  visible: boolean,
  title?: string,
  content?:string,
  children?: React.ReactNode
  closeModal(): void
}

const AppModal = React.memo((props: Props) => {
  const {visible, title= '', content, children, closeModal} = props
  return (
      <Modal
        isVisible={visible}
        style={styles.container}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            <AppText>{title}</AppText>
            <TouchableOpacity onPress={closeModal}>
              <CancelSvg />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {children || <AppText style={styles.content}>{content}</AppText>}
          </View>
          <AppButton title={'Xác nhận'} onPress={closeModal}/>
        </View>
      </Modal>
  )
});

export default AppModal;
AppModal.displayName = 'AppModal'

const styles = ScaledSheet.create({
    container: {
      position: 'relative', margin: 0, paddingHorizontal: '12@s'
    },
  body: {
      backgroundColor: Colors.white,
    borderRadius: '8@s',
    padding: '10@s'
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    alignItems: "center"
  },
  contentContainer:{
      minHeight: '150@ms',
      alignItems: 'center',
    justifyContent:'center'
  },
   content: {
      textAlign: "center",
     fontSize: '18@ms',
     lineHeight: '22@s'
   }
});
