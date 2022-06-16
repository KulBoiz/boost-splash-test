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
