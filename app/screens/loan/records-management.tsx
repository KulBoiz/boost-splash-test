import React, { useCallback, useState } from "react"
import { View, StyleSheet, FlatList, Pressable } from "react-native"
import FinanceFilter from "./components/finance-filter"
import { PROFILE_MANAGEMENT_FILTER } from "./constants"
import { color } from "../../theme"
import ShortStatus from "./components/short-status"
import { ScaledSheet } from "react-native-size-matters"
import FastImage from "react-native-fast-image"
import ItemView from "./components/item-view"
import { PhoneSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { CENTER_ELEMENTS, ROW, SPACE_BETWEEN } from "../../styles/common-style"

interface Props{}
const avatar = 'https://images.pexels.com/photos/9821104/pexels-photo-9821104.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
const RecordsManagement = React.memo((props: Props) => {
  const [select, setSelect] = useState<number>(0)
const renderItem = useCallback(({item}) => {
    return <ShortStatus />
},[])

  const renderContent = () => {
    return(
      <Pressable>
        <PhoneSvg />
      </Pressable>
    )
  }
  return (
    <View style={styles.container}>
      <FinanceFilter currentSelected={select} setCurrentSelected={setSelect} filterData={PROFILE_MANAGEMENT_FILTER}/>
      <View style={[ROW, SPACE_BETWEEN]}>
        <FastImage source={{uri: avatar}} style={styles.avatar}/>
        <View style={{flex: 1, marginLeft: 16}}>
        <ItemView title={'nguyễn thị thanh tâm'} titleStyle={styles.title} content={renderContent()} />
        <AppText value={'chuyên viên tư vấn FINA'} style={styles.role}/>
          <AppText value={'chuyển thông tin sang ngân hàng'}/>
          <View style={ROW}>
            <AppText value={'19/04/2022'}/>
            <AppText value={'13:16'}/>
          </View>
        </View>
      </View>
      <FlatList data={[0,1,2]} renderItem={renderItem} style={styles.flatList} />
    </View>
  )
});

export default RecordsManagement;

const styles = ScaledSheet.create({
    container: {
      backgroundColor: color.palette.white,
      flex: 1,
    },
  flatList: {
      paddingHorizontal: '16@ms'
  },
  avatar: {
      width: '48@s',
    height: '48@s',
    borderRadius: '24@s'
  },
  title:{
      fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    color: color.palette.blue
  },
  role: {
      fontSize: '12@s',
    color: color.palette.lightGray,
    fontFamily: fontFamily.light
  }
});
