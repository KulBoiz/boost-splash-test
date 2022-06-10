import React, { useState } from "react"
import { View, Animated } from "react-native"
import { images } from "../../../assets/images"
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import HeaderButton from "./header-button"
import { HEADER } from "../constants"

interface Props{}

const Header = React.memo((props: Props) => {
  const [index, setIndex] = useState(0)
  const handleSelect = (i) => {
    setIndex(i)
  }
  return (
    <Animated.View  style={styles.container}>
      <FastImage source={images.home_finance} style={styles.image}/>
      <View style={styles.wrapButton}>
        {HEADER.map((e,i)=> {
          const isSelect = i === index
          return <HeaderButton key={i.toString()} image={e.image} title={e.title} isSelect={isSelect} handleSelect={()=> handleSelect(i)}/>
          }
        )}
      </View>
    </Animated.View>
  )
});

export default Header;

const styles = ScaledSheet.create({
  container: {
    height: '240@s',
    borderBottomLeftRadius: '24@s',
    borderBottomRightRadius: '24@s',
  },
  wrapButton: {
    flex:1,
    alignItems:"flex-end",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  image: {
    width: '100%',
    height: '240@s',
    position: "absolute"
  }
});
