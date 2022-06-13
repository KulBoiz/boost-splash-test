import { useFocusEffect } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { BackHandler, Pressable, StatusBar, View, Dimensions } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { ArrowBankSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import HeaderCard from "./components/HeaderCard"
import Carousel from "react-native-snap-carousel"
import PaginationDot from "../../../components/pagination-dot/pagination-dot"
// import { Button } from "../../../button/button"
import { Text } from "../../../components"
import { SurveyResultBase } from "./constants"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"

const { width, height } = Dimensions.get("window")

export const BankHomeScreen = observer(({ navigation }) => {
  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true)
    return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
  })

  const { bankerStore } = useStores()
  const { listRequest } = bankerStore
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    bankerStore.getListRequest({}, { page: 1, limit: 20 }, true)
  }, [])

  // console.log(SurveyResultBase(listRequest));

  const onRightPress = () => {
    navigate(ScreenNames.BANKER_LIST_LOAN_SCREEN)
  }

  const _renderItem = ({ item }) => {
    const onPress = () => {
      // navigate(ScreenNames.BANNER_DETAIL, {url : item?.slug})
    }

    return (
      <Pressable
        onPress={onPress}
        style={{
          borderRadius: 8,
          borderColor: color.palette.blue,
          borderWidth: 1,
          height: 120,
          width: "80%",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        {SurveyResultBase(item?.surveyDetails || [])
          ?.splice(0, 5)
          ?.map((el, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Text
                  color="lighterGray"
                  fontSize={10}
                  lineHeight={20}
                  fontWeight="400"
                  text={`${el?.label}: ${el?.suffix ? el?.suffix : ""}`}
                />

                <Text
                  color="#000"
                  fontSize={10}
                  lineHeight={20}
                  fontWeight="400"
                  text={`${el.value} `}
                />
              </View>
            )
          })}
      </Pressable>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: color.palette.white }}>
      <StatusBar backgroundColor={color.palette.white} barStyle={"dark-content"} />
      <HeaderCard />
      <View style={styles.container}>
        <View style={styles.total}>
          <AppText
            value={`Có ${listRequest?.length} bộ hồ sơ đang chờ giải quyết!`}
            style={styles.title}
          />
          <Pressable onPress={onRightPress} style={styles.button}>
            <AppText
              value={"Quản lý hồ sơ vay"}
              style={{ color: color.palette.blue, fontSize: s(14), fontFamily: fontFamily.medium }}
            />
            <ArrowBankSvg />
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <AppText
          value={`Hồ sơ mới`}
          style={{
            marginBottom: s(10),
            marginTop: s(15),
            fontFamily: fontFamily.medium,
          }}
        />
        <Carousel
          ref={ref.current}
          key={(e, i) => e?.id + i.toString()}
          data={listRequest?.slice(0, 5)}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width}
          // loop
          // auto
          onSnapToItem={(index) => setActiveDot(index)}
        />
      </View>
    </View>
  )
})
const styles = ScaledSheet.create({
  container: {
    marginTop: "10@s",
    paddingHorizontal: "20@s",
    backgroundColor: color.palette.white,
  },
  total: {
    backgroundColor: color.palette.blue,
    paddingHorizontal: "24@s",
    paddingVertical: "32@s",
    flexDirection: "column",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: "8@s",
  },
  button: {
    backgroundColor: color.palette.white,
    width: "80%",
    padding: "13@s",
    borderRadius: "8@s",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  title: {
    color: color.palette.white,
    marginBottom: "16@s",
    fontSize: "14@s",
    lineHeight: "22@s",
  },
})
