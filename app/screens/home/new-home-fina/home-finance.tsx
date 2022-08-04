import React, { useState } from "react"
import { View } from "react-native"
import HomeItem from "./components/home-item"
import { INSURANCE_PRODUCT, LOAN_PRODUCT } from "./constants"
import LoanPackage from "./components/loan-package"
import HomeBanner from "./components/home-banner"
import { ScaledSheet } from "react-native-size-matters"
import FullScreenModal from "../../components/app-modal/full-screen-modal"
import { images } from "../../assets/images"
import i18n from "i18n-js"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { DOMAIN } from "@env"

interface Props {}

const HomeFinance = React.memo((props: Props) => {
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
      <HomeBanner />
      <FullScreenModal
        visible={visible}
        closeModal={() => setVisible(false)}
        animationType={"slideVertical"}
        url={link}
      />
    </View>
  )
})

export default HomeFinance

const styles = ScaledSheet.create({
  container: { flex: 1 },
  itemMargin: {
    marginVertical: "24@s",
  },
})
