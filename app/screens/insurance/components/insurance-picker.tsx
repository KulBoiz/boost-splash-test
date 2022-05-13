import React from 'react';
import { View } from 'react-native';
import ItemView from "../../loan/components/item-view"
import BouncyCheckbox from "react-native-bouncy-checkbox"
import { color } from "../../../theme"
import { ScaledSheet, ms } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import ViewDetail from "../../../components/view-detail"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"

interface Props{}

const data = [0,1,2]

const renderCheckbox = () => {
  return (
    <BouncyCheckbox
      size={20}
      fillColor={color.palette.blue}
      unfillColor="#FFFFFF"
      iconStyle={{ borderColor: color.palette.black }}
      onPress={(isChecked: boolean) => {}}
      style={{marginRight: ms(-15)}}
    />
  )
}
const Item = () => {
  return(
    <View style={styles.itemContainer}>
      <ItemView title={'Gói vàng'} content={renderCheckbox()} titleStyle={styles.title}/>
      <AppText value={'20.000.000vnđ / người'}/>
      <ViewDetail style={styles.viewDetail} onPress={()=> navigate(ScreenNames.INSURANCE_PACKAGE)}/>
    </View>
  )
}

const InsurancePicker = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'Chọn gói bảo hiểm'} style={styles.header}/>
      {data.map((_,id)=> (
        <Item key={id.toString()}/>
      ))}
    </View>
  )
});

export default InsurancePicker;

const styles = ScaledSheet.create({
  container: {
    marginTop: '24@s',
    paddingHorizontal: '16@ms',
    paddingVertical: '24@ms',
    backgroundColor: color.background
  },
  header:{
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    marginBottom: '8@s'
  },
  title: {
    fontSize: '16@ms',
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  },
  itemContainer: {
    marginTop: '16@s',
    borderRadius: '8@s',
    padding: '16@ms',
    height: '170@ms',
    backgroundColor: color.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  viewDetail: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
});
