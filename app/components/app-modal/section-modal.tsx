import React from 'react';
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { CancelSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { fontFamily } from "../../constants/font-family"

interface Props{
  visible: boolean,
  title?: string,
  children?: React.ReactNode
  closeModal(): void
  hasBorder?: boolean
}

const AppSectionModal = React.memo((props: Props) => {
  const {visible, title= '', children, closeModal, hasBorder} = props
  return (
      <Modal
        isVisible={visible}
        style={styles.container}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.body}>
          <View style={[styles.headerContainer, hasBorder && styles.border]}>
            <View style={styles.iconContainer}/>
            <AppText style={styles.title}>{title}</AppText>
            <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
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
    justifyContent: 'flex-end',
    margin: 0,
  },
  iconContainer: {
    width: '20%',
    alignItems: "flex-end"
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: color.palette.iron
  },
  title: {
    fontSize: '16@s',
    fontFamily: fontFamily.medium,
  },
  body: {
    backgroundColor: color.background,
    borderRadius: '8@s',
  },
  headerContainer: {
    padding: '12@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  contentContainer:{
    padding: '10@s',
    minHeight: '200@ms',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
   content: {
     textAlign: "center",
     fontSize: '18@ms',
     lineHeight: '22@s'
   }
});
