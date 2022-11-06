import { images } from "../../assets/images"

export enum PAYMENT_METHOD_TYPE {
  FINA = 'finaPay',
  BANK = 'bank'
}

export const CARD_TYPE = {
  front: 'chip_id_card_front',
  back: 'chip_id_card_back'
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

export enum FUND_PROGRAM {
  FLEX = 'flex',
  SIP = 'sip'
}

export const FUND_PROGRAM_LIST = [
  {
    value: FUND_PROGRAM.FLEX,
    label: 'FINA Flex'
  },
  {
    value: FUND_PROGRAM.SIP,
    label: 'FINA Sip'
  },
]

export const getPaymentLabel = (type) => {
  switch (type){
    case type === PAYMENT_METHOD_TYPE.FINA : {
      return images.common_fina_pay
    }
    case type === PAYMENT_METHOD_TYPE.BANK : {
      return 'Chuyển khoản ngân hàng'
    }
  }
}

export const IDENTITY_GUIDE = [
  'Sử dụng giấy tờ gốc, nguyên vẹn và còn hiệu lực,\nkhông sử dụng giấy tờ photo hay scan',
  'Đảm bảo môi trường chụp đủ ánh sáng để ảnh được rõ nét',
  'CMND/CCCD/ Hộ chiếu không bị bôi bẩn, nhàu nát, gấp gãy',
]

export const IDENTITY_GUIDE_IMAGE = [
  {
    image: images.identity_hidden,
    text: 'Không chụp bị\nche khuất'
  },{
    image: images.identity_too_dark,
    text: 'Không chụp\nquá tối'
  },{
    image: images.identity_too_light,
    text: 'Không chụp\nảnh quá sáng'
  },
]
