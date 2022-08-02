import { images } from "../../assets/images"

export const TYPE = {
	staff: 'staff',
	relative: 'relative',
};

export const HAVE_INSURANCE = [
  {
    icon: images.ribbon,
    title: "Giấy chứng nhận",
  },
  {
    icon: images.caution,
    title: "An toàn khi xảy ra sự cố",
  },
  {
    icon: images.first_aid,
    title: "Được chăm sóc hoàn thảo",
  },
]
export const NOT_HAVE_INSURANCE = [
  {
    icon: images.shield_star,
    title: "Không được bảo vệ",
  },
  {
    icon: images.dollar_coin,
    title: "Chi phí cao",
  },
  {
    icon: images.first_aid,
    title: "Chăm sóc kém",
  },
]

export const INSURANCE_CATEGORIES = [
  { value: "11", title: "Sức khỏe" },
  { value: "21", title: "Tai nạn" },
  { value: "31", title: "Du lịch" },
  { value: "41", title: "Sửa chữa" },
  { value: "51", title: "Tất cả" },
]
export const INSURANCE_STATUS = [
  { value: "_1", title: "Có hiệu lực" },
  { value: "2_", title: "Hết hiệu lực" },
  { value: "3_", title: "Đã hủy" },
]
export const INDEMNIFY_STATUS = [
  { value: "_1", title: "Hoàn thành" },
  { value: "2_", title: "Thất bại" },
  { value: "3_", title: "Đang xử lý" },
]
export const INSURANCE_TABS = [
  { key: "1", text: "Hồ sơ bảo hiểm" },
  { key: "2", text: "Yêu cầu bồi thường" },
]

export const USER_RELATIONSHIP = {
  FATHER: "father",
  MOTHER: "mother",
  CHILD: "child",
  WIFE: "wife",
  HUSBAND: "husband",
}
export const RELATIONSHIP_INSURANCE = [
  { label: "Bố", value: USER_RELATIONSHIP.FATHER },
  { label: "Mẹ", value: USER_RELATIONSHIP.MOTHER },
  { label: "Vợ", value: USER_RELATIONSHIP.WIFE },
  { label: "Chồng", value: USER_RELATIONSHIP.HUSBAND },
  { label: "Con", value: USER_RELATIONSHIP.CHILD },
]
export const EMPLOYEE_INSURANCE = [
  { label: "Nhân viên", value: "staff" },
  { label: "Người thân", value: "relative" },
]
export const PACKAGES_INSURANCE_STAFF = [
  { label: "Gói vàng - 20,000,000 VNĐ", value: "1" },
  { label: "Gói bạc - 15,000,000 VNĐ", value: "2" },
]
export const PACKAGES_INSURANCE_RELATIVE = [{ label: "Gói kim cương - 50,000,000 VNĐ", value: "3" }]

export const IS_INSURANCE_CARD = [
  { label: "Có", value: "yes" },
  { label: "Không", value: "no" },
]

export const checkAge = (user) => {
  const birthday = new Date(user?.dateOfBirth);
  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const CLAIM_INSURANCE_STATUS = {
  CREATED: 'created', // ghi nhận
  ASSIGNED: 'assigned', // thu thập thông tin
  DONE: 'done', // xác nhận tạo hồ sơ claim
  CANCEL: 'cancel', // Không đủ điều kiện
  CONSULTED: 'consulted', // tạo hồ sơ
}

export const getClaimStatus = (status) => {
  switch (status){
    case CLAIM_INSURANCE_STATUS.CREATED:
      return {label: 'Ghi nhận', color: 'green' }
    case CLAIM_INSURANCE_STATUS.ASSIGNED:
      return { label: "Thu thập thông tin", color: 'blue' }
    case CLAIM_INSURANCE_STATUS.CONSULTED:
      return { label: "Tạo hồ sơ", color: 'slateblue' }
    case CLAIM_INSURANCE_STATUS.DONE:
      return {label: "Hoàn thành", color: 'coral' }
    case CLAIM_INSURANCE_STATUS.CANCEL:
      return {label: "Không đủ điều kiện", color: 'red' }
    default: return {label: 'Ghi nhận', color: 'green' }
  }
}

export const getTimeLeft = (countdown, countdownType) => {
  if (countdownType === 'month'){
    return 60 * 60 * 24 * 30 * +countdown * 1000
  } if (countdownType === 'day'){
    return 60 * 60 * 24 * +countdown * 1000
  } if (countdownType === 'minute'){
    return 60 * 60 * +countdown * 1000
  }
  return 0
}
