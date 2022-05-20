import React from 'react';
import { TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { CancelSvg } from "../../assets/svgs"

interface Props{
  visible: boolean,
  children : JSX.Element | React.ReactNode
  closeModal(): void
  animationType: 'fade' | 'slideVertical' | 'slideHorizontal'
}

const FullScreenModal = React.memo((props: Props) => {
  const {visible, closeModal, children, animationType } = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn={animationType === 'fade' ? "fadeIn" : animationType === 'slideVertical' ? 'slideInUp' : 'slideInLeft'}
      animationOut={animationType === 'fade' ? "fadeOut" : animationType === 'slideVertical' ? 'slideOutDown' : 'slideOutRight'}
    >
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={closeModal}>
            <CancelSvg />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  )
});

export default FullScreenModal;

const styles = ScaledSheet.create({
  container: {
    position: 'relative', margin: 0
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  },
  body: {
    flex:1,
    backgroundColor:color.background,
    borderRadius: '8@s',
    padding: '24@ms',
  },
});
