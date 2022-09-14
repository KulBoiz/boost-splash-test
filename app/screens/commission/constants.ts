import { hexToRgbA } from "../../constants/variable"
import { color } from "../../theme"
import { images } from "../../assets/images"

export enum COMMISSION_STATUS {
  PAID = 'paid',
  CANCEL = 'cancelled',
  FOR_CONTROL = 'for_control',
  NOT_FOR_CONTROL = 'not_for_control'
}

export const commissionStatus = (value) => {
    let status = '_';
    let icon = images.commission_unchecked;
    let textColor = color.palette.orange;
    let background = hexToRgbA(color.palette.orange, 0.1);

    if (value === COMMISSION_STATUS.PAID) {
      status = 'Đã thanh toán'
      textColor = color.palette.green
      background = hexToRgbA(color.palette.green, 0.1)
      icon = images.commission_paid
    }

    if (value === COMMISSION_STATUS.CANCEL) {
      status = 'Hồ sơ bị huỷ'
      textColor = color.palette.angry
      background = hexToRgbA(color.palette.angry, 0.1)
      icon = images.commission_cancel
    }

    if (value === COMMISSION_STATUS.FOR_CONTROL) {
      status = 'Đã đối soát'
      textColor = color.palette.yellow
      background = hexToRgbA(color.palette.yellow, 0.1)
      icon = images.commission_checked
    }

    if (value === COMMISSION_STATUS.NOT_FOR_CONTROL) {
      status = 'Chưa đối soát'
      textColor = color.palette.orange
      background = hexToRgbA(color.palette.orange, 0.1)
      icon = images.commission_unchecked
    }
    return {status, textColor, background, icon};
}

export const COMMISSION_TYPES = {
  LOAN: 'loan',
  INSURANCES: 'insurances',
};

export const COMMISSION_ROLE_SPECIFY = {
  PERSONAL: 'personal',
  AGENT: 'agent',
};

export const COMMISSION_ROLE_SPECIFY_LABEL_MAPPING = {
  [COMMISSION_ROLE_SPECIFY.PERSONAL]: 'Cá nhân',
  [COMMISSION_ROLE_SPECIFY.AGENT]: 'Đại lý',
};

export const COMMISSION_REASON_SPEND_MAPPING = {
  [COMMISSION_TYPES.LOAN]: 'Hồ sơ vay',
  [COMMISSION_TYPES.INSURANCES]: 'Bảo hiểm',
};
