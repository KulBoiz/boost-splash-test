import React from "react"
import { Pressable, View } from "react-native"
import { AppText } from "../app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { FONT_SEMI_BOLD_14 } from "../../styles/common-style"

interface Props {
  isChecked: boolean
  text?: string
  size?: number

  onPress(): void
}

const RadioButton = React.memo((props: Props) => {
  const { isChecked, text, onPress, size } = props
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={[styles.checkbox, isChecked ? styles.checked : styles.unChecked]}>
        {isChecked && <View style={styles.circle} />}
      </View>
      <AppText value={text} style={FONT_SEMI_BOLD_14} color={isChecked ? color.primary : color.palette.black   }/>
    </Pressable>
  )
})

export default RadioButton

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: "16@s",
    height: "16@s",
    borderRadius: "8@s",
    marginRight: "5@ms",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  checked: {
    borderColor: color.palette.blue,
  },
  unChecked: {
    borderColor: color.palette.grayChateau,
  },
  circle: {
    width: "8@s",
    height: "8@s",
    borderRadius: "4@s",
    backgroundColor: color.primary,
  },
})
