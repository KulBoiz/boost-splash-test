import { filter, sortBy } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import Contacts, { Contact } from "react-native-contacts"
import FastImage from "react-native-fast-image"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { ms, ScaledSheet } from "react-native-size-matters"
import { images } from "../../assets/images"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import SearchBar from "../../components/search-bar"
import { fontFamily } from "../../constants/font-family"
import { isAndroid } from "../../constants/variable"
import { useStores } from "../../models"
import { color } from "../../theme"
import FriendZoneItem from "./components/friendzone-item"

interface Props {
}

const TABS = {
  ALL: 'all',
  FRIEND: 'friend',
  FINA: 'userFina'
}

const FriendZoneScreen = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [usersFina, setUsersFina] = useState([])

  // const [searchContacts, setSearchContacts] = useState<any[]>([])
  const [tab, setTab] = useState(TABS.ALL)

  const getContacts = useCallback(() => {
    Contacts.getAll()
      .then((data) => {
        const filterData = filter(data, e => e.phoneNumbers.length > 0)
        setContacts(filterData)
        formatUsers(filterData || [])
      })
  }, [])

  useEffect(() => {
    (async () => {
      const checkCamera = await check(
        isAndroid ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS,
      )
      if (checkCamera === RESULTS.GRANTED) {
        getContacts()
      } else {
        await request(
          isAndroid ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS,
        ).then(getContacts)
      }
    })()
  }, [])

  const formatUsers = (filterData: any) => {
    const users = filterData?.map(el => ({
      ...el,
      email: el?.emailAddresses?.[0]?.email,
      phone: el?.phoneNumbers?.[0]?.number,
    }))

    authStoreModel.verifyContactUser(users).then(res => {
      if (res?.data?.data) {
        setUsersFina(res?.data?.data?.userFina || [])
        setContacts(res?.data?.data?.userNoFina || [])
      }
    })
  }

  const isFina = (item) => {
    return !!usersFina?.find((el: any) => el?.recordID === item.recordID)
  }

  const renderItem = useCallback(({ item }) => {
    return <FriendZoneItem item={item} isFina={isFina(item)} />
  }, [])

  const onChangeSearchText = (value) => {
    if (!value.length) {
      getContacts()
      return
    }
    Contacts.getContactsMatchingString(value).then(res => {
      formatUsers(res)
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Bạn bè"} backgroundImage={images.friendzone_header} />
      <FastImage source={images.friendzone_background} style={styles.image}>
        <AppText value={"Chia sẻ với bạn bè\ncùng FINA"} fontFamily={fontFamily.semiBold}
          fontSize={ms(20)} color={color.text} />
      </FastImage>
      <SearchBar onChangeSearchText={onChangeSearchText} />

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab(TABS.ALL)} style={[styles.tab, TABS.ALL === tab ? styles.tabActive : {}]}>
          <AppText value={"Tất cả"} fontFamily={fontFamily.semiBold} fontSize={ms(12)}/>
        </Pressable>

        <Pressable onPress={() => setTab(TABS.FINA)} style={[styles.tab, TABS.FINA === tab ? styles.tabActive : {}]}>
          <AppText value={"FINA"} fontFamily={fontFamily.semiBold} fontSize={ms(12)} />
        </Pressable>

        <Pressable onPress={() => setTab(TABS.FRIEND)} style={[styles.tab, TABS.FRIEND === tab ? styles.tabActive : {}]}>
          <AppText value={"Đã giới thiệu"} fontFamily={fontFamily.semiBold} fontSize={ms(12)} />
        </Pressable>
      </View>
      {
        tab === TABS.ALL &&
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(_, id) => id.toString()}
          contentContainerStyle={styles.flatList}
        />
      }
      {
        tab === TABS.FINA &&
        <FlatList
          data={usersFina}
          renderItem={renderItem}
          keyExtractor={(_, id) => id.toString()}
          contentContainerStyle={styles.flatList}
        />
      }

    </View>
  )
})

export default FriendZoneScreen

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  image: {
    marginTop: "16@s",
    height: "100@s",
    marginHorizontal: "16@s",
    borderRadius: "8@s",
    backgroundColor: "#2135A5",
    justifyContent: "center",
    paddingLeft: "30@ms",
  },
  flatList: {
    paddingHorizontal: '16@s'
  },
  tabs: {
    flexDirection: 'row',
    paddingLeft: '10@s',
    marginTop: '10@s',
    marginBottom: '10@s',
    borderBottomWidth: 1,
    borderBottomColor: '#D4D7D9'
  },
  tab: {
    paddingLeft: '15@s',
    paddingRight: '15@s',
    // width: '50@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '5@s',
  },
  tabActive: {
    borderBottomColor: color.blue.blue_02,
    borderBottomWidth: 1,
  }
})
