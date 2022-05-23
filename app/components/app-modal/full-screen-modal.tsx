import React from 'react';
import { TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { CancelSvg } from "../../assets/svgs"
import WebView from 'react-native-webview';
import { HIT_SLOP } from '../../styles/common-style';
import { isIphoneX } from 'react-native-iphone-x-helper';

interface Props{
  visible: boolean
  children?: JSX.Element | React.ReactNode | any
  closeModal(): void
  animationType: 'fade' | 'slideVertical' | 'slideHorizontal'
  url?: string
}

const FullScreenModal = React.memo((props: Props) => {
  const {visible, closeModal, children, animationType, url } = props
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn={animationType === 'fade' ? "fadeIn" : animationType === 'slideVertical' ? 'slideInUp' : 'slideInLeft'}
      animationOut={animationType === 'fade' ? "fadeOut" : animationType === 'slideVertical' ? 'slideOutDown' : 'slideOutRight'}
    >
      <View style={styles.body}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={closeModal} hitSlop={HIT_SLOP}>
            <CancelSvg />
          </TouchableOpacity>
        </View>
        {children}
        {url && <WebView
            source={{uri: url}}
          />}
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
    alignItems: "center",
    marginBottom: '16@s',
    marginTop: isIphoneX() ? '24@s': '16@s',
    padding: '16@s',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.BABABA,
  },
  body: {
    flex:1,
    backgroundColor:color.background,
    // borderRadius: '8@s',
    // padding: '24@ms',
  },
});
