import React from 'react';
import { Pressable, ViewStyle } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import { LeftArrowSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

interface Props{
  style?: ViewStyle | any
  onPress?(): void
}

const BackButton = React.memo((props: Props) => {
  const {style, onPress} = props
  const {goBack} = useNavigation()

  return (
    <Pressable style={[styles.container, style]} onPress={onPress ?? goBack}>
      <LeftArrowSvg />
    </Pressable>
  )
});

export default BackButton;
BackButton.displayName = ' BackButton'

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.white,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '30@s',
      left: '20@s',
      width: '47@s',
      height: '47@s',
      borderRadius: '15@s',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 18.00,

      elevation: 24,
    },
});
