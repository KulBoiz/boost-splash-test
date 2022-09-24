import React, { useCallback } from "react"
import { View, Pressable } from "react-native"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../app-text/AppText"
import { FONT_MEDIUM_12 } from "../../styles/common-style"

interface Props{
  menu: Array<{key,title}>
  index: number
  setIndex(e: number): void
}

const TabBar = React.memo((props: Props) => {
  const {menu, index, setIndex} = props

  const _handleChangeIndex = useCallback((value) => {
    setIndex(value)
  }, [index])

  return (
    <View style={styles.tabBar}>
      {menu.map((route, i) => {
        const isSelect = i === index
        return (
          <Pressable
            key={i}
            style={isSelect ? styles.tabItemSelect : styles.tabItem}
            onPress={() => _handleChangeIndex(i)}
          >
            <AppText style={FONT_MEDIUM_12}
                     color={isSelect ? color.primary : color.palette.osloGray}>{route.title}</AppText>
          </Pressable>
        )
      })}
    </View>
  )
});

export default TabBar;

const styles = ScaledSheet.create({
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
});
