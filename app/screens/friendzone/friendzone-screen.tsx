import { filter, sortBy } from "lodash"
import React, { useCallback, useEffect, useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import Contacts, { Contact } from "react-native-contacts"
import FastImage from "react-native-fast-image"
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { images } from "../../assets/images"
import AppHeader from "../../components/app-header/AppHeader"
import { AppText } from "../../components/app-text/AppText"
import SearchBar from "../../components/search-bar"
import { fontFamily } from "../../constants/font-family"
import { isAndroid } from "../../constants/variable"
import { useStores } from "../../models"
import { color } from "../../theme"
import FriendZoneItem from "./components/friendzone-item"
import AppViewNoAuth from "../../components/app-view-no-auth"

interface Props {
}

const TABS = {
  ALL: "all",
  FRIEND: "friend",
  FINA: "userFina",
}

const FriendZoneScreen = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [usersFina, setUsersFina] = useState<Contact[]>([])

  // const [searchContacts, setSearchContacts] = useState<any[]>([])
  const [tab, setTab] = useState(TABS.ALL)

  const getContacts = useCallback(() => {
    Contacts.getAll()
      .then((data) => {
        console.log(data)
        const filterData = filter(data, e => e.phoneNumbers.length > 0)
        setContacts(sortBy(filterData, "givenName"))
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

  const formatUsers = useCallback((filterData: any) => {
    const users = filterData?.map(el => ({
      ...el,
      // recordID: el?.recordID,
      givenName: el?.givenName ? el?.givenName?.trimLeft() : "",
      familyName: el?.familyName ? el?.familyName?.trimLeft() : "",
      phone: el?.phoneNumbers?.[0]?.number?.replace(/- /g, ""),
    }))

    authStoreModel.verifyContactUser(users).then(res => {
      if (res?.data?.data) {
        setUsersFina(sortBy(res?.data?.data?.userFina, "givenName")  || [])
        setContacts(sortBy(res?.data?.data?.userNoFina, "givenName") || [])
      }
    })
  },[])

  const isFina = (item) => {
    return !!usersFina?.find((el: any) => el?.recordID === item.recordID)
  }

  const renderItem = useCallback(({ item }) => {
    return <FriendZoneItem item={item} isFina={isFina(item)} />
  }, [usersFina])

  const onChangeSearchText = useCallback((value) => {
    if (!value.length) {
      getContacts()
    } else {
      Contacts.getContactsMatchingString(value).then(res => {
        console.log('res search', res)
        formatUsers(res)
      })
    }
    // Contacts.getContactsMatchingString(value).then(res => {
    //   console.log('res search', res)
    //   formatUsers(res)
    // })
  },[])

  if (!authStoreModel?.isLoggedIn) {
    return (
      <>
        <AppHeader headerText={"Bạn bè"} backgroundImage={images.friendzone_header} />
        <AppViewNoAuth />
      </>
    )
  }
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Bạn bè"} backgroundImage={images.friendzone_header} />
      <FastImage source={images.friendzone_background} style={styles.image}>
        <AppText value={"Chia sẻ với bạn bè\ncùng FINA"} fontFamily={fontFamily.semiBold}
                 fontSize={ms(20)} color={color.text} />
      </FastImage>

      <View style={styles.tabs}>
        <Pressable onPress={() => setTab(TABS.ALL)} style={[styles.tab, TABS.ALL === tab ? styles.tabActive : {}]}>
          <AppText value={"Danh bạ"} fontFamily={fontFamily.semiBold} fontSize={ms(12)} />
        </Pressable>

        <Pressable onPress={() => setTab(TABS.FINA)} style={[styles.tab, TABS.FINA === tab ? styles.tabActive : {}]}>
          <AppText value={"Bạn bè FINA"} fontFamily={fontFamily.semiBold} fontSize={ms(12)} />
        </Pressable>

        {/* <Pressable onPress={() => setTab(TABS.FRIEND)} style={[styles.tab, TABS.FRIEND === tab ? styles.tabActive : {}]}> */}
        {/*  <AppText value={"Đã giới thiệu"} fontFamily={fontFamily.semiBold} fontSize={ms(12)} /> */}
        {/* </Pressable> */}
      </View>
      <SearchBar onChangeSearchText={onChangeSearchText} style={{ marginTop: s(-10) }} />

      {
        tab === TABS.ALL &&
        <>
          <AppText value={`Bạn bè chưa tham gia FINA (${contacts.length})`} style={styles.label} />
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={(_, id) => id.toString()}
            contentContainerStyle={styles.flatList}
          />
        </>
      }
      {
        tab === TABS.FINA &&
        <>
          <AppText value={`Danh sách bạn bè đã mời (${usersFina.length})`} style={styles.label} />

          <FlatList
            data={usersFina}
            renderItem={renderItem}
            keyExtractor={(_, id) => id.toString()}
            contentContainerStyle={styles.flatList}
          />
        </>
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
  label: {
    fontSize: '15@ms',
    paddingLeft: '16@s',
    color: color.textColor.title
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
    paddingHorizontal: "16@s",
    paddingBottom: "30@s",
  },
  tabs: {
    flexDirection: "row",
    paddingLeft: "10@s",
    marginTop: "16@s",
    // marginBottom: '10@s',
    borderBottomWidth: 1,
    borderBottomColor: "#D4D7D9",
  },
  tab: {
    paddingLeft: "15@s",
    paddingRight: "15@s",
    // width: '50@s',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "5@s",
  },
  tabActive: {
    borderBottomColor: color.blue.blue_02,
    borderBottomWidth: 1,
  },
})
