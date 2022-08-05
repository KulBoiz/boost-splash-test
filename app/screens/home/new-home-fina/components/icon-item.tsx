import React from "react"
import { Pressable, View } from "react-native"
import i18n, { translate } from "i18n-js"
import FastImage from "react-native-fast-image"
import { ms, ScaledSheet } from "react-native-size-matters"
import { TxKeyPath } from "../../../../i18n"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../../../styles/common-style"
import { DiscountSvg } from "../../../../assets/svgs"
import { color } from "../../../../theme"


interface Props{
  icon:  number | React.ReactNode | string
  title: string | TxKeyPath
  onPress(): void
  percent?: number
  iconShape?: 'circle' | 'custom'
  middleText?: string | number
}

const IconItem = React.memo((props: Props) => {
  const {icon, title, onPress, iconShape = 'custom', middleText, percent} = props
  const realTitle = i18n.t(title).includes('missing') ? title : translate(title)
  const iconType = typeof icon === 'number' || typeof icon === "string"
  const isStringIcon = typeof icon === "string"
  const isStringMiddleText = typeof middleText === "string"

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {iconShape === 'custom' ?
      <>
        {
          iconType ?
            <FastImage source={isStringIcon ? {uri: icon} : icon} style={styles.icon}/>
            :
            {icon}
        }
      <AppText value={realTitle} style={styles.text} />
      </>
        :
          <View style={ALIGN_CENTER}>
            <>
              {percent && <View style={[ROW, ALIGN_CENTER, MARGIN_BOTTOM_8]}>
                <DiscountSvg style={styles.discount} />
                <AppText value={`${percent}%`} fontSize={ms(11)} color={color.palette.orange} />
              </View>}
              <View style={styles.wrapIcon}>
                {
                  iconType ?
                    <FastImage source={isStringIcon ? {uri: icon} : icon} style={styles.circleIcon}/>
                    :
                    {icon}
                }
                {middleText &&
                  <View style={styles.wrapMiddleText}>
                    <AppText
                      value={middleText}
                      fontSize={isStringMiddleText ? ms(9) : ms(16)}
                      color={color.text}
                      fontFamily={isStringMiddleText ? fontFamily.medium : fontFamily.bold}
                      center
                    />
                    {!isStringMiddleText &&
                      <AppText
                        value={'tháng'}
                        color={color.text}
                        fontSize={ms(9)}
                    /> }
                  </View>

                }

              </View>

              <AppText value={title} style={styles.textCircle} />
            </>
          </View>
      }
    </Pressable>
  )
});

export default IconItem;

const styles = ScaledSheet.create({
  container: {
    width: '20%',
    alignItems: "center",
    marginVertical: '12@s'
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
    borderRadius: '18@s'
  },
  icon :{
    width: '35@s',
    height: '35@s'
  },
  textCircle: {
    marginTop: '8@s',
    width: '90%',
    fontSize: '9@ms',
    lineHeight: '11@ms',
    fontFamily: fontFamily.medium,
    textAlign: "center",
    color: '#788198'
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
  }
});
