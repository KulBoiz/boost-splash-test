import React, { useCallback, useState } from "react"
import { TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../../components/app-text/AppText"
import { CancelSvg } from "../../../../assets/svgs"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import ParsedText from "react-native-parsed-text"
import { PAYMENT_GUIDE } from "../constants"
import { MARGIN_BOTTOM_24, ROW } from "../../../../styles/common-style"
import DashedLine from "react-native-dashed-line"


interface Props {
  visible: boolean,
  closeModal(): void
}

const PurchaseGuide = React.memo((props: Props) => {
  const { visible, closeModal } = props
  const [itemHeight, setItemHeight] = useState<number>(0)

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.body}>
        <View style={[styles.headerContainer, styles.border]}>
          <AppText style={styles.title} value={'Hướng dẫn thanh toán bằng QR Code'}/>
          <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
            <CancelSvg width={s(24)} height={s(24)} />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          {PAYMENT_GUIDE.map((e, index) => {
            const isLastItem = index === 2
            return (
              <View
                key={index} style={[ROW, MARGIN_BOTTOM_24]}
                onLayout={useCallback((event) => {
                  const { height } = event.nativeEvent.layout
                  setItemHeight(height)
                }, [])}
              >
                <View style={styles.circle}>
                  <AppText value={index + 1} fontFamily={fontFamily.bold} color={color.primary} />
                </View>
                <ParsedText
                  style={styles.text}
                  parse={
                    [
                      { pattern: /"Tải về"|(Mobile Banking)|QR đã tải về/, style: styles.bold },
                    ]
                  }
                  childrenProps={{ allowFontScaling: false }}
                >
                  {e}
                </ParsedText>
                {!isLastItem &&
                  <DashedLine
                    axis="vertical" dashLength={4} dashThickness={1}
                    dashGap={3} dashColor={color.palette.lighterGray}
                    style={[styles.dashLine, { height: itemHeight + s(10) }]} />
                }
              </View>
            )
          })}
        </View>
      </View>
    </Modal>
  )
})

export default PurchaseGuide

const styles = ScaledSheet.create({
  container: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dashLine: {
    top: '10@vs',
    left: '10@s',
    position: 'absolute',
    zIndex: -1
  },
  circle: {
    width: "20@s",
    height: "20@s",
    borderRadius: "10@s",
    marginRight: "12@s",
    backgroundColor: color.palette.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "90%",
  },
  bold: {
    fontFamily: fontFamily.bold,
  },
  iconContainer: {
    width: "17%",
    alignItems: "flex-end",

  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: color.palette.iron,
  },
  title: {
    fontSize: "16@s",
    fontFamily: fontFamily.bold,
  },
  body: {
    backgroundColor: color.background,
    borderRadius: "8@s",
  },
  headerContainer: {
    padding: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    padding: "16@s",
    minHeight: "200@ms",
    alignItems: "center",
    justifyContent: "flex-start",
  },
})
