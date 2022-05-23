import React from 'react';
import { Pressable } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_MEDIUM_14, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  onPress(): void
  icon: JSX.Element
  text: string
}

const ActionItem = React.memo((props: Props) => {
  const {onPress, icon, text} = props
  return (
    <Pressable style={[ROW, ALIGN_CENTER]} onPress={onPress}>
      {icon}
      <AppText value={text} style={[FONT_MEDIUM_14, styles.text]} color={color.text}/>
    </Pressable>
  )
});

export default ActionItem;

const styles = ScaledSheet.create({
  text: {
    marginLeft: '8@ms'
  }
})
