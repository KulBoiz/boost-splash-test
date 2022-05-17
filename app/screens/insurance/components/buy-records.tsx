import React, { useCallback } from "react"
import { View, FlatList } from "react-native"
import SearchBar from "../../../components/search-bar"
import { AppText } from "../../../components/app-text/AppText"
import { FONT_MEDIUM_12, MARGIN_BOTTOM_16, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import ItemView from "../../loan/components/item-view"
import moment from "moment"

interface Props{}

const renderTime = () => {
  return(
    <View style={ROW}>
      <AppText value={moment(new Date).format('DD/MM/YYYY')}/>
      <AppText value={'   |   '} color={color.palette.deepGray}/>
      <AppText value={moment(new Date).format('HH:MM:SS')}/>
    </View>
  )
}
const BuyRecords = React.memo((props: Props) => {
  const renderItem = useCallback(() => {
    return (
      <View style={styles.wrapItem}>
        <AppText value={'Nguyễn Đức Lâm - ****765'} style={MARGIN_BOTTOM_16}/>
        <ItemView title={'Trạng thái:'} content={'Đang thẩm định'}  contentStyle={[styles.content]} style={MARGIN_BOTTOM_16}/>
        <ItemView title={'Cập nhật:'} content={renderTime()} contentStyle={[styles.content]}/>
      </View>
    )
  },[])
  return (
    <View style={styles.container}>
      <SearchBar onPress={()=>{}}/>
      <AppText style={[FONT_MEDIUM_12, styles.recordText]}>
        Có tất cả
        <AppText value={' 1 '} color={color.palette.blue}/>
        hồ sơ
      </AppText>
      <FlatList keyExtractor={(_,i) => i.toString() } data={[0]} renderItem={renderItem}/>
    </View>
  )
});

export default BuyRecords;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
      paddingHorizontal: '16@ms',
      paddingVertical: '24@s'
    },
  wrapItem:{
    backgroundColor: color.background,
    borderRadius: '8@s',
    padding: '16@ms'
  },
  content: {
    width: '60%',
    color: color.palette.orange
  },
  recordText: {
      marginTop: '24@s',
    marginBottom: '16@s'
  }
});
