import React, { useEffect } from "react"
import { Linking, View } from "react-native"
import QRCode from "react-native-qrcode-svg"
import { s, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import { getFullName } from "../../../constants/variable"
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { observer } from "mobx-react-lite"

interface Props {
}

const Vcf = observer((props: Props) => {
  const { authStoreModel } = useStores()
  useEffect(() => {
    authStoreModel.getVcf()
  }, [authStoreModel?.user])

  const vcf = authStoreModel?.vcf
  const result = vcf.replace(/X-SOCIALPROFILE;CHARSET=UTF-8;/g, `X-SOCIALPROFILE;${getFullName(authStoreModel?.user)}`)
  const url = "data:text/x-vcard;charset=utf-8," + encodeURIComponent(result)

  const handleDownload = async () => {
    await MediaLibrary.requestPermissionsAsync()
    const fileUri = FileSystem.documentDirectory + "contact.vcf";
    await FileSystem.writeAsStringAsync(fileUri, url, { encoding: FileSystem.EncodingType.UTF8 });
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    await MediaLibrary.createAlbumAsync("Contact", asset, false)
      .then((e) => {
        console.log('Finished downloading to ', e, FileSystem.documentDirectory);
      })
      .catch(error => {
        console.error(error);
      });
  }

  if (!vcf) return <></>

  return (
    <View style={styles.container}>
      <QRCode
        value={vcf}
        size={s(200)}
      />
      {/* <AppButton title={"Tải xuống danh thiếp"} onPress={handleDownload} containerStyle={styles.btn} /> */}
    </View>
  )
})

export default Vcf

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: "24@s",
  },
  btn: {
    marginTop: "24@s",
    width: "90%",
  },
})
