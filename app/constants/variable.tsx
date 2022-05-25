import { Dimensions, Platform } from "react-native"
import { TxKeyPath } from "../i18n"

export const isIos = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"

export const { width, height } = Dimensions.get("window")

export const isHTML = RegExp.prototype.test.bind(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/)
export const isColor = RegExp.prototype.test.bind(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)

export const truncateString = (str: string, length: number, lastText?: string) => {
  return str && str?.length > length ? str.substring(0, length) + (lastText || "...") : str
}

export const hidePhoneNumber = (phone: string) => {
  return `****${phone.slice(-3)}` ?? ''
}

export const capitalizeFirstString = (str: string | TxKeyPath | undefined) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ') : '';
};

export function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}

export function numberWithCommas(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") ?? '';
}
