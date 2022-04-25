import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import { color } from "../../theme"
import { CENTER_ELEMENTS, PARENT, ROW } from "../../styles/common-style"
import { DoubleCheckSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { s } from 'react-native-size-matters';
import NoticeItem from "./components/NoticeItem"

interface Props{}

const DATA = [
  {
    title: 'Lắc lì xì',
    time: new Date,
    isRead: false,
    content: 'chơi máy quay thưởng có tiền mặt\n' +
      'giờ vàng lắc thần tài'
  },{
    title: 'Lắc lì xì',
    time: new Date,
    isRead: true,
    content: 'chơi máy quay thưởng có tiền mặt\n' +
      'giờ vàng lắc thần tài'
  },
]
const NoticeScreen = React.memo((props: Props) => {
  const _renderRight = () => {
    return(
      <View style={[ROW, CENTER_ELEMENTS]}>
        <DoubleCheckSvg />
        <AppText tx={"notice.readAll"} fontSize={s(10)} color={color.palette.blue}/>
        <AppText value={' (99)'} color={color.palette.orange}/>
      </View>
    )
  }
  const renderItem = ({item})=> {
    return(
      <NoticeItem item={item} />
    )
  }
  return (
    <View style={PARENT}>
      <AppHeader width={{width: s(90)}} style={styles.header} titleStyle={{fontSize: s(14)}} headerTx={"header.notice"} renderRightIcon={_renderRight()}/>
      <FlatList style={{paddingHorizontal: 20 }} keyExtractor={(e, i)=> i.toString()} data={DATA} renderItem={renderItem} />
    </View>
  )
});

export default NoticeScreen;

NoticeScreen.displayName = 'NoticeScreen'

const styles = StyleSheet.create({
  header:{
      backgroundColor: color.palette.lightBlue
  }

});


