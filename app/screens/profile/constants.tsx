import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { get } from "lodash"
import { images } from "../../assets/images"

export const INDIVIDUAL = [
  {
    icon: images.app_profile,
    title: 'Thông tin cá nhân',
    onPress: () => navigate(ScreenNames.USER_PROFILE),
    active: true,
  },
  // {
  //   icon: images.profile_social,
  //   title: 'Mạng xã hội',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
  // {
  //   icon: images.profile_password,
  //   title: 'Mật khẩu',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
  // {
  //   icon: images.profile_pin,
  //   title: 'Mã PIN',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
  // {
  //   icon: images.profile_bank,
  //   title: 'Ngân hàng liên kết',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
  // {
  //   icon: images.profile_commission,
  //   title: 'Hoa hồng',
  //   onPress: () => {
  //     navigate(ScreenNames.COMMISSION)
  //   },
  //   active: true,
  // },
  // {
  //   icon: images.profile_file,
  //   title: 'Tài liệu',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // }, {
  //   icon: images.profile_community,
  //   title: 'Cộng đồng FINA',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
]

export const AGENT = [
  {
    icon: images.profile_agent,
    title: 'Đăng ký CTV (Hợp đồng)',
    onPress: () => {
        navigate(ScreenNames.AGENT)
    },
    active: true,
  },
  // {
  //   icon: images.profile_update_referral,
  //   title: 'Cập nhật người giới thiệu',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },  {
  //   icon: images.profile_my_agent,
  //   title: 'Cộng tác viên của tôi',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },  {
  //   icon: images.profile_guide,
  //   title: 'Hướng dẫn',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },  {
  //   icon: images.profile_policy,
  //   title: 'Chính sách',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
]

export const SETTING = [
  // {
  //   icon: images.profile_org,
  //   title: 'Cơ cấu tổ chức',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },{
  //   icon: images.profile_commission,
  //   title: 'Đánh giá',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },{
  //   icon: images.profile_question,
  //   title: 'Câu hỏi thường gặp',
  //   onPress: () => {
  //     //
  //   },
  //   active: false,
  // },
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

