import React from "react"
import { StyleSheet, View } from "react-native"
import CustomCheckbox from "../../../../components/checkbox/custom-checkbox"
import { color } from "../../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import RadioButton from "../../../../components/checkbox/radio-button"

interface Props {
}

const IdentitySelection = React.memo((props: Props) => {
  const onPress = () => {
    //
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <RadioButton isChecked={true} onPress={onPress} text={"Căn cước/ Chứng minh nhân dân"} />
      </View>
    </View>
  )
})

export default IdentitySelection

const styles = ScaledSheet.create({
  container: {
    flex: 0.8,
    paddingHorizontal: '16@s'
  },
  selectContainer:{
    padding: "12@s",
    backgroundColor: color.background,
    borderRadius: '8@s'
  }
})
