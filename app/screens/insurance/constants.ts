import { images } from "../../assets/images"

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
  { key: "1", text: "Danh sách bảo hiểm" },
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
