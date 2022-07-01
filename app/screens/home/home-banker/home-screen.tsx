import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { BackHandler, Pressable, StatusBar, View, Dimensions } from "react-native"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { ArrowBankSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import HeaderCard from "./components/HeaderCard"
import Carousel from "react-native-snap-carousel"
import { Text } from "../../../components"
import { SurveyResultBase } from "./constants"
import { ScreenNames } from "../../../navigators/screen-names"
import { navigate } from "../../../navigators"
import {
  ALIGN_CENTER,
  FONT_MEDIUM_12,
  MARGIN_TOP_16,
  ROW,
  SPACE_BETWEEN,
} from "../../../styles/common-style"
import { truncateString } from "../../../constants/variable"

const { width, height } = Dimensions.get("window")

export const BankHomeScreen = observer(({ navigation }) => {
  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true)
    return () => BackHandler.removeEventListener("hardwareBackPress", () => true)
  })


  const [total, setTotal]: any = useState()
  const { bankerStore } = useStores()
  const { listRequest, listLoanTotal, listRequestTotal } = bankerStore
  const ref = useRef()

  useEffect(() => {
    bankerStore.getTotal().then((res) => {
      setTotal({ deal: res?.resultDeal?.total, task: res?.result?.total })
    })
  }, [])

  // console.log(SurveyResultBase(listRequest));

  const onRightPress = () => {
    navigate(ScreenNames.BANKER_LIST_REQUEST_SCREEN)
  }
  const onLeftPress = () => {
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
          width: "90%",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        {SurveyResultBase(item?.surveyDetails || [])
          ?.splice(0, 5)
          ?.map((el, index) => {
            return (
              <View
                key={index.toString()}
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
                  text={`${el?.label}`}
                />

                <Text
                  color="#000"
                  fontSize={10}
                  lineHeight={20}
                  fontWeight="400"
                  text={`${truncateString(el.value, 30)} ${el?.suffix ? ` ${el?.suffix}` : ""} `}
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
          <AppText style={styles.title}>
            Có{" "}
            <AppText
              value={`${total?.deal || '0'} hồ sơ vay `}
              style={[styles.title, { color: color.palette.blue }]}
            />
            và{" "}
            <AppText
              value={`${total?.task || '0'} YCTV`}
              style={[styles.title, { color: color.palette.orange }]}
            />
          </AppText>
          <AppText value={`đang chờ giải quyết!`} style={styles.title} />
          <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, MARGIN_TOP_16]}>
            <Pressable onPress={onLeftPress} style={styles.button}>
              <AppText value={"Hồ sơ vay"} style={styles.text} />
              <ArrowBankSvg />
            </Pressable>
            <Pressable
              onPress={onRightPress}
              style={[styles.button, { backgroundColor: color.palette.orange }]}
            >
              <AppText value={"Yêu cầu tư vấn"} style={styles.text} />
              <ArrowBankSvg />
            </Pressable>
          </View>
          {/* <Pressable
            onPress={() => navigate(ScreenNames.MANAGE_INSURANCE_LIST)}
            style={[styles.button, { backgroundColor: color.palette.orange, marginTop: 12 }]}
          >
            <AppText value={"Bảo Hiểm"} style={styles.text} />
            <ArrowBankSvg />
          </Pressable> */}
        </View>
      </View>

      {/* <View style={styles.container}>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText
            value={`Hồ sơ mới`}
            style={{
              marginBottom: s(10),
              marginTop: s(15),
              fontFamily: fontFamily.medium,
            }}
          />
        </View>

        <Carousel
          ref={ref.current}
          key={(e, i) => e?.id + i.toString()}
          data={listRequest?.slice(0, 5)}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width - ms(50)}
          inactiveSlideScale={1}
          activeSlideAlignment={"start"}
        />
      </View> */}
    </View>
  )
})
const styles = ScaledSheet.create({
  container: {
    marginTop: "10@s",
    paddingHorizontal: "24@ms",
    backgroundColor: color.palette.white,
  },
  total: {
    backgroundColor: color.palette.white,
    paddingHorizontal: "24@ms",
    paddingVertical: "32@s",
    width: "100%",
    borderRadius: "8@s",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  button: {
    backgroundColor: color.palette.blue,
    width: "48%",
    padding: "13@s",
    borderRadius: "8@s",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    color: color.palette.black,
    fontSize: "14@s",
    lineHeight: "22@s",
  },
  text: {
    fontFamily: fontFamily.semiBold,
    fontSize: "12@ms",
    color: color.text,
    marginTop: "1@s",
    marginRight: "8@ms",
  },
})
