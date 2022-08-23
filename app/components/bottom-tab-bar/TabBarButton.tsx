import React from "react"
import { TouchableOpacity, View } from "react-native"
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs/lib/typescript/src/types"
import { TabBg } from "./TabBg"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { ScaledSheet, s } from "react-native-size-matters"
import { color } from "../../theme"
import { PlusSvg } from "../../assets/svgs"
import { AppText } from "../app-text/AppText"

type Props = BottomTabBarButtonProps & {
  bgColor?: string
}

export const TabBarButton: React.FC<Props> = ({ bgColor, ...props }) => (
  <View style={styles.container} pointerEvents="box-none">
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate(ScreenNames.REQUEST_COUNSELLING)}
    >
      <PlusSvg width={s(15)} height={s(15)} />
    </TouchableOpacity>
    <AppText value={'Tạo yêu cầu'}/>
  </View>
)

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.background,
    alignItems: "center",
    width: '20%',
  },
  button : {
    width: '46@s',
    height: '46@s',
    borderRadius: '23@s',
    backgroundColor: color.palette.blue,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: '5@s'
  }
})
