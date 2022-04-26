import { Dimensions, TextStyle, ViewStyle } from "react-native"
import { color } from "../theme"

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

export const CONTAINER_PADDING = {
  paddingHorizontal: 20
}
export const HIT_SLOP = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
}

export const PARENT = {
  flex:1,
  backgroundColor: color.background
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

export const DEFAULT_FONT = {
  fontFamily: "exo"
}

export const FLEX_DIRECTION_ROW:ViewStyle = {
  flexDirection: "row"
}

export const HEADER_MAP = {
  position: 'absolute',
  top: 50,
  borderRadius: 50,
}

export const FONT_SIZE_15 = {
  fontFamily: "exo",
  fontSize: 15
}
export const M_B_5 = {
  marginBottom: 5
}
export const M_B_6 = {
  marginBottom: 6
}
export const M_B_8 = {
  marginBottom: 8
}
export const M_B_10 = {
  marginBottom: 10
}
export const M_B_20 = {
  marginBottom: 20
}
export const M_B_50 = {
  marginBottom: 50
}
export const M_B_100 = {
  marginBottom: 100
}
export const M_B_15 = {
  marginBottom: 15
}

export const M_R_10 = {
  marginRight: 10
}

export const M_R_20 = {
  marginRight: 20
}

export const M_T_20 = {
  marginTop: 20
}
export const M_T_10 = {
  marginTop: 10
}
export const M_T_5 = {
  marginTop: 5
}
export const M_T_3 = {
  marginTop: 3
}
export const M_T_2 = {
  marginTop: 2
}
export const M_L_8 = {
  marginLeft: 8
}
