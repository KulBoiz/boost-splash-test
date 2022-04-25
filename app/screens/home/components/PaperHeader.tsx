import React, { FC, memo } from 'react';
import { ImageProps, TouchableOpacity, View, ViewStyle } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { CENTER_ELEMENTS } from "../../../styles/common-style"
import { presets } from "../../../constants/presets"
import FastImage from "react-native-fast-image"
import { TxKeyPath } from "../../../i18n"

interface PaperProps {
  key: number,
  title: TxKeyPath,
  image: ImageProps | string
  background: string
}
export interface HeaderTitleProps {
  handleSelectPage: (key: any) => void;
  paperData: Array<PaperProps> | any;
  currentPage: number;
}

const PaperHeader: FC<HeaderTitleProps> = ({ handleSelectPage, paperData, currentPage }) => {
  return (
    <View style={styles.viewHeader}>
      {paperData.map((item, index) => {
        const isCurrent = currentPage === item.key;
        return (
          <View key={index}>
             <TouchableOpacity key={index} onPress={handleSelectPage} style={styles.itemContainer}>
               <View style={[styles.circle, CENTER_ELEMENTS, {backgroundColor: isCurrent ? item.background : color.background}]}>
                 <FastImage source={item.image} style={styles.image} tintColor={isCurrent ?  color.palette.white : color.palette.black}/>
               </View>
               <AppText tx={item.title} style={isCurrent && presets.bold}/>
             </TouchableOpacity>
            {isCurrent &&
            <View style={styles.separate}>
              <View style={{backgroundColor: item.background, height: 1}}/>
            </View>
            }
          </View>
        );
      })}
    </View>
  );
};

const styles = ScaledSheet.create({
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '16@s'
  },
  itemContainer:{
    width: '100@s',
    height: '60@s',
    borderRadius: '8@s',
    backgroundColor: color.background,
    paddingHorizontal: '16@s',
    justifyContent: 'flex-end',
    paddingBottom: '8@s',
  },
  circle:{
    width: '48@s',
    height: '48@s',
    borderRadius: '24@s',
    backgroundColor: color.palette.orange,
    position: 'absolute',
    top: '-24@s',
    left: '16@s',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 24,
  },
  image:{
    width: '24@s',
    height: '24@s',
  },
  separate: {
    backgroundColor: 'white',
    height: '15@s',
    bottom: '5@s',
    paddingHorizontal: '16@s',
    justifyContent: 'flex-end'
  }
});

export default memo(PaperHeader);
