import { Dimensions, Platform } from "react-native"

export const isIos = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"

export const { width, height } = Dimensions.get("window")

export const isHTML = RegExp.prototype.test.bind(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/)
export const isColor = RegExp.prototype.test.bind(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)

export const truncateString = (str: string, length: number, lastText?: string) => {
  return str && str?.length > length ? str.substring(0, length) + (lastText || "...") : str
}
