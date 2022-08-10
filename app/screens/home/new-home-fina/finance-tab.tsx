import React, { useState } from "react"
import { View } from "react-native"
import HomeItem from "./components/home-item"
import { formatHomeData, INSURANCE_PRODUCT, LOAN_PRODUCT, TEST_HOME } from "./constants"
import { ScaledSheet } from "react-native-size-matters"
import i18n from "i18n-js"
import { DOMAIN } from "@env"
import { images } from "../../../assets/images"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import LoanPackage from "../../new-home/components/loan-package"
import FullScreenModal from "../../../components/app-modal/full-screen-modal"
import HomeBanner from "./components/home-banner"
import { color } from "../../../theme"
import BottomView from '../../../components/bottom-view'
import { useStores } from "../../../models"

interface Props {}

const FinanceTab = React.memo((props: Props) => {
  const {homeStore} = useStores()
  const [visible, setVisible] = useState(false)
  const [link, setLink] = useState("")

  const SUPPORT_TOOL = [
    {
      image: images.home_notarial,
      title: i18n.t("home.notarialRecord"),
      onPress: () => {
        setLink(DOMAIN + "/cong-chung-truc-tuyen")
        setVisible(true)
      },
    },
    {
      image: images.home_ability_to_borrow,
      title: i18n.t("home.abilityToBorrow"),
      onPress: () => {navigate(ScreenNames.CHAT)},
    },
    {
      image: images.home_real_estate,
      title: i18n.t("home.real_estate"),
      onPress: () => {navigate(ScreenNames.CHAT)},
    },
    {
      image: images.home_introduce_borrowers,
      title: i18n.t("home.introduceBorrowers"),
      onPress: () => navigate(ScreenNames.REQUEST_COUNSELLING),
    },
    {
      image: images.home_calculate_tool,
      title: i18n.t("home.calculate_tool"),
      onPress: () => {
        setLink(DOMAIN + "/cong-cu-tinh")
        setVisible(true)
      },
    },
    // {
    //   image: images.home_records,
    //   title: i18n.t("home.recordManagement"),
    //   onPress: () => navigate(ScreenNames.FINANCE, { index: 2 }),
    // },

    {
      image: images.home_planning_check,
      title: i18n.t("home.map"),
      onPress: () => {
        setLink(DOMAIN + "/kiem-tra-quy-hoach")
        setVisible(true)
      },
    },
  ]

  return (
    <View style={styles.container}>
      {!!homeStore.vehicle?.length && <HomeItem data={formatHomeData(homeStore.vehicle)} label={"Vay mua xe"} style={styles.itemMargin} iconShape={'circle'}/>}
      {!!homeStore.real_estate?.length && <HomeItem data={formatHomeData(homeStore.real_estate)} label={"Vay mua nhà dự án"} style={styles.itemMargin} iconShape={'circle'}/>}

      {/* <LoanPackage /> */}
      <HomeItem data={SUPPORT_TOOL} label={"Công cụ bán hàng"} style={styles.itemMargin} />
      <HomeBanner />
      <BottomView height={200} />
      <FullScreenModal
        visible={visible}
        closeModal={() => setVisible(false)}
        animationType={"slideVertical"}
        url={link}
      />
    </View>
  )
})

export default FinanceTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  itemMargin: {
    marginVertical: "24@s",
  },
})
