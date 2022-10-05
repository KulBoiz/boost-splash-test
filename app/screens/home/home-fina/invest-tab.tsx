import React, { useCallback, useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import InvestItemContainer from "./components/invest-item-container"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { MARGIN_BOTTOM_16 } from "../../../styles/common-style"

interface Props{}

const InvestTab = React.memo((props: Props) => {
  const {investStore} = useStores()
  const [bonds, setBonds] = useState([])
  const [funds, setFunds] = useState([])

  useEffect(()=> {
    investStore.getOutstandingBonds().then(res=> setBonds(res))
    investStore.getOutstandingFund().then(res=> setFunds(res))
  },[])

  const listBonds = useCallback(()=> {
    navigate(ScreenNames.MARKET_LIST)
  },[])

  const listFund = useCallback(()=> {
    navigate(ScreenNames.MARKET_LIST)
  },[])

  return (
    <View style={styles.container}>
      <InvestItemContainer label={'Trái phiếu nổi bật'} data={bonds} onPress={listBonds} style={MARGIN_BOTTOM_16}/>
      <InvestItemContainer label={'CCQ nổi bật'} data={funds} type={'fund'} onPress={listFund}/>
    </View>
  )
});

export default InvestTab;

const styles = StyleSheet.create({
    container: {},
});
