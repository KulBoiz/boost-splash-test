import React from "react"
import { TouchableOpacity, View } from "react-native"
import { ScaledSheet, s } from "react-native-size-matters"
import { Text } from "../../components"
import { ImageUploadSvg, QrSvg } from "../../assets/svgs"
import { width } from "../../constants/variable"
import { color } from "../../theme"

function BottomTabBar({ state, descriptors, navigation }: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options
  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  const title = focusedOptions?.title as string

  const tabbarCustom = [
    {
      index: 0,
      title: "QR SCAN",
      icon:
        title !== "QR SCAN" ? (
          <QrSvg fillOpacity={0.2} width={s(20)} height={s(20)} />
        ) : (
          <QrSvg width={s(20)} height={s(20)} />
        ),
      iconActive: <QrSvg width={s(20)} height={s(20)} />,
    },
    {
      index: 1,
      title: "UPLOAD",
      icon:
        title !== "UPLOAD" ? (
          <ImageUploadSvg fillOpacity={0.2} width={s(20)} height={s(20)} />
        ) : (
          <ImageUploadSvg width={s(20)} height={s(20)} />
        ),
      iconActive: <ImageUploadSvg width={s(20)} height={s(20)} />,
    },
  ]

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
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <React.Fragment key={index}>
            <TouchableOpacity
              key={index}
              style={styles.wrapIcon}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              {isFocused ? tabbarCustom[index].iconActive : tabbarCustom[index].icon}
              <Text style={[styles.text, isFocused ? styles.textActive : null]}>
                {tabbarCustom[index].title}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        )
      })}
    </View>
  )
}

export default BottomTabBar

const styles = ScaledSheet.create({
  wrap: {
    flexDirection: "row",
    height: "70@s",
    alignItems: "center",
    width: width,
    justifyContent: "space-around",
    paddingBottom: "5@s",
    backgroundColor: "#FCFCFC",
  },
  wrapIcon: { alignItems: "center" },
  textActive: {
    color: color.palette.black,
    fontSize: "11@s",
  },
  text: {
    marginTop: 5,
    color: "#BEBEBE",
    fontSize: "11@s",
  },
})
