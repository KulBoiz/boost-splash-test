import React from "react"
import {
  DocumentSvg,
  ElementSvg,
  MedalSvg,
  ProfileSvg,
  SettingSvg,
  ShieldSecuritySvg,
  SimCardSvg,
  StarSettingSvg,
  TransactionSvg,
} from "../../assets/svgs"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { ROLE } from "../../models/auth-store"
import { get } from "lodash"

export const SETTING_LIST = [
  {
    icon: <ProfileSvg />,
    title: 'Thông tin cá nhân',
    onPress: () => navigate(ScreenNames.USER_PROFILE),
    active: true,
  },{
    icon: <MedalSvg />,
    title: 'Đăng ký làm cộng tác viên',
    // onPress: () => navigate(ScreenNames.AGENT, {screen : authStoreModel?.role === ROLE.CTV  ? ScreenNames.VIEW_CONTRACT : ScreenNames.BECOME_SCREEN}),
    onPress: () => navigate(ScreenNames.AGENT),
    active: true,
  },{
    icon: <ShieldSecuritySvg />,
    title: 'Quản lí mật khẩu & mã PIN',
    onPress: () => {},
    active: false,
  },{
    icon: <DocumentSvg />,
    title: 'Tài liệu của tôi',
    onPress: () => {},
    active: false,
  },{
    icon: <SimCardSvg />,
    title: 'Thông tin nâng cao',
    onPress: () => {},
    active: false,
  },{
    icon: <ElementSvg />,
    title: 'Cơ cấu tổ chức',
    onPress: () => {},
    active: false,
  },{
    icon: <StarSettingSvg />,
    title: 'Đánh giá',
    onPress: () => {},
    active: false,
  },{
    icon: <TransactionSvg />,
    title: 'Giao dịch',
    onPress: () => {},
    active: false,
  },{
    icon: <SettingSvg />,
    title: 'Cài đặt',
    onPress: () => {},
    active: false,
  },
]

export const userInfo = (user) => {
  return {
    fullName: user.fullName,
    idNumber: +user.idNumber,
    gender: user.gender,
    tel: user.tel,
    email: user.email,
    birthday: user?.birthday,
    identification: {
      issuedOn: user.issuedOn,
      placeOfIssue: user.placeOfIssue,
    }
  }
}

export const userAuth = (user) => {
  const email = get(user, 'emails[0].email', '')
  const tel = get(user, 'tels[0].tel', '')
  return {
    fullName: user.fullName,
    idNumber: +user.idNumber,
    gender: user.gender,
    tel: tel,
    email: email,
    birthday: user?.birthday,
    identification: {
      issuedOn: user?.identification?.issuedOn,
      placeOfIssue: user?.identification?.placeOfIssue,
    }
  }
}

