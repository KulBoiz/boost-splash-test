import React from 'react';
import { View } from 'react-native';
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"

interface Props{
  productDetail: any
}
const data = [0]
// const url = 'https://images.pexels.com/photos/8003045/pexels-photo-8003045.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const HomeInsurance = React.memo((props: Props) => {
  const { productDetail } = props

  return (
    <View style={styles.container}>
      <AppText value={'Nhà Bảo Hiểm'} style={styles.title}/>
      <View style={styles.wrapImage}>
        {/* {data.map((_,id)=> { */}
        {/*  return( */}
            <FastImage source={{uri: productDetail?.info?.image?.url}} style={styles.image} resizeMode={'contain'}/>
          {/* ) */}
        {/* })} */}
      </View>

    </View>
  )
});

export default HomeInsurance;

const styles = ScaledSheet.create({
    container: {
      paddingHorizontal: '16@ms',
      paddingVertical: '24@s',
      backgroundColor: color.palette.white
    },
  title:{
      fontSize:"16@s",
    marginBottom: '8@s'
  },
  wrapImage:{
    alignItems: "center"
  },
  image: {
    width: '300@s',
    height: '80@s',
    borderRadius: '8@s',
  }
});
