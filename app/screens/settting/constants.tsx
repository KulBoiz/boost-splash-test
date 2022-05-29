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
  },{
    icon: <MedalSvg />,
    title: 'Đăng ký làm cộng tác viên',
    onPress: () => navigate(ScreenNames.AGENT),
  },{
    icon: <ShieldSecuritySvg />,
    title: 'Quản lí mật khẩu & mã PIN',
    onPress: () => {},
  },{
    icon: <DocumentSvg />,
    title: 'Tài liệu của tôi',
    onPress: () => {},
  },{
    icon: <SimCardSvg />,
    title: 'Thông tin nâng cao',
    onPress: () => {},
  },{
    icon: <ElementSvg />,
    title: 'Cơ cấu tổ chức',
    onPress: () => {},
  },{
    icon: <StarSettingSvg />,
    title: 'Đánh giá',
    onPress: () => {},
  },{
    icon: <TransactionSvg />,
    title: 'Giao dịch',
    onPress: () => {},
  },{
    icon: <SettingSvg />,
    title: 'Cài đặt',
    onPress: () => {},
  },
]
