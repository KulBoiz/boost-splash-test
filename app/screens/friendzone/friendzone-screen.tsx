import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ms, ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import Contacts, { Contact } from "react-native-contacts"
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions"
import { isAndroid } from "../../constants/variable"
import FriendZoneItem from "./components/friendzone-item"
import { filter, sortBy } from "lodash"
import SearchBar from "../../components/search-bar"
interface Props {
}

const FriendZoneScreen = React.memo((props: Props) => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchContacts, setSearchContacts] = useState<any[]>([])

  const getContacts = useCallback(() => {
    Contacts.getAll()
      .then((data) => {
        const filterData = filter(data, e => e.phoneNumbers.length > 0)
        setContacts(filterData)
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

  const renderItem = useCallback(({ item }) => {
    return <FriendZoneItem item={item} />
  }, [])

  const onChangeSearchText = (value) => {
    if (!value.length){
      setSearchContacts([])
      return
    }
    Contacts.getContactsMatchingString(value).then(res=> {
      setSearchContacts(res)
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Bạn bè"} backgroundImage={images.friendzone_header} />
      <FastImage source={images.friendzone_background} style={styles.image}>
        <AppText value={"Chia sẻ với bạn bè\ncùng FINA"} fontFamily={fontFamily.semiBold}
                 fontSize={ms(20)} color={color.text} />
      </FastImage>
      <SearchBar onChangeSearchText={onChangeSearchText}/>
      <FlatList
        data={searchContacts.length ? sortBy(searchContacts, ['givenName']) : sortBy(contacts, ['givenName'])}
        renderItem={renderItem}
        keyExtractor={(_, id) => id.toString()}
        contentContainerStyle={styles.flatList}
      />
    </View>
  )
})

export default FriendZoneScreen

const styles = ScaledSheet.create({
  container: {
    flex:1,
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
  flatList:{
    paddingHorizontal: '16@s'
  }
})
