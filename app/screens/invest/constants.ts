import { images } from "../../assets/images"

export enum PAYMENT_METHOD_TYPE {
  FINA = 'finaPay',
  BANK = 'bank'
}

export const PAYMENT_METHOD = [
  {
    value: PAYMENT_METHOD_TYPE.FINA,
    label: images.common_fina_pay
  },
  {
    value: PAYMENT_METHOD_TYPE.BANK,
    label: 'Chuyển khoản ngân hàng'
  },
]

const getPaymentLabel = (type) => {
  switch (type){
    case type === PAYMENT_METHOD_TYPE.FINA : {
      return images.common_fina_pay
    }
    case type === PAYMENT_METHOD_TYPE.BANK : {
      return 'Chuyển khoản ngân hàng'
    }
  }
}
