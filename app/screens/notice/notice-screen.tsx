import React, { useEffect, useState } from "react"
import { View, StyleSheet, FlatList, Button, TouchableOpacity } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import { color } from "../../theme"
import { CENTER_ELEMENTS, PARENT, ROW } from "../../styles/common-style"
import { DoubleCheckSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { s, ScaledSheet } from 'react-native-size-matters';
import NoticeItem, { STATUS } from "./components/NoticeItem"
import { useStores } from "../../models"
import { observer } from "mobx-react-lite"
const MENU = [
  'Tất cả',
  // 'ưu đãi',
  'Giao dịch',
  // 'Cập nhập',
  'Thông báo'
]
interface Props { }

const NoticeScreen = observer((props: Props) => {
  const { notificationModel, authStoreModel } = useStores()
  const { dataSources } = notificationModel
  const [menuActive, setMenuActive] = useState(0)

  console.log(1,notificationModel.dataSources);

  useEffect(() => {
    const userId = authStoreModel?.userId
    const filters = {
      order: ['createdAt DESC'],
      where: {
        userId: userId
      }
    }
    notificationModel.getListNotifications(filters, userId);
  }, [])

  const filterNotiUnRead = () => {
    if (dataSources && dataSources?.length > 0) {
      return dataSources?.filter((el: any) => el?.status === STATUS.UNREAD).length
    }

    return 0
  }

  const onReadAll = () => {
    const data = dataSources?.map((el: any) => ({ ...el, status: STATUS.READ }))
    notificationModel.readAllNotifications()
    notificationModel.setDataSource(data)
  }

  const _renderRight = () => {
    return (
      <View style={[ROW, CENTER_ELEMENTS]}>
        <DoubleCheckSvg />
        <AppText
          tx={"notice.readAll"}
          fontSize={s(10)}
          color={color.palette.blue}
          onPress={() => { onReadAll() }}
        />
        <AppText value={`(${filterNotiUnRead()})`} color={color.palette.orange} />
      </View>
    )
  }
  const renderItem = ({ item }) => {
    return (
      <NoticeItem item={item} />
    )
  }
  return (
    <View style={PARENT}>
      <AppHeader width={{ width: s(90) }} style={styles.header} titleStyle={{ fontSize: s(14) }} headerTx={"header.notice"} renderRightIcon={_renderRight()} />

      <View style={styles.header_filter}>
        {
          MENU.map((el, index) =>
            <TouchableOpacity key={index} onPress={() => { setMenuActive(index) }}>
              <View style={menuActive !== index ? styles.text : styles.active} key={index}>
                <AppText
                  style={menuActive !== index ? styles.text : styles.active}
                  value={el}
                />
              </View>
            </TouchableOpacity>)
        }
      </View>

      <FlatList
        style={{ paddingHorizontal: 20, paddingTop: 10 }}
        keyExtractor={(e, i) => i.toString()}
        data={dataSources}
        renderItem={renderItem}
      />
    </View>
  )
});

export default NoticeScreen;

const styles = ScaledSheet.create({
  header: {
    backgroundColor: color.palette.lightBlue
  },
  header_filter: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingTop: '10@s',
    paddingBottom: '10@s',
    marginLeft: '16@s',
    marginRight: '16@s'
  },
  text: {
    backgroundColor: color.palette.lightBlue,
    borderRadius: '10@s',
    color: color.palette.deepGray,
    fontSize: '14@s',
    padding: "4@s",
    marginRight: '4@s'
  },
  active: {
    backgroundColor: color.palette.blue,
    borderRadius: '10@s',
    color: color.palette.white,
    fontSize: '14@s',
    padding: "4@s",
    marginRight: '4@s'
  }
});


