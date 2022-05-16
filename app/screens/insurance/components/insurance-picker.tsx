import React from 'react';
import { Pressable, View } from "react-native"
import ItemView from "../../loan/components/item-view"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import ViewDetail from "../../../components/view-detail"
import { fontFamily } from "../../../constants/font-family"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"

interface Props{
  insuranceType: number
  setInsuranceType(e: any): void
}
interface ItemProps{
  id: number
  insuranceType: number
  setInsuranceType(e: number): void
}

const data = [0,1,2]

const RenderCheckbox = React.memo(({id, insuranceType} : {id: number, insuranceType: number}) => {
  return (
    <>
      {id === insuranceType ?
        <View style={[styles.circle, styles.select]}>
          <FastImage source={images.check} style={styles.iconCheck}/>
        </View>
       :
        <View style={[styles.circle,  styles.unselect]}/>
      }
    </>
  )
})

const Item = ({id, insuranceType, setInsuranceType}: ItemProps) => {
  const isSelect = id === insuranceType
  return(
    <Pressable style={[styles.itemContainer, isSelect && styles.selectContainer]} onPress={()=>setInsuranceType(id)}>
      <ItemView title={'Gói vàng'} content={<RenderCheckbox {...{id, insuranceType}}/>} titleStyle={styles.title}/>
      <AppText value={'20.000.000vnđ / người'}/>
      <ViewDetail style={styles.viewDetail} onPress={()=> navigate(ScreenNames.INSURANCE_PACKAGE)}/>
    </Pressable>
  )
}

const InsurancePicker = React.memo((props: Props) => {
  const {insuranceType, setInsuranceType} = props
  return (
    <View style={styles.container}>
      <AppText value={'Chọn gói bảo hiểm'} style={styles.header}/>
      {data.map((_,id)=> (
        <Item key={id.toString()} id={id} insuranceType={insuranceType} setInsuranceType={setInsuranceType}/>
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
  selectContainer: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.palette.lightBlue
  },
  viewDetail: {
    flex:1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  circle: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    alignItems: "center",
    justifyContent: "center"
  },
  select :{
    backgroundColor: color.palette.blue,
  },
  unselect: {
    backgroundColor: color.background,
    borderWidth: 1,
  },
  iconCheck: {
    width: '9@s',
    height: '6@s'
  }
});
