import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters'
import { DoubleCheckSvg } from "../../assets/svgs"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import { LoadingComponent } from "../../components/loading"
import { useStores } from "../../models"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { CENTER_ELEMENTS, PARENT, ROW } from "../../styles/common-style"
import { color } from "../../theme"
import NoticeItem, { STATUS } from "./components/NoticeItem"

const MENU = [
  { value: '', label: 'Tất cả' },
  { value: STATUS.UNREAD, label: 'Chưa xem' },
  { value: STATUS.READ, label: 'Đã xem' },
]

interface Props { }

const KEY_NOTIFICATION = {
  // YCTV
  CREATE_YCTV: 'YCTV', // tạo yctv
  ASSIGNEE_YCTV: 'YCTV', // gán yctv
  // HỒ SƠ VAY
  CREATE_DEAL: 'DEAL', // tạo hồ sơ vay
  SHARE_DEAL_WITH_BANK: 'DEAL', // HỒ SƠ VAY SHARE CHO NGÂN HÀNG
  DEAL_STEP_WARNING_MESSAGE_EXPIRATION_NEAR: 'DEAL', // THỜI GIAN DUYỆT HỒ SƠ XẮP HẾT HẠN
  DEAL_STEP_WARNING_MESSAGE_EXPIRED: 'DEAL',
  ASSIGNEE_DEAL_WITH_STAFF_BANK: 'DEAL',
  // HỒ SƠ VAY NGÂN HÀNG
  CHANGE_STATUS_DEAL_WITH_BANK: 'DEAL_DETAIL', // đổi trạng thái hồ sơ ngân hàng
  DISBURSED_NOTICE: 'DEAL_DETAIL', // rải ngân thành công
  // CTV
  VIEW_CONTACT_COLLABORATOR: 'CTV',  // Hợp đồng cộng tác viên
  SEND_COLLABORATOR: 'CTV', // Gửi họp đồng cho CTV => profile
  // BẢO HIỂM
  INSURANCE_SEND_INFO_CREATE: 'INSURANCE', // "Xác nhận thông tin bảo hiểm"
  INSURANCE_PAYMENT_SUCCESS: 'INSURANCE', //  Bảo hiểm của bạn đã được thanh toán thành công => giao dịch bảo hiểm
  SEND_PROOF_INSURANCES: 'INSURANCE', // chứng nhận bảo hiểm => giao dịch
  // ACCOUNT
  ACTIVE_ACCOUNT: 'ACCOUNT',  // TẠO TÀI KHOẢN THÀNH CÔNG
  ACTIVE_ACCOUNT_REGISTER: 'ACCOUNT', // đăng kí mở tài khoản thành công
  ACTIVE_ACCOUNT_PARNER: 'ACCOUNT', // Chào mừng bạn đến với Hệ thống thông tin FINA
}

const NoticeScreen = observer((props: Props) => {
  // @ts-ignore
  const { notificationModel, authStoreModel, loanStore } = useStores()
  const { dataSources } = notificationModel
  const [menuActive, setMenuActive] = useState('')
  const [loadMore, setLoadMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchList();
  }, [])

  const fetchList = () => {
    setLoading(true)
    const userId = authStoreModel?.userId
    const filters = {
      order: ['createdAt DESC'],
      where: {
        userId: userId,
        status: menuActive || undefined,
      }
    }
    notificationModel.getListNotifications(filters, userId).then(() => {
      setLoading(false)
    });
  }

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
          onPress={() => {
            setMenuActive(STATUS.UNREAD)
            onReadAll()
          }}
        />
        <AppText value={`(${filterNotiUnRead()}) ${filterNotiUnRead() > 9 ? "+" : ''}`} color={color.palette.orange} />
      </View>
    )
  }
  const renderItem = ({ item }) => {
    const checkUrl = () => {
      const key = KEY_NOTIFICATION[item?.code]
      if (!key) return false

      if (key === 'YCTV') {
        return true
      }

      return false
    }

    const nextDetail = () => {
      const key = KEY_NOTIFICATION[item?.code]
      if (!key) return ''

      if (key === 'YCTV') {
        navigate(ScreenNames.PROFILE_DETAIL)
        const documentId = item.url.split('documentId=')[1]
        loanStore.getLoanDetail(documentId).then(() => {
          navigate(ScreenNames.PROFILE_DETAIL)
        })
      }

      if (key === "CTV") {
        navigate(ScreenNames.SETTING)
      }

      if (key === "ACCOUNT") {
        navigate(ScreenNames.HOME)
      }
    }

    return (
      <NoticeItem item={item} nextDetail={nextDetail} checkUrl={checkUrl} />
    )
  }

  return (
    <View style={PARENT}>
      <AppHeader width={{ width: s(90) }} style={styles.header} titleStyle={{ fontSize: s(14) }} headerTx={"header.notice"} renderRightIcon={_renderRight()} />

      <View style={styles.header_filter}>
        {
          MENU.map((el, index) =>
            <TouchableOpacity key={index} onPress={() => {
              setMenuActive(el.value)
              fetchList()
            }}>
              <View style={menuActive !== el.value ? styles.text : styles.active} key={index}>
                <AppText
                  style={menuActive !== el.value ? styles.text : styles.active}
                  value={el.label}
                />
              </View>
            </TouchableOpacity>)
        }
      </View>
      {
        loading ? <LoadingComponent /> :
          <FlatList
            style={{ paddingHorizontal: 20, paddingTop: 10 }}
            keyExtractor={(e, i) => i.toString()}
            data={dataSources}
            renderItem={renderItem}
            onEndReached={() => {
              notificationModel.loadMoreNotifications()
              setLoadMore(false)
            }}
            onEndReachedThreshold={0.2}
            onScrollBeginDrag={() => {
              setLoadMore(false)
            }}
          />
      }
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


