import React from 'react';
import { View, TouchableOpacity, ViewStyle } from "react-native"
import { color } from "../../../theme"
import { ScaledSheet } from 'react-native-size-matters';
import { TxKeyPath } from "../../../i18n"
import { AppText } from "../../../components/app-text/AppText"

interface Props{
  isSelect: boolean
  onPress: () => void
  title: TxKeyPath
  style: ViewStyle | any
}

const WelcomeButton = React.memo(({ isSelect, onPress, title, style, ...props }: Props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={
          isSelect
            ? [styles.selectStyle, style]
            : [styles.disableStyle, style]
        }
        onPress={onPress}
        {...props}
      >
          <AppText style={isSelect ? styles.titleSelect : styles.titleUnselect} tx={title}/>
      </TouchableOpacity>
    </View>
  )
});

export default WelcomeButton;
WelcomeButton.displayName = 'WelcomeButton'

const styles = ScaledSheet.create({
  container: {width: '40%'},
  selectStyle: {
    width: "100%",
    borderRadius: "8@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8@vs",
    backgroundColor: color.palette.blue
  },
  disableStyle: {
    width: "100%",
    borderRadius: "8@s",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "8@vs",
    // opacity: 0.6,
    backgroundColor: color.palette.lightGrey
  },
  titleSelect: { fontSize: "15@s", color: color.palette.white},
  titleUnselect: { fontSize: "15@s", color: '#151940'},
});
