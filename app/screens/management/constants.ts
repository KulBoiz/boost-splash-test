import { color } from "../../theme"
import { hexToRgbA } from "../../constants/variable"

export enum TRANSACTION_STATUS {
  waitingForOrderMatching = "Chờ khớp lệnh",
  orderMatched = "Đã khớp lệnh",
  unpaid = "Chưa thanh toán"
}

export const getTransactionColor = (status) => {
  let transactionColor = color.palette.green
  let transactionBackgroundColor = hexToRgbA(color.palette.green, 0.1)

  if (status === TRANSACTION_STATUS.waitingForOrderMatching) {
    transactionColor = color.palette.yellow
    transactionBackgroundColor = hexToRgbA(color.palette.yellow, 0.1)
  }
  if (status === TRANSACTION_STATUS.orderMatched) {
    transactionColor = color.palette.green
    transactionBackgroundColor = hexToRgbA(color.palette.green, 0.1)
  }
  if (status === TRANSACTION_STATUS.unpaid) {
    transactionColor = color.palette.angry
    transactionBackgroundColor = hexToRgbA(color.palette.angry, 0.1)
  }

  return { transactionColor, transactionBackgroundColor }
}
