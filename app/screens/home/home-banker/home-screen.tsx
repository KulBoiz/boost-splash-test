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
  ALIGN_CENTER, CONTAINER_PADDING,
  FONT_MEDIUM_12,
  MARGIN_TOP_16,
  ROW,
  SPACE_BETWEEN,
} from "../../../styles/common-style"
import { truncateString } from "../../../constants/variable"
import ViewContent from "./components/view-content"

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
    <View style={styles.container}>
      <StatusBar backgroundColor={color.palette.white} barStyle={"dark-content"} />
      <HeaderCard />
      <View style={styles.body}>
        <AppText value={'Công việc hôm nay của bạn'} style={styles.label}/>
        <View style={[ROW, SPACE_BETWEEN]}>
          <ViewContent type={'counselling'} total={total?.task || 0} />
          <ViewContent type={'loan'} total={total?.deal || 0} />
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
    flex:1,
    backgroundColor: '#316CDD',
  },
  body: {
    paddingTop: '16@s',
    backgroundColor: color.palette.white,
    paddingHorizontal: '16@ms',
    flex: 1,
    borderTopLeftRadius: '16@s',
    borderTopRightRadius: '16@s'
  },
  label: {
    fontSize: '12@ms',
    fontFamily: fontFamily.bold,
    marginBottom: '8@s'
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
