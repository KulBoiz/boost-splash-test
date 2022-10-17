export const PAYMENT_GUIDE = [
  'Nhấn vào "Tải về" để tải hình QR và lưu trên điện thoại của bạn',
  'Mở ứng dụng ngân hàng (Mobile Banking) của bạn và chọn chức năng QR Code',
  'Chọn hình QR đã tải về, đối chiếu thông tin và thực hiện chuyển khoản',
]

export const TYPE_OF_FUND = {
  STOCK: 'stock',
  BOND: 'bond',
  BALANCED: 'balanced',
  IPO: 'ipo',
};

export const mappingLabelTypeOfFund = (status) => {
  switch (status) {
    case TYPE_OF_FUND.STOCK:
      return 'Qũy cổ phiếu';
    case TYPE_OF_FUND.BOND:
      return 'Quỹ trái phiếu';
    case TYPE_OF_FUND.BALANCED:
      return 'Quỹ cân bằng';
    case TYPE_OF_FUND.IPO:
      return 'Quỹ tiền tệ';
    default:
      return '';
  }
};

export enum ORDER_MATCHING_DAY {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export const ORDER_MATCHING_DAY_OPTIONS = [
  {value: ORDER_MATCHING_DAY.MONDAY, label: 'Thứ 2'},
  {value: ORDER_MATCHING_DAY.TUESDAY, label: 'Thứ 3'},
  {value: ORDER_MATCHING_DAY.WEDNESDAY, label: 'Thứ 4'},
  {value: ORDER_MATCHING_DAY.THURSDAY, label: 'Thứ 5'},
  {value: ORDER_MATCHING_DAY.FRIDAY, label: 'Thứ 6'},
  {value: ORDER_MATCHING_DAY.SATURDAY, label: 'Thứ 7'},
  {value: ORDER_MATCHING_DAY.SUNDAY, label: 'Chủ nhật'},
];

export const ORDER_MATCHING_DAY_MAPPING: any = {
  [ORDER_MATCHING_DAY.MONDAY]: 'Thứ 2',
  [ORDER_MATCHING_DAY.TUESDAY]: 'Thứ 3',
  [ORDER_MATCHING_DAY.WEDNESDAY]: 'Thứ 4',
  [ORDER_MATCHING_DAY.THURSDAY]: 'Thứ 5',
  [ORDER_MATCHING_DAY.FRIDAY]: 'Thứ 6',
  [ORDER_MATCHING_DAY.SATURDAY]: 'Thứ 7',
  [ORDER_MATCHING_DAY.SUNDAY]: 'Chủ nhật',
};
