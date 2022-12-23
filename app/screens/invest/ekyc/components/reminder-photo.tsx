import React from "react"
import { View, StyleSheet } from "react-native"
import Modal from "react-native-modal"
import FastImage from "react-native-fast-image"
import {
  FONT_BOLD_14,
  FONT_REGULAR_12,
  MARGIN_BOTTOM_16,
  MARGIN_BOTTOM_8,
  ROW,
  SPACE_BETWEEN,
} from "../../../../styles/common-style"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../../components/app-text/AppText"
import { presets } from "../../../../constants/presets"
import { color } from "../../../../theme"
import { hexToRgbA } from "../../../../constants/variable"

interface Props {
  img1: number
  img2: number
  visible: boolean,
  title?: string,
  content?: string,

  closeModal(): void
}

const ReminderPhoto = React.memo((props: Props) => {
  const { visible, title = "", content = "", closeModal, img1, img2 } = props

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.body}>
        <View style={[ROW, SPACE_BETWEEN, MARGIN_BOTTOM_16]}>
          <FastImage source={img1} style={styles.image} />
          <FastImage source={img2} style={styles.image} />
        </View>
        <AppText style={[presets.label_16, MARGIN_BOTTOM_8]} value={title} textAlign={"center"}/>
        <AppText style={FONT_REGULAR_12} value={content} textAlign={'center'}/>
      </View>
      <View style={styles.wrapBtn}>
        <AppText style={FONT_BOLD_14} value={'Đã hiểu'} color={color.primary} onPress={closeModal}/>
      </View>
    </Modal>
  )
})

export default ReminderPhoto

const styles = ScaledSheet.create({
  container: {},
  body: {
    backgroundColor:color.background,
    paddingTop: '12@s',
    paddingHorizontal: '20@s',
    borderTopRightRadius: '16@s',
    borderTopLeftRadius: '16@s',
    paddingBottom: '20@s'
  },
  image: {
    width: '47%',
    height: '80@ms'
  },
   wrapBtn: {
    borderTopWidth: 1,
     borderTopColor: hexToRgbA(color.palette.black, 0.05),
     backgroundColor:color.background,
     borderBottomRightRadius: '16@s',
     borderBottomLeftRadius: '16@s',
     paddingVertical: '12@s',
     alignItems: "center"
   }
})
