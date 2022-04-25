import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { HIT_SLOP, ROW } from "../../../styles/common-style"
import moment from "moment"
import { ThreeDotSvg } from "../../../assets/svgs"
import NoticeModal from "./NoticeModal"

interface Props{
  item: any
}

const NoticeItem = React.memo(({ item }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <View style={[styles.container, {backgroundColor: item?.isRead ? color.background : color.palette.lightBlue}]}>
      <View style={styles.headerContainer}>
        <View style={[ROW, styles.headerElement]}>
          <AppText value={item?.title} style={styles.textHeader}/>
          {!item?.isRead && <View style={styles.circle}/>}
        </View>
        <View style={[ROW, styles.headerElement]}>
          <AppText value={moment(item?.time).fromNow()} style={styles.textHeader}/>
          <TouchableOpacity onPress={()=> setVisible(true)} hitSlop={HIT_SLOP}>
            <ThreeDotSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <AppText value={item?.content}/>
      </View>
      <NoticeModal visible={visible} close={()=> setVisible(false)}/>

    </View>
  )
});

export default NoticeItem;
NoticeItem.displayName = 'NoticeItem'

const styles = ScaledSheet.create({
    container: {
      padding: '16@s',
      marginBottom: '16@s',
      borderRadius: '8@s',
      backgroundColor: color.palette.lightBlue,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
  headerElement:{
    alignItems: 'center'
  },
  headerContainer:{
      flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.line,
    paddingBottom: '10@s',
  },
  textHeader: {
    marginRight: '5@s'
  },
  contentContainer: {
      paddingTop: '10@s'
  },
  circle: {
    width: '8@s',
    height: '8@s',
    borderRadius: '4@s',
    backgroundColor: color.palette.blue
  }
});
