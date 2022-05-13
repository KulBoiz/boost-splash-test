import React, { FC, memo } from "react"
import { ActivityIndicator, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { Text } from "../text/text"
import { color } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import i18n from "i18n-js"
import { fontFamily } from "../../constants/font-family"

export interface BaseButtonProps extends TouchableOpacityProps  {
  title?: string
  tx?: TxKeyPath
  txOptions?: i18n.TranslateOptions
  onPress(): void
  disable?: boolean
  loading?: boolean
  containerStyle?: ViewStyle | any
  titleStyle?: TextStyle
  colorBtn?: string
  upperCase?:boolean
}

const AppButton: FC<BaseButtonProps> = ({
  tx,
  txOptions,
  title,
  onPress,
  disable,
  loading,
  containerStyle,
  titleStyle,
  colorBtn,
  upperCase = false,
  ...props
}: BaseButtonProps) => {
  const content = tx && translate(tx, txOptions)
  return (
    <TouchableOpacity
      style={
        disable
          ? [styles.disableStyle, containerStyle]
          : [styles.container, { backgroundColor: colorBtn ?? color.palette.blue }, containerStyle]
      }
      onPress={onPress}
      disabled={disable || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size={15} color={color.palette.white} />
      ) : (
        <Text style={[styles.title, upperCase && styles.upperCase, titleStyle]}>{title || content}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    borderRadius: "8@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "14@vs",
  },
  disableStyle: {
    width: "100%",
    borderRadius: "8@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "14@vs",
    opacity: 0.6
  },
  title: { fontSize: "15@s", color: color.palette.white, fontWeight: '700', fontFamily: fontFamily.mulish.bold},
  upperCase: {
    textTransform: "uppercase"
  }
})

export default memo(AppButton)
