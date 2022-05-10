import moment from 'moment';
import React, { useCallback } from "react"
import { FlatList, ScrollView } from "react-native"
import { ScaledSheet } from "react-native-size-matters";
import ResultItem from './result-item';
import { useStores } from "../../../models"

interface Props {
}

const list = [{
  bank: 'ACB',
  status: 'đang rải ngân',
  createdAt: moment()
},
{
  bank: 'ACB',
  status: 'đang xử lý',
  createdAt: moment()
},
{
  bank: 'ACB',
  status: 'Từ chối hồ sơ',
  note: 'Khách hàng có nợ xấu ở nhiều ngân hàng',
  createdAt: moment()
}]

const Result = React.memo((props: Props) => {
  const {loanStore} = useStores()
  const data = loanStore?.loanDetail?.dealDetails
  const renderItem = useCallback(({item})=> {
    return  <ResultItem item={item}/>
  },[])
  return (
    <FlatList
      keyExtractor={item => item.code}
      data={data} renderItem={renderItem}
      style={styles.container}
    />
  )
});

export default Result;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@ms',
    paddingBottom: '16@s',
  },

});
