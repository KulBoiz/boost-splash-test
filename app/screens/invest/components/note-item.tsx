import React from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"

interface Props {
  note: string
}

const NoteItem = React.memo(({ note }: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={images.yellow_caution} style={styles.icon} />
      <AppText value={note}/>
    </View>
  )
})

export default NoteItem

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginRight: '4@s'
  },
})
