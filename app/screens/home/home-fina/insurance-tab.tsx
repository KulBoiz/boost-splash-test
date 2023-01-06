import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import BottomView from "../../../components/bottom-view"
import OthersInsurance from "./components/others-Insurance"
import { color } from "../../../theme"
import { useStores } from "../../../models"
import HomeBanner from "./components/home-banner"
import { MARGIN_TOP_16 } from "../../../styles/common-style"
import HomeItem from "./components/home-item"
import { images } from "../../../assets/images"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import FullScreenModal from "../../../components/app-modal/full-screen-modal"
import { INSURANCE_HANDBOOK } from "@env"
import { hasNotch } from "react-native-device-info"
import NewsBanner from "./components/news-banner"

const InsuranceTab = () => {
  const { insuranceStore } = useStores();
  const [link, setLink] = useState("")
  const [visible, setVisible] = useState(false)
  const [othersInsurance, setOthersInsurance] = useState([])

  useEffect(() => {
    insuranceStore.getCategoryInsurance().then((res) => {
      setOthersInsurance(res?.data?.data)
    })
  }, [])

  const mapInsurance = (type) => {
    return othersInsurance?.filter((el: any) => el?.productCategory === type)
  }

  const INSURANCE_PRODUCT = [
    {
      image: images.claim,
      title: 'Yêu cầu\nbồi thường',
      onPress: () =>  {
        navigate(ScreenNames.MANAGE_INSURANCE_LIST, {key : "2"})
      }
    },
    {
      image: images.insurance_handbook,
      title: 'Sổ tay\nFINA CARE',
      onPress: () =>  {
        setLink(INSURANCE_HANDBOOK)
        setVisible(true)
      }
    },
  ]

  return (
    <View style={styles.container}>
      {/* <HomeItem data={INSURANCE_PRODUCT} label={"Sản phẩm bảo hiểm"} style={styles.itemMargin} /> */}
      <HomeItem data={INSURANCE_PRODUCT} label={"Công cụ bảo hiểm"} />
      {
        othersInsurance && othersInsurance?.length > 0 && <>
          <OthersInsurance data={mapInsurance('real_estate') || []} title={"Bảo hiểm con người"} />
          <OthersInsurance data={mapInsurance('vehicle') || []} title={"Bảo hiểm tài sản"} />
        </>
      }
      <NewsBanner label={'Tin tức & khuyến mãi'} />

      <BottomView height={s(200)} />
      <FullScreenModal
        visible={visible}
        closeModal={() => setVisible(false)}
        animationType={"slideVertical"}
        url={link}
      />
    </View>
  )
}

export default InsuranceTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
    // paddingTop: '16@s',
  },
  scrollView: {
    marginTop: hasNotch() ? "155@s" : "130@s",
  },
  itemMargin: {
    marginVertical: "24@s",
  },
})

