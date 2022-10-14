import React, { useCallback, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, ScrollView, View } from "react-native"
import AppHeader from "../../../../components/app-header/AppHeader"
import { color } from "../../../../theme"
import { MARGIN_TOP_16 } from "../../../../styles/common-style"
import { ms, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../../components/app-text/AppText"
import AppButton from "../../../../components/app-button/AppButton"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { useStores } from "../../../../models"
import { RouteProp, useRoute } from "@react-navigation/native"
import { fontFamily } from "../../../../constants/font-family"
import { get } from "lodash"
import EmptyList from "../../../../components/empty-list"
import { truncateString } from "../../../../constants/variable"
import BondsInfo from "./components/bonds-info"
import BondsSubInfo from "./components/bonds-sub-info"
import { NavigatorParamList } from "../../../../navigators/params-list"

interface Props {
}

const BondsDetail = React.memo((props: any) => {
  const { params: { slug } } = useRoute<RouteProp<NavigatorParamList, ScreenNames.BONDS_DETAIL>>()
  const { investStore } = useStores()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    investStore.getBondsDetail(slug ?? '').then(res => {
        setLoading(false)
        setData(res)
      },
    )
  }, [])

  const handleBuy = useCallback(() => {
    navigate(ScreenNames.BUY_BONDS)
  }, [])

  const renderTitle = useMemo(() => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <AppText value={truncateString(get(data, "name", ""), 30)} fontSize={ms(16)} fontFamily={fontFamily.bold}
                 color={color.text} />
        <AppText value={get(data, "org.name", "")} color={color.text} />
      </View>
    )
  }, [data])

  return (
    <View style={styles.container}>
      <AppHeader renderTitle={renderTitle} isBlue />
      {loading ? <ActivityIndicator color={color.primary} style={MARGIN_TOP_16} /> :
        <>
          {Object?.keys(data)?.length ?
            <View style={{flex:1}}>
              <ScrollView>
                <BondsInfo data={data} />
                <BondsSubInfo data={data} />
              </ScrollView>
              <View style={styles.wrapBtn}>
                <AppButton title={"Mua"} onPress={handleBuy} />
              </View>
            </View>

            : <EmptyList />
          }
        </>
      }
    </View>
  )
})

export default BondsDetail

const styles = ScaledSheet.create({
  container: { flex: 1, backgroundColor: color.background },
  body: {
    paddingHorizontal: "16@s",
  },
  tabBar: {
    backgroundColor: color.palette.white,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: color.palette.BABABA,
    marginBottom: "16@s",
  },
  tabItemSelect: {
    flex: 1,
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: color.primary,
    paddingHorizontal: "8@s",
    paddingVertical: "8@s",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "8@s",
    paddingVertical: "8@s",
  },
  wrapBtn: {
    paddingHorizontal: "16@s",
    paddingVertical: "24@s",
  },
})