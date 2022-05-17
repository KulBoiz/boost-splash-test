import React from 'react';
import { View } from 'react-native';
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"

interface Props{
  image: number
  type:'big'| 'small'
  text: string
}

const ImageTutorialItem = React.memo((props: Props) => {
  const {image, type, text} = props
  return (
    <View style={styles.container}>
      <FastImage source={image} style={type === 'big' ? styles.bigImage : styles.smallImage} />
      <AppText value={text} style={type === 'big' ? styles.bigText : styles.smallText}/>
    </View>
  )
});

export default ImageTutorialItem;

const styles = ScaledSheet.create({
    container: {
      alignItems: "center"
    },
  bigImage: {
    width: '155@s',
    height: '80@s',
    marginBottom: '4@s'
  },
  smallImage: {
    width: '104@s',
    height: '65@s',
    marginBottom: '4@s'
  },
  bigText: {
      fontSize: '14@ms',
    color: color.palette.lightBlack
  },
  smallText: {
    fontSize: '12@ms',
    color: color.palette.deepGray


  }
});
