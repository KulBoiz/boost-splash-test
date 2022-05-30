import React from "react"
import {
  DocumentSvg,
  ElementSvg,
  MedalSvg,
  ProfileSvg, SettingSvg,
  ShieldSecuritySvg,
  SimCardSvg,
  StarSettingSvg, TransactionSvg,
} from "../../assets/svgs"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

export const SETTING_LIST = [
  {
    icon: <ProfileSvg />,
    title: 'Thông tin cá nhân',
    onPress: () => {},
    active: false,
  },{
    icon: <MedalSvg />,
    title: 'Đăng ký làm cộng tác viên',
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
