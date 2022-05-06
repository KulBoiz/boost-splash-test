import React from 'react';
import { View } from "react-native"
import { AppHeaderProps } from "./app.header.props"
import { translate } from "../../i18n"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { color } from "../../theme"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from 'react-native-size-matters';
import { goBack } from "../../navigators"
import { fontFamily } from "../../constants/font-family"

const AppHeader = React.memo((props: AppHeaderProps) => {
  const {
    width,
    onLeftPress,
    onRightPress,
    renderRightIcon,
    renderLeftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    isBlue = false
  } = props

  const header = headerText || (headerTx && translate(headerTx)) || ""

  return (
    <View style={[styles.container, style, {backgroundColor: isBlue ? color.palette.blue : color.background}]}>
        {renderLeftIcon ?
            <Button preset="link" onPress={onLeftPress} style={width}>
              {renderLeftIcon}
            </Button>
     : (
            <Button preset="link" onPress={onLeftPress ?? goBack} style={[styles.defaultView, width]}>
              <FastImage source={images.arrowLeft} style={styles.backIcon} tintColor={isBlue ?  color.palette.white : ''}/>
            </Button>
            )}

        <View style={styles.titleView}>
          <Text style={[styles.title, titleStyle, {color: isBlue? color.text : color.palette.black}]} text={header} />
        </View>

        {renderRightIcon ?
          <Button preset="link" onPress={onRightPress} style={width}>
            {renderRightIcon}
          </Button>
          : (
              <View style={[styles.defaultView, width]} />
            )}
    </View>
  )
});


export default AppHeader;
AppHeader.displayName = 'AppHeader'

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.background,
      flexDirection: "row",
      height: '90@s',
      paddingLeft: '10@s',
      paddingRight: '16@s',
      alignItems: "flex-end",
      paddingBottom: '16@s',
      borderBottomWidth: 1,
      borderBottomColor: color.palette.line
    },
  titleView: {
      flex:1,
    marginBottom: '3@s',
    justifyContent: "flex-end"
  },
  title: {
    fontFamily: fontFamily.mulish.bold,
    color: color.palette.black,
    fontSize: '16@s',
    textAlign: "center",
    textTransform: 'capitalize',
    fontWeight: '700'
  },
  backIcon:{
      width: '24@s',
    height: '24@s'
  },
  defaultView: {
      width: '32@s'
  }
});
