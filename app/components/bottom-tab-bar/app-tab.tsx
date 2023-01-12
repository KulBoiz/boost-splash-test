/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useMemo } from "react"
import { View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { hasNotch } from "react-native-device-info"
import { ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import { isIos } from "../../constants/variable"
import { fontFamily } from "../../constants/font-family"
import { HIT_SLOP } from "../../styles/common-style"
import i18n from "i18n-js"
import { useStores } from "../../models"
import { ROLE } from "../../models/auth-store"

const tabName = {
  home: i18n.t("bottom_bar.home"),
  chat: i18n.t("bottom_bar.chat"),
  request: i18n.t("bottom_bar.create"),
  manage: i18n.t("bottom_bar.management"),
  profile: i18n.t("bottom_bar.setting"),
  friendzone: ' Bạn bè',
}

function AppTabBar({ state, descriptors, navigation }: any) {
  const { authStoreModel } = useStores()
  const { role } = authStoreModel
  const focusedOptions = descriptors[state.routes[state.index].key].options
  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  const tabBarCustom = useMemo(() => ([
    {
      index: 0,
      title: tabName.home,
      icon: <FastImage source={images.app_home} style={styles.icon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_home} style={styles.icon} tintColor={color.primary} />,
    },
    // {
    //   index: 1,
    //   title: tabName.chat,
    //   icon: <FastImage source={images.app_chat} style={styles.icon} tintColor={color.palette.grayChateau} />,
    //   iconActive: <FastImage source={images.app_chat} style={styles.icon} tintColor={color.primary} />,
    // },

    {
      index: 1,
      title: tabName.manage,
      icon: <FastImage source={images.app_manage} style={styles.icon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_manage} style={styles.icon} tintColor={color.primary} />,
    },
    {
      index: 2,
      title: tabName.request,
      icon: <FastImage source={images.app_request} style={styles.icon} />,
      iconActive: <FastImage source={images.app_request} style={styles.icon} />,
    },
    {
      index: 3,
      title: tabName.friendzone,
      icon: <FastImage source={images.app_friendzone} style={styles.friendIcon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_friendzone} style={styles.friendIcon} tintColor={color.primary} />,
    },
    {
      index: 4,
      title: tabName.profile,
      icon: <FastImage source={images.app_profile} style={styles.icon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_profile} style={styles.icon} tintColor={color.primary} />,
    },
  ]), [])

  const tabBarBankerCustom = useMemo(() => ([
    {
      index: 0,
      title: tabName.home,
      icon: <FastImage source={images.app_home} style={styles.icon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_home} style={styles.icon} tintColor={color.primary} />,
    },
    // {
    //   index: 1,
    //   title: tabName.chat,
    //   icon: <FastImage source={images.app_chat} style={styles.icon} tintColor={color.palette.grayChateau} />,
    //   iconActive: <FastImage source={images.app_chat} style={styles.icon} tintColor={color.primary} />,
    // },
    {
      index: 1,
      title: tabName.friendzone,
      icon: <FastImage source={images.app_friendzone} style={styles.friendIcon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_friendzone} style={styles.friendIcon} tintColor={color.primary} />,
    },
    {
      index: 2,
      title: tabName.profile,
      icon: <FastImage source={images.app_profile} style={styles.icon} tintColor={color.palette.grayChateau} />,
      iconActive: <FastImage source={images.app_profile} style={styles.icon} tintColor={color.primary} />,
    },
  ]), [])

  return (
    <View style={styles.wrap}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }
        return (
          <>
            {role !== ROLE.BANK ?
              <TouchableOpacity
                key={index}
                hitSlop={HIT_SLOP}
                style={styles.wrapIcon}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                {isFocused ? tabBarCustom[index].iconActive : tabBarCustom[index].icon}
                <AppText
                  // style={[styles.text, isFocused ? styles.textActive : null, index === 2 && styles.middleText]}>{tabBarCustom[index].title}</AppText>
                  style={[styles.text, isFocused ? styles.textActive : null]}>{tabBarCustom[index].title}</AppText>
              </TouchableOpacity>
              :
              <TouchableOpacity
                key={index}
                hitSlop={HIT_SLOP}
                style={styles.wrapIcon}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                {isFocused ? tabBarBankerCustom[index].iconActive : tabBarBankerCustom[index].icon}
                <AppText
                  style={[styles.text, isFocused ? styles.textActive : null]}
                  fontFamily={fontFamily.medium}
                >
                  {tabBarBankerCustom[index].title}
                </AppText>
              </TouchableOpacity>
            }
          </>

        )
      })}
    </View>
  )
}

export default AppTabBar

const styles = ScaledSheet.create({
  icon: {
    width: "24@ms",
    height: "24@ms",
  },
  friendIcon: {
    width: "24@ms",
    height: "20@ms",
    marginVertical: '2@ms'
  },
  iconPlus: {
    width: "44@ms",
    height: "44@ms",
    marginBottom: isIos ? "40%" : "25%",
  },
  wrap: {
    borderTopRightRadius: "20@s",
    borderTopLeftRadius: "20@s",
    elevation: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,
    flexDirection: "row",
    height: hasNotch() ? "80@s" : "60@s",
    alignItems: "center",
    // justifyContent: "space-evenly",
    justifyContent: "space-around",
    paddingBottom: hasNotch() ? "20@vs" : "5@vs",
    backgroundColor: color.background,
  },
  wrapIcon: { alignItems: "center"},
  textActive: {
    color: color.primary,
    fontSize: "10@ms",
  },
  text: {
    marginTop: 5,
    color: color.palette.grayChateau,
    fontSize: "10@ms",
  },
  middleText: {
    bottom: isIos ? "22.5%" : "18%",
  },
})
