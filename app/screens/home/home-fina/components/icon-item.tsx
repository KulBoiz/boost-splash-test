import React from "react"
import { Pressable, View } from "react-native"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ms, ScaledSheet } from "react-native-size-matters"
import { TxKeyPath } from "../../../../i18n"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../../../styles/common-style"
import { color } from "../../../../theme"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { isAndroid } from "../../../../constants/variable"

interface Props {
  icon: number | string
  title: string | TxKeyPath
  onPress(): void
  percent?: number
  showPercent?: boolean
  iconShape?: 'circle' | 'custom'
  middleText?: string | number
  header?: string
  type?: any
  showPercentCustom?: boolean
  showPackage?: boolean
}

const IconItem = React.memo((props: Props) => {
  const { icon, title, onPress, iconShape = 'custom', middleText, percent, header, type = 'vehicle', showPercent = true, showPercentCustom = false, showPackage = false } = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  const isStringIcon = typeof icon === "string"
  const isStringMiddleText = typeof middleText === "string"

  const handlePress = () => {
    if (iconShape !== 'custom' && type !== 'project_house') {
      navigate(ScreenNames.LOAN_PRODUCT, { header, key: middleText, type })
    } else {
      onPress()
    }
  }
  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {iconShape === 'custom' ?
        <>
          {showPercentCustom && <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_8]}>
            <AppText value={`${percent ?? '0'}%`} fontSize={ms(11)} color={color.palette.orange} />
          </View>}
          <FastImage source={isStringIcon ? { uri: icon } : icon} style={styles.icon} />
          <AppText value={realTitle} style={styles.text} numberOfLines={2}/>
        </>
        :
        <View style={ALIGN_CENTER}>
          <>
            {showPercent && <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_8]}>
              <AppText value={`${percent ?? '0'}%`} fontSize={ms(11)} color={color.palette.orange} />
            </View>}
            <View style={[styles.wrapIcon, styles.month]}>
              <FastImage source={isStringIcon ? { uri: icon } : icon} style={styles.circleIcon} />
              {(!!middleText || middleText?.toString() === '0') &&
                <View style={styles.wrapMiddleText}>
                  <AppText
                    value={middleText}
                    fontSize={isStringMiddleText ? ms(9) : ms(16)}
                    color={color.text}
                    fontFamily={isStringMiddleText ? fontFamily.medium : fontFamily.bold}
                    center
                  />
                  {!isStringMiddleText && middleText !== '0' &&
                    <AppText
                      value={'tháng'}
                      color={color.text}
                      fontSize={ms(9)}
                      style={styles.month}
                    />}
                </View>
              }
            </View>
            {!!title && <AppText value={`${title}${showPackage ? ' gói' : ''}`} style={styles.textCircle} numberOfLines={2}/>}

          </>
        </View>
      }
    </Pressable>
  )
});

export default IconItem;

const styles = ScaledSheet.create({
  container: {
    width: '25%',
    alignItems: "center",
    marginVertical: '8@s'
  },
  wrapIcon: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: color.palette.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,

    elevation: 5,
  },
  circleIcon: {
    width: '36@s',
    height: '36@s',
    borderRadius: '18@s',
    backgroundColor: color.palette.lightBlack
  },
  icon: {
    width: '28@s',
    height: '28@s',
  },
  textCircle: {
    marginTop: '8@s',
    width: '60@s',
    fontSize: '9@ms',
    lineHeight: '11@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
    color: '#788198',
    flexWrap: 'wrap'
  },
  text: {
    marginTop: '11@s',
    width: '90%',
    fontSize: '11@ms',
    lineHeight: '13@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
    color: 'rgba(0, 0, 0, 0.75)'
  },
  wrapMiddleText: {
    position: "absolute",
  },
  discount: {
    marginRight: '2@s'
  },
  month: {
    marginTop: isAndroid ? '-10@s' : 0,
    textAlign: "center"
  }
});
