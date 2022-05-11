import React from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from "react-native-fast-image"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_MEDIUM_12, FONT_SEMI_BOLD_14 } from "../../../styles/common-style"
import { color } from "../../../theme"
import { width } from "../../../constants/variable"
interface Props{}

const TEST_DATA = [
  'Duis ullamcorper.  mcorper',
  'Duis ullamcorper...',
  'Duis ullamcorper.',
  'Duis ullamcorper.'
]
const url = 'https://images.pexels.com/photos/11301535/pexels-photo-11301535.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
const TaqItem = ({title}: {title: string}) => {
  return(
    <View style={styles.tagContainer}>
      <AppText value={title} style={styles.tagText}/>
    </View>
  )
}
const InsuranceItem = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <FastImage source={{uri: url}} style={styles.image}/>
      <View>
        <AppText value={'vững tâm mùa dịch'} capitalize style={FONT_MEDIUM_12}/>
        <View style={styles.wrapTag}>
          {TEST_DATA.map((value, index)=> (
            <TaqItem title={value} key={index.toString()}/>
          ))}
        </View>

        <AppText value={'Từ 200.000đ/ năm'} style={FONT_SEMI_BOLD_14} color={color.palette.blue}/>
      </View>
    </View>
  )
});

export default InsuranceItem;

const styles = ScaledSheet.create({
    container: {
      flexDirection: 'row',
      padding: '8@ms',
      borderWidth: 1,
      borderRadius: '8@s',
      borderColor: 'rgba(173, 173, 173, 0.5)',
      marginBottom: '16@s',

    },
  image: {
    width: '98@s',
    height: '98@s',
    borderRadius: '8@s',
    marginRight: '16@ms'
  },
  wrapTag: {
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '170@s',
  },
  tagContainer: {
    margin: '3@ms',
    backgroundColor: color.palette.EEEEEE,
    borderRadius: '8@s',
    paddingHorizontal: '8@ms',
    paddingVertical: '4@s'
  },
  tagText:{
      fontSize: '8@ms'
  }
});
