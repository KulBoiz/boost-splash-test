import i18n from "i18n-js"
import { s } from "react-native-size-matters"
import { isAndroid } from "../../../constants/variable";
import { images } from "../../../assets/images"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"

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

export const LOAN_PRODUCT  = [
  {
    image: images.home_house,
    title: i18n.t('home.finance.homeLoan'),
    onPress: () =>  {
      navigate(ScreenNames.CHAT)
    }
  },
  {
    image: images.home_car,
    title: i18n.t('home.finance.carLoan'),
    onPress: () =>  {
      navigate(ScreenNames.CHAT)
    }
  },
  {
    image: images.home_consumer,
    title: i18n.t('home.finance.consumerLoan'),
    onPress: () =>  {
      navigate(ScreenNames.CHAT)
    }
  },
  {
    image: images.home_fix,
    title: i18n.t('home.finance.repairLoad'),
    onPress: () =>  {
      navigate(ScreenNames.CHAT)
    }
  },
]

export const INSURANCE_PRODUCT = [
  // {
  //   image: images.home_fix,
  //   title: i18n.t('home.insurance.claimInsurance'),
  //   onPress: () =>  {
  //     navigate(ScreenNames.CLAIM_INSURANCE)
  //   }
  // },
  {
    image: images.home_records,
    title: i18n.t('home.insurance.listRecordInsurance'),
    onPress: () =>  {
      navigate(ScreenNames.MANAGE_INSURANCE_LIST)
    }
  },
]

export const TEST_HOME = [
  {
    percent: 8,
    middleText: 6,
    title: '50 gói',
    image: 'https://images.pexels.com/photos/12297336/pexels-photo-12297336.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  }, {
    percent: 12,
    middleText: 36,
    title: '30 gói',
    image: 'https://images.pexels.com/photos/12297336/pexels-photo-12297336.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  }, {
    percent: 15,
    middleText: 12,
    title: '45 gói',
    image: 'https://images.pexels.com/photos/12297336/pexels-photo-12297336.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  {
    percent: 15,
    middleText: 24,
    title: '45 gói',
    image: 'https://images.pexels.com/photos/12297336/pexels-photo-12297336.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
  },
  {
    percent: 15,
    middleText: 'Vay siêu tốc',
    title: '45 gói',
    image: 'https://images.pexels.com/photos/12297336/pexels-photo-12297336.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
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
