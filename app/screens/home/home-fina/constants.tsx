import i18n from "i18n-js"
import { images } from "../../../assets/images"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import { DeviceEventEmitter } from "react-native"
import { INSURANCE_TABS } from "../../insurance/constants"

export const HEADER  = [
  {
    image: images.financeHeader,
    title: i18n.t('home.finance.finance'),
    onPress: () =>  {
      //
    }
  },
  {
    image: images.insuranceHeader,
    title: i18n.t('home.insurance.insurance'),
    onPress: () =>  {
      //
    }
  },
  {
    image: images.investHeader,
    title: i18n.t('home.invest.invest'),
    onPress: () =>  {
      //
    }
  },
]
const utilityAction = ( screen, param?: any ) => {
  DeviceEventEmitter.emit('utilityClose');
  navigate(screen, param)
}
export const INSURANCE_PRODUCT = [
  // {
  //   image: images.statistical,
  //   title: 'Thống kê',
  //   onPress: () =>  {
  //     navigate(ScreenNames.MANAGE_INSURANCE_LIST)
  //   }
  // },
  // {
  //   image: images.insurance_extension,
  //   title: 'Gia hạn\nbảo hiểm',
  //   onPress: () =>  {
  //     navigate(ScreenNames.MANAGE_INSURANCE_LIST)
  //   }
  // }, {
  //   image: images.hospital,
  //   title: 'Danh sách\nbệnh viện',
  //   onPress: () =>  {
  //     navigate(ScreenNames.MANAGE_INSURANCE_LIST)
  //   }
  // },
  // {
  //   image: images.support_channel,
  //   title: 'Kênh\nhỗ trợ',
  //   onPress: () =>  {
  //     navigate(ScreenNames.MANAGE_INSURANCE_LIST)
  //   }
  // },
  {
    image: images.claim,
    title: 'Yêu cầu\nbồi thường',
    onPress: () =>  {
      utilityAction(ScreenNames.MANAGE_INSURANCE_LIST, {key : "2"})
    }
  },
  {
    image: images.insurance_handbook,
    title: 'Sổ tay\nbảo hiểm',
    onPress: () =>  {
      utilityAction(ScreenNames.MANAGE_INSURANCE_LIST)
    }
  },
]

export const formatHomeData = (arr) => {
  if (arr?.length > 0){
    return arr.map((e)=>{
      return {
        middleText: e?.time ? Number(e?.time) : '',
        title: e?.total,
        percent: e?.min,
      }
    })
  }
  return []
}
