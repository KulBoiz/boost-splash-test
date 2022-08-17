import React, { useEffect, useState } from "react"
import { View, Linking } from 'react-native';
import Modal from "react-native-modal"
import { AppText } from "./app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../theme"
import { fontFamily } from "../constants/font-family"
import firestore from "@react-native-firebase/firestore"
import { VERSION, PLAY_STORE, APP_STORE } from "@env"
import { isAndroid } from "../constants/variable"

interface Props{}

const UpdateVersion = React.memo((props: Props) => {
  const [visible, setVisible] = useState(false)
  const [version, setVersion] = useState<number>(0)

  firestore().collection('version').get().then(res => {
    res.forEach(document => {
      setVersion(document.data().value)
    })
  })

 useEffect(()=> {
   if (version !== 0 && VERSION < version) {
     setVisible(true)
   }
 }, [version])

  const openStore = () => {
    if (isAndroid){
      Linking.openURL(PLAY_STORE)
    }
    else {
      Linking.openURL(APP_STORE)
    }
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.body}>
        <AppText style={styles.title} fontSize={s(16)}>{'Thông báo'}</AppText>
        <View style={styles.wrapContent}>
          <AppText value={'Đã có phiên bản cập nhật mới, nhấn vào\n' +
            ' Cập nhật ngay để tiến hành cài đặt'} style={styles.content}/>
        </View>
        <AppText value={'Cài đặt ngay'} style={styles.title} fontSize={s(14)} color={color.primary} onPress={openStore}/>
      </View>
    </Modal>
  )
});

export default UpdateVersion;

const styles = ScaledSheet.create({
  container: {
  },
   body: {
     backgroundColor: color.background,
     borderRadius: '8@s'
   },
  wrapContent: {
    paddingVertical: '24@s',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: color.palette.BABABA
  },
  title: {
    marginVertical: '16@s',
    textAlign: "center",
    fontFamily: fontFamily.bold
  },
  content :{
    fontSize: '14@s',
    lineHeight: '19@s',
    textAlign: "center",
  }

});
