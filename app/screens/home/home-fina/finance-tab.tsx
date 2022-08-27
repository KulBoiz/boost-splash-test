import { DOMAIN } from "@env"
import i18n from "i18n-js"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { images } from "../../../assets/images"
import FullScreenModal from "../../../components/app-modal/full-screen-modal"
import BottomView from '../../../components/bottom-view'
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { color } from "../../../theme"
import HomeBanner from "./components/home-banner"
import HomeItem from "./components/home-item"
import ProjectItem from "./components/project-item"
import { formatHomeData } from "./constants"
import { MARGIN_BOTTOM_24 } from "../../../styles/common-style"

interface Props { }

const FinanceTab = React.memo((props: Props) => {
  const { homeStore } = useStores()
  const [visible, setVisible] = useState(false)
  const [projects, setProjects] = useState([])
  const [link, setLink] = useState("")

  useEffect(() => {
    const params = {
      filter: {
        limit: 20,
        skip: 0,
        where: {
          active: true,
          indexPrioritized: { inq: GetIndexPrioritized() },
        }
      },
      page: 1
    }
    homeStore.getHomeData()
    homeStore.getProjectHouse(params).then((res) => {
      setProjects(res)
    })
  }, [])

  const GetIndexPrioritized = () => {
    const indexPrioritized: number[] = [];

    for(let i = 1; i <= 10; i++) {
      indexPrioritized.push(i);
    }

    return indexPrioritized;
  };

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
        setLink(DOMAIN + "/khao-sat-kha-nang-vay")
        setVisible(true)
      },
    },
    // {
    //   image: images.home_real_estate,
    //   title: i18n.t("home.real_estate"),
    //   onPress: () => { navigate(ScreenNames.CHAT) },
    // },
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
      <HomeItem data={SUPPORT_TOOL} label={"Công cụ bán hàng"} style={MARGIN_BOTTOM_24} />
      <HomeBanner />
        {homeStore?.real_estate?.length > 0 &&
        <HomeItem
          data={formatHomeData(homeStore.real_estate)}
          header={'Vay mua nhà có sổ'}
          label={"Vay mua nhà có sổ"}
          style={styles.itemMargin}
          iconShape={'circle'}
          type={'real_estate'}
        />
      }

      {!!projects?.length &&
        <ProjectItem
          data={projects}
          header={'Vay mua nhà dự án'}
          label={"Vay mua nhà dự án"}
          style={styles.itemMargin}
          iconShape={'circle'}
          type={'project_house'}
        />
      }

      {!!homeStore.vehicle?.length &&
        <HomeItem
          data={formatHomeData(homeStore.vehicle)}
          header='Vay mua xe'
          label={"Vay mua xe"}
          style={styles.itemMargin}
          iconShape={'circle'}
          type={'vehicle'}
        />
       }

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
    marginTop: "24@s",
  },
})
