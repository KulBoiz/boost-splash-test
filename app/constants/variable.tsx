import moment, { Moment } from "moment"
import { Dimensions, Platform } from "react-native"
import { TxKeyPath } from "../i18n"

const gender = {
  female : 'female',
  male: 'male',
  other: "other"
}
export const OTP_TIME = {
  SIGN_CONTRACT : 5 * 60 * 1000 ,
  SYNC_ACCOUNT : 60 * 1000 + 30 * 1000,
  SALE : 5 * 60 * 1000,
  BUY_FUND : 5 * 60 * 1000,
}

export const isIos = Platform.OS === "ios"
export const isAndroid = Platform.OS === "android"

export const { width, height } = Dimensions.get("window")

export const isHTML = RegExp.prototype.test.bind(/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/)
export const isColor = RegExp.prototype.test.bind(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)

export const truncateString = (str: string, length: number, lastText?: string) => {
  return str && str?.length > length ? str.substring(0, length) + (lastText || "...") : str
}
export function hexToRgbA(hex, opacity = 1){
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length === 3){
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex');
}

export const hidePhoneNumber = (phone: string) => {
  return `${phone.slice(0,3)}****${phone.slice(-3)}` ?? ''
}

export const filterByValue = (arr, str: string, prop: string) => {
  return arr.filter((o) =>
    Object.keys(o).some((k) => {
      if (k === prop) {
        return o[k].toLowerCase().includes(str.toLowerCase());
      } else {
        return false;
      }
    }),
  );
};

export const capitalizeFirstString = (str: string | TxKeyPath | undefined) => {
  return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(/_/g, ' ') : '';
};

export function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}

export function numberWithCommas(x: number | string | undefined) {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
}

export function getLastWord(words: string) {
  const n = words.split(" ");
  return n[n.length - 1];

}

export function formatDate(date: Moment | Date | undefined) {
  if  (!date) return '_'
  return moment(date).format('DD/MM/YYYY');
}

export function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'short' });
}
export function formatDateTime(date: string | Date) {
  if  (!date) return '_'
  return moment(date).format('DD/MM/YYYY, HH:mm');
}

export function formatTimeDate(date: string | Date) {
  if  (!date) return '_'
  return moment(date).format('HH:mm DD/MM/YYYY [(Giờ VN)]');
}

export function getFullName(user: any) {
  if  (!user) return '_'
  return user?.fullName ?? (user?.firstName ?? '') + ' ' + (user?.lastName ?? '')
}

export function getPhone(user: any) {
  if  (!user?.tels[0]) return '_'
  return user?.tels[0]?.tel ?? '_'
}

export function getEmail(user: any) {
  if  (!user?.emails[0]) return '_'
  return user?.emails[0]?.email ?? '_'
}

export const getGender = (sex) => {
  if (sex === gender.male) {
    return 'Nam'
  }
  if (sex === gender.female) {
    return 'Nữ'
  }
  return 'Khác'
}

export function verticalScale(num: number){
  return height * num
}


export function getMoneyLabel(money){
  const oneMillion = 1000 * 1000;
  const oneBillion = 1000 * 1000 * 1000;
  const numberLength = money.toString().length;
  const billionText = 'tỷ';
  const millionText = 'triệu';
  if (numberLength >= 10) {
    return `${numberWithCommas(money / oneBillion)} ${billionText}`;
  }
  if (numberLength < 10 && numberLength >= 7) {
    return `${numberWithCommas(money / oneMillion)} ${millionText}`;
  }
  return '';
}

export const formatData = (array) => {
  return array?.map((val) => ({
    value: val?.id ?? "",
    label: val?.name?.replace(/\t/g, "") ?? "",
  }))
}

export function convertViToEn(str) {
  if (!str) return ''
  str.normalize("NFD")
     .replace(/[\u0300-\u036f]/g, "")
     .replace(/đ/g, "d")
     .replace(/Đ/g, "D");
  return str;
}

export const checkVolatility = (value: number | string | undefined) => {
  return value ? value.toString().includes('-') : false
}

export const convertToInt = (value: number | string) => {
  return value ? Math.floor(+value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
}

export const COMMON_ERROR = 'Có lỗi xảy ra, vui lòng thử lại sau'
