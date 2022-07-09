import React from "react"
import { StatusBar, View } from "react-native"
import { AppHeaderProps } from "./app.header.props"
import { translate } from "../../i18n"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { color } from "../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { goBack } from "../../navigators"
import { fontFamily } from "../../constants/font-family"
import { isIphoneX } from "react-native-iphone-x-helper"
import { HIT_SLOP } from "../../styles/common-style"

const AppHeader = React.memo((props: AppHeaderProps) => {
  const {
    hideBack = false,
    width,
    onLeftPress,
    onRightPress,
    renderRightIcon,
    renderLeftIcon,
    headerText,
    headerTx,
    renderTitle,
    style,
    titleStyle,
    isBlue = false,
  } = props

  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isBlue ? color.palette.blue : color.background },
        style,
      ]}
    >
      <StatusBar
        backgroundColor={isBlue ? color.palette.blue : color.background}
        barStyle={isBlue ? "light-content" : "dark-content"}
      />
      {
        hideBack ?
          <View style={[styles.defaultView, width]} />
          :
          <>
            {renderLeftIcon ? (
              <Button preset="link" onPress={onLeftPress} style={width} hitSlop={HIT_SLOP}>
                {renderLeftIcon}
              </Button>
            ) : (
              <Button preset="link" onPress={onLeftPress ?? goBack} style={[styles.defaultView, width]} hitSlop={HIT_SLOP}>
                <FastImage
                  source={images.arrowLeft}
                  style={styles.backIcon}
                  tintColor={isBlue ? color.palette.white : ""}
                />
              </Button>
            )}
          </>
      }


      {renderTitle || (
        <View style={styles.titleView}>
          <Text
            style={[styles.title, titleStyle, { color: isBlue ? color.text : color.palette.black }]}
            text={header}
          />
        </View>
      )}

      {renderRightIcon ? (
        <Button preset="link" onPress={onRightPress} style={width} hitSlop={HIT_SLOP}>
          {renderRightIcon}
        </Button>
      ) : (
        <View style={[styles.defaultView, width]} />
      )}
    </View>
  )
})

export default AppHeader
AppHeader.displayName = "AppHeader"

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    flexDirection: "row",
    height: isIphoneX() ? "80@vs" : "70@vs",
    paddingLeft: "10@s",
    paddingRight: "16@s",
    alignItems: "flex-end",
    paddingBottom: "16@s",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.line,
  },
  titleView: {
    flex: 1,
    marginBottom: "3@s",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: fontFamily.mulish.bold,
    color: color.palette.black,
    fontSize: "16@ms",
    textAlign: "center",
    fontWeight: "700",
  },
  backIcon: {
    width: "24@s",
    height: "24@s",
  },
  defaultView: {
    width: "24@s",
  },
})
