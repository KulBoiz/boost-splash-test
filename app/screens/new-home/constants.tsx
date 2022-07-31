import { images } from "../../assets/images"
import i18n from "i18n-js"
import { navigate } from "../../navigators";
import { ScreenNames } from "../../navigators/screen-names";
import { isAndroid } from "../../constants/variable"
import { s } from "react-native-size-matters"

export const getFeatureViewAnimation = (animatedValue, outputX: number) => {
  const TRANSLATE_X_INPUT_RANGE = [0, 90];
  const TRANSLATE_Y_INPUT = isAndroid ? s(15) : s(6);
  const translateY = {
    translateY: animatedValue.interpolate({
      inputRange: [0, 90],
      outputRange: [0, TRANSLATE_Y_INPUT],
      extrapolate: 'clamp',
    }),
  };
  return {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: TRANSLATE_X_INPUT_RANGE,
          outputRange: [0, outputX],
          extrapolate: 'clamp',
        }),
      },
      translateY,
    ],
  };
};

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

