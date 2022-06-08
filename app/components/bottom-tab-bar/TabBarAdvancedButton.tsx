import React from "react"
import { TouchableOpacity, View } from "react-native"
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { TabBg } from "./TabBg"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { ScaledSheet, s } from "react-native-size-matters"
import { color } from "../../theme"
import { PlusSvg } from "../../assets/svgs"

type Props = BottomTabBarButtonProps & {
  bgColor?: string
}

export const TabBarAdvancedButton: React.FC<Props> = ({ bgColor, ...props }) => (
  <View style={styles.container} pointerEvents="box-none">
    <TabBg color={bgColor} style={styles.background} />
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate(ScreenNames.BANKER_LIST_LOAN_SCREEN)}
    >
      <PlusSvg width={s(15)} height={s(15)} />
    </TouchableOpacity>
  </View>
)

const styles = ScaledSheet.create({
  background: {
    position: "absolute",
    top: 0,
  },
  button: {
    alignItems: "center",
    backgroundColor: color.palette.orange,
    borderRadius: "22.5@s",
    height: "45@ms",
    justifyContent: "center",
    top: "-22@ms",
    width: "45@ms",
  },
  buttonIcon: {
    color: "#F6F7EB",
    fontSize: "20@s",
  },
  container: {
    alignItems: "center",
    position: "relative",
    width: "65@ms",
  },
})
