import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { color } from "../theme"
import {ms, s} from 'react-native-size-matters'
import { fontFamily } from "../constants/font-family"

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export const FULL_SCREEN_STYLE :ViewStyle= {
  width: screenWidth,
  height: screenHeight,
  position: 'relative'
}

export const ROW :ViewStyle = {
  flexDirection: 'row'
}

export const CONTAINER_PADDING: ViewStyle = {
  paddingHorizontal: ms(16)
}
export const PADDING_BOTTOM_24: ViewStyle = {
  paddingBottom: ms(16)
}
export const HIT_SLOP = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}

export const PARENT : ViewStyle = {
  flex:1,
  backgroundColor: color.background
}
export const MARGIN_BOTTOM_8 : ViewStyle = {
  marginBottom: s(8)
}
export const MARGIN_BOTTOM_16 : ViewStyle = {
  marginBottom: s(16)
}
export const MARGIN_BOTTOM_24 : ViewStyle = {
  marginBottom: s(24)
}

export const FULL_PARRENT = {
  flexGrow: 1,
  justifyContent: "center",
}

export const TEXT_CENTER : TextStyle = {
  textAlign: "center",
  justifyContent: "center",
}

export const CENTER_ELEMENTS : ViewStyle = {
  alignItems: "center",
  justifyContent: 'center',
}

export const SPACE_BETWEEN : ViewStyle = {
  alignItems: "center",
  justifyContent: 'space-between',
}

export const FONT_MEDIUM_12: TextStyle = {
  fontFamily: fontFamily.medium,
  fontSize: ms(12)
}
export const FONT_MEDIUM_14: TextStyle = {
  fontFamily: fontFamily.medium,
  lineHeight: s(17),
  fontSize: ms(14)
}
export const FONT_REGULAR_12: TextStyle = {
  fontFamily: fontFamily.regular,
  fontSize: ms(12)
}
export const FONT_REGULAR_14: TextStyle = {
  fontFamily: fontFamily.regular,
  lineHeight: s(17),
  fontSize: ms(14)
}
export const FONT_SEMI_BOLD_12: TextStyle = {
  fontFamily: fontFamily.semiBold,
  fontSize: ms(12)
}
export const FONT_SEMI_BOLD_14: TextStyle = {
  fontFamily: fontFamily.semiBold,
  lineHeight: s(17),
  fontSize: ms(14)
}
export const FONT_BOLD_12: TextStyle = {
  fontFamily: fontFamily.bold,
  fontSize: ms(12)
}
export const FONT_BOLD_14: TextStyle = {
  fontFamily: fontFamily.bold,
  lineHeight: s(17),
  fontSize: ms(14)
}
export const FONT_BOLD_24: TextStyle = {
  fontFamily: fontFamily.bold,
  fontSize: ms(24)
}

