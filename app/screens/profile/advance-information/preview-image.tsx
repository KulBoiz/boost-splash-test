import React from "react"
import { View } from "react-native"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"

interface Props {
  image: string
  type: 'front' | 'back'
}

const PreviewImage = React.memo(({ image, type }: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: image }} style={styles.image} />
      <AppText value={type === 'front' ? 'Ảnh mặt trước' : 'Ảnh mặt sau'} style={styles.text}/>
    </View>
  )
})

export default PreviewImage

const styles = ScaledSheet.create({
  container: {
    flex:1,
  },
  image: {
    height: "90@s",
    borderRadius: '6@s'
  },
  text :{
    fontFamily: fontFamily.medium,
    fontSize: '12@ms',
    color: 'black',
    marginTop: '4@s',
    textAlign: "center"
  }
})
