import React from 'react';
import { ScrollView, View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText";
import { color } from "../../../theme";
import ItemView from '../../loan/components/item-view';
import Document from './document';
import Note from './note';

interface Props {
}

const Info = React.memo((props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title} value={"Khách hàng"} />
        <View style={styles.contentItem}>
          <ItemView style={styles.item} title={"loan.infoLoan.profile.fullName"} content={'Nguyễn Thị Thanh Tâm'} />
          <ItemView style={styles.item} title={"loan.infoLoan.profile.sex"} content={'Nam'} />
          <ItemView style={styles.item} title={"loan.infoLoan.profile.phone"} content={'093343423424'} />
          <ItemView style={styles.item} title={"loan.infoLoan.profile.email"} content={'tamdepzai@gmail.com'} />
        </View>
      </View>

      <Document />

      <View style={styles.content}>
        <AppText style={styles.title} value={"Ghi chú"} />
        <View style={[styles.contentItem, styles.contentItemNote]}>
          <Note />
        </View>
      </View>
    </ScrollView>
  )
});

export default Info;

const styles = ScaledSheet.create({
  container: {
    paddingLeft: '16@s',
    paddingRight: '16@s',
    paddingBottom: '16@s',
  },
  content: {
    marginBottom: '16@s'
  },
  title: {
    marginBottom: '8@s'
  },
  contentItem: {
    borderRadius: '8@s',
    padding: '8@s',
    backgroundColor: color.palette.white,
  },
  contentItemNote: {
    padding: '16@s',
  },
  item: {
    padding: '8@s',
  }
});
