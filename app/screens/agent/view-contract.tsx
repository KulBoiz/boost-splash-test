import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";
import RenderHtml from 'react-native-render-html';
import { s, ScaledSheet } from "react-native-size-matters"
import AppHeader from "../../components/app-header/AppHeader";
import { fontFamily } from "../../constants/font-family";
import { width } from "../../constants/variable";
import { useStores } from "../../models";
import { CONTAINER_PADDING, MARGIN_BOTTOM_16 } from "../../styles/common-style";
import { color } from "../../theme";
import { CollaboratorContractInfoDesktop } from "./constants";
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"

interface Props{ }

const ViewContract = React.memo((props: Props) => {
  const {agentStore} = useStores()
  const [signature, setSignature] = useState<any>(null)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    agentStore.getDetailAgent().then((res) => {
      console.log('res', res?.data);

      setSignature(res?.data?.signature?.url)
      setUser(res?.data)

    })
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kí hợp đồng '} isBlue onLeftPress={()=> navigate(ScreenNames.SETTING)}/>
      <ScrollView style={[CONTAINER_PADDING, MARGIN_BOTTOM_16]}>
        <RenderHtml
          contentWidth={width}
          baseStyle={styles.htmlContainer}
          source={CollaboratorContractInfoDesktop({
            fullName: user?.fullName,
            idNumber: user?.idNumber,
            issuedOn: moment(user?.issuedOn).format('DD/MM/YYYY'),
            placeOfIssue: user?.identification?.placeOfIssue,
            address: user?.address + (user?.subDistrictName || '') + (user?.stateName || ''),
            email: user?.emails?.[0]?.email,
            tel: user?.tels?.[0]?.tel,
            bankAccount: user?.bankNumber,
            bankName: user?.banks?.[0]?.bankName,
          })}
        />

        <View style={{ width: '40%', position: 'absolute', bottom: 30, right: 50, alignItems: 'center' }}>
          <FastImage source={{uri: signature}} style={{width: 100, height: 100, top: 20}}/>
        </View>
        <View style={{height: 50}}/>
      </ScrollView>
    </View>
  )
});

export default ViewContract;

const styles = ScaledSheet.create({
  container: {flex:1, backgroundColor: color.palette.lightBlue},
  signature:{width:'105@s', height: '100@s', top: '5@s', backgroundColor: color.background},
  htmlContainer :{
    backgroundColor: color.background,
    padding: s(16),
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: s(8)
  },
  btnContainer :{
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  },
  sign: {
    flex: 1,
    marginBottom: '50@s',

  },
  backHome: {
    textTransform: "uppercase",
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold
  }
});
