import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import FastImage from "react-native-fast-image";
import RenderHtml from 'react-native-render-html';
import { ScaledSheet } from "react-native-size-matters";
import AppHeader from "../../components/app-header/AppHeader";
import { fontFamily } from "../../constants/font-family";
import { width } from "../../constants/variable";
import { useStores } from "../../models";
import { CONTAINER_PADDING } from "../../styles/common-style";
import { color } from "../../theme";
import { CollaboratorContractInfoDesktop } from "./constants";

interface Props{ }

const ViewContract = React.memo((props: Props) => {
  const {agentStore} = useStores()
  const [signature, setSignature] = useState<any>(null)

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Kí hợp đồng '} isBlue/>
      <ScrollView style={CONTAINER_PADDING}>
        <RenderHtml
          contentWidth={width}
          baseStyle={{backgroundColor: color.background}}
          source={CollaboratorContractInfoDesktop({
            fullName: agentStore.fullName,
            idNumber: agentStore.citizenIdentification,
            issuedOn: moment(agentStore.dateRange).format('DD/MM/YYYY'),
            placeOfIssue: agentStore.issuedBy,
            address: agentStore.address,
            email: agentStore.email,
            tel: agentStore.phone,
            bankAccount: agentStore.bankNumber,
            bankName: agentStore.bankName,
          })}
        />
        
        <View style={{ width: '40%', position: 'absolute', bottom: 30, right: 50, alignItems: 'center' }}>
          <FastImage source={{uri: `data:image/png;base64,${signature}`}} style={{width: 100, height: 100, top: 20}}/>
        </View>
        <View style={{height: 50}}/>
      </ScrollView>
    </View>
  )
});

export default ViewContract;

const styles = ScaledSheet.create({
  container: {flex:1, backgroundColor: color.background},
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
