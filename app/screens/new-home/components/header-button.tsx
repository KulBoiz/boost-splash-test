import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { FONT_SEMI_BOLD_12 } from "../../../styles/common-style"

interface Props{
  icon: JSX.Element
  title: string
}

const HeaderButton = React.memo((props: Props) => {
  const {icon, title} = props
  return (
    <View style={styles.container}>
      {icon}
      <AppText value={title} style={FONT_SEMI_BOLD_12}/>
    </View>
  )
});

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    width: '25%'
  },
});
