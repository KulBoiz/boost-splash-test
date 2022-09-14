import React from "react"
import { MedalSvg, ProfileSvg, SimCardSvg } from "../../assets/svgs"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { get } from "lodash"
import { images } from "../../assets/images"

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
  },
  {
    icon: <SimCardSvg />,
    title: 'Thông tin nâng cao',
    onPress: () => navigate(ScreenNames.ADVANCE_INFORMATION),
    active: true,
  },
  // {
  //   icon: <TransactionSvg />,
  //   title: 'Hoa hồng của tôi',
  //   onPress: () => navigate(ScreenNames.COMMISSION),
  //   active: true,
  // },
]

export const INDIVIDUAL = [
  {
    icon: images.app_profile,
    title: 'Thông tin cá nhân',
    onPress: () => navigate(ScreenNames.USER_PROFILE),
    active: true,
  },
  {
    icon: images.profile_social,
    title: 'Mạng xã hội',
    onPress: () => {
      //
    },
    active: true,
  },
  {
    icon: images.profile_password,
    title: 'Mật khẩu',
    onPress: () => {
      //
    },
    active: true,
  },
  {
    icon: images.profile_pin,
    title: 'Mã PIN',
    onPress: () => {
      //
    },
    active: true,
  },
  {
    icon: images.profile_bank,
    title: 'Ngân hàng liên kết',
    onPress: () => {
      //
    },
    active: true,
  },
  {
    icon: images.profile_commission,
    title: 'Hoa hồng',
    onPress: () => {
      //
    },
    active: true,
  },
  {
    icon: images.profile_file,
    title: 'Tài liệu',
    onPress: () => {
      //
    },
    active: true,
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

