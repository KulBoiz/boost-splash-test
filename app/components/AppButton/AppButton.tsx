import React, { FC, memo } from "react"
import { TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle, TouchableOpacityProps } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import {Text} from '../text/text'
import { color } from "../../theme"

export interface BaseButtonProps extends TouchableOpacityProps  {
  title: string
  onPress: () => void
  disable?: boolean
  loading?: boolean
  containerStyle?: ViewStyle | any
  titleStyle?: TextStyle
  colorBtn?: string
}

const AppButton: FC<BaseButtonProps> = ({
  title,
  onPress,
  disable,
  loading,
  containerStyle,
  titleStyle,
  colorBtn,
  ...props
}: BaseButtonProps) => {
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
        <Text style={[styles.title, titleStyle]}>{title || "OK"}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    borderRadius: "4@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "14@vs",
  },
  disableStyle: {
    width: "100%",
    borderRadius: "4@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "14@vs",
    opacity: 0.6
  },
  title: { fontSize: "15@s", color: color.palette.white, fontWeight: '700'},
})

export default memo(AppButton)
