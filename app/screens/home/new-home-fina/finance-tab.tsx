import React, { useState } from "react"
import { View } from "react-native"
import HomeItem from "./components/home-item"
import { INSURANCE_PRODUCT, LOAN_PRODUCT, TEST_HOME } from "./constants"
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

interface Props {}

const FinanceTab = React.memo((props: Props) => {
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
      onPress: () => {
        setLink(DOMAIN + "/cong-cu-tinh")
        setVisible(true)
      },
    },
    {
      image: images.home_real_estate,
      title: i18n.t("home.real_estate"),
      onPress: () => navigate(ScreenNames.REQUEST_COUNSELLING),
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
      <HomeItem data={LOAN_PRODUCT} label={"Sản phẩm vay"} style={styles.itemMargin} />
      <HomeItem data={INSURANCE_PRODUCT} label={"Sản phẩm bảo hiểm"} style={styles.itemMargin} />
      <LoanPackage />
      <HomeItem data={SUPPORT_TOOL} label={"Công cụ hỗ trợ"} style={styles.itemMargin} />
      <HomeItem data={TEST_HOME} label={"Công cụ hỗ trợ"} style={styles.itemMargin} iconShape={'circle'}/>
      <HomeBanner />
      <BottomView height={100} />
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
