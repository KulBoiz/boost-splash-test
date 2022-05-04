import moment from 'moment';
import React from 'react';
import { ScrollView } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import ResultItem from './result-item';

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
  return (
    <ScrollView style={styles.container}>
      {list.map((item, index) => (
        <ResultItem key={index} item={item}/>
      ))}
    </ScrollView>
  )
});

export default Result;

const styles = ScaledSheet.create({
  container: {
    paddingLeft: '16@s',
    paddingRight: '16@s',
    paddingBottom: '16@s',
  },

});
