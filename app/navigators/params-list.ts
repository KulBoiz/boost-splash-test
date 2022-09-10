import { ScreenNames } from "./screen-names"

export type NavigatorParamList = {
  [ScreenNames.SPLASH]: undefined
  [ScreenNames.WELCOME]: undefined
  [ScreenNames.AGENT]: undefined
  [ScreenNames.AUTH]: undefined
  [ScreenNames.APP]: undefined
  [ScreenNames.ADVANCE_INFORMATION]: undefined
  [ScreenNames.COMMISSION]: undefined
  [ScreenNames.SUCCESS_SCREEN]: undefined
  [ScreenNames.REQUEST_COUNSELLING]: undefined
  [ScreenNames.NOTICE]: undefined
  [ScreenNames.USER_PROFILE]: undefined
  [ScreenNames.LOAN_PRODUCT]: {header?: string, key?: string}
  [ScreenNames.LOAN_DETAIL]: undefined
  [ScreenNames.REGISTER_LOAN]: undefined
  [ScreenNames.PROFILE_DETAIL]: undefined
  [ScreenNames.FINANCE]: { index: number }
  [ScreenNames.TERM_AND_POLICY]: { id: number }
  [ScreenNames.INSURANCE_SCREEN]: { id?: number }
  [ScreenNames.INSURANCE_PACKAGE]: undefined
  [ScreenNames.PROJECT_TAB]: { header?: string, key?: any, id: number }
  [ScreenNames.INSURANCE_CLAIM_DETAIL]: { index: number }
  [ScreenNames.INTRODUCE_SCREEN]: undefined
  [ScreenNames.BANNER_DETAIL]: { url: string }
  [ScreenNames.BANNER_DETAIL]: { url: string }
  [ScreenNames.PHOTO_PICKER]: {
    onConfirm?: (photo) => void
  }
  [ScreenNames.BANKER_LIST_REQUEST_SCREEN]: undefined
  [ScreenNames.BANKER_REQUEST_DETAIL_SCREEN]: { data: any }
  [ScreenNames.BANKER_LIST_LOAN_SCREEN]: undefined
  [ScreenNames.BANKER_LOAN_DETAIL_SCREEN]: { tab: any, index: number }
  [ScreenNames.IN_DEVELOPING]: undefined
  [ScreenNames.MANAGE_INSURANCE_LIST]: { key?: string }
  [ScreenNames.MANAGE_INSURANCE_FILTER]: undefined
  [ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN]: undefined
  [ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN]: { index: number, isListBuy: any }
  [ScreenNames.CLAIM_INSURANCE]: { productId: string, index: string }
  [ScreenNames.INSURANCE_LIST_SCREEN]: { key: string, name: string}
}
