import React from 'react';
import { View, TouchableOpacity } from "react-native"
import { BellSvg, SearchSvg } from "../../../assets/svgs"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import LoginCard from "./LoginCard"
import { isIphoneX } from "react-native-iphone-x-helper"
import { ScaledSheet} from "react-native-size-matters"
import { color } from "../../../theme"
import { ROW } from "../../../styles/common-style"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import Wallet from "./Wallet"

interface Props{}

const HeaderCard = React.memo((props: Props) => {
  return (
    <><View style={styles.header}>
      <FastImage source={images.headerDecor} style={styles.image} />
      <View style={styles.wrapContent}>
        <LoginCard style={styles.itemContainer}/>
        <AppText value={'FINA'} style={styles.fina}/>
        <View style={[ROW,styles.itemContainer, {justifyContent: "flex-end"}]}>
          {/*<TouchableOpacity>*/}
          {/*  <SearchSvg /> */}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity onPress={()=> navigate(ScreenNames.NOTICE)}>
            <BellSvg />
          </TouchableOpacity>
        </View>
      </View>

    </View>
      {/*<View style={styles.wallet}>*/}
      {/*  <Wallet />*/}
      {/*</View>*/}
    </>
  )
});

export default HeaderCard;

const styles = ScaledSheet.create({
    container: {},
  wrapContent: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContainer: {
    width: '35%'   ,
  },
  fina: {
    fontSize: '24@ms',
    color: color.text,
    fontFamily: fontFamily.bold
  },
  image: {
    top:20,
    width: 420, height: 500,
    position: 'absolute'
  },
  header: {
    height: isIphoneX() ? '110@vs' : '90@vs',
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: color.palette.blue
  },
  wallet: {
    flexDirection: 'row',
    paddingHorizontal: '16@s',
    alignItems: 'center',
    alignSelf: 'center',
    height: '50@s',
    width: '90%',
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginTop: '-25@s',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
