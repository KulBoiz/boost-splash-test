import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import PreviewImage from "./preview-image"

interface Props {
  style?: ViewStyle | any
  frontImage: string
  backImage: string
}

const CitizenIdentification = React.memo((props: Props) => {
  const { frontImage, backImage, style } = props
  return (
    <View style={[styles.container, style]}>
      <PreviewImage
        type="front"
        image={frontImage}
      />
      <View style={styles.separate} />
      <PreviewImage
        type="back"
        image={backImage}
      />
    </View>
  )
})

export default CitizenIdentification

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  separate: {
    width: "4%",
  },
})
