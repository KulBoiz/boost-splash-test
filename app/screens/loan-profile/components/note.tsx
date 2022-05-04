import moment from 'moment';
import React from 'react';
import { View, Image } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText";
import { color } from "../../../theme";

interface Props {
}

const Note = React.memo((props: Props) => {
  return (

    <View style={styles.noteItem}>
      <Image
        style={[styles.image, View && { marginTop: 8 }]}
        source={{ uri: 'https://static.wixstatic.com/media/9d8ed5_e6ced15f72434992af9b5926526c78f6~mv2.jpg/v1/fill/w_500,h_500,al_c,q_85,usm_0.66_1.00_0.01/9d8ed5_e6ced15f72434992af9b5926526c78f6~mv2.webp' }}
      />
      <View style={styles.noteContent}>
        <AppText style={styles.name} value={'Cẩm Uyên'} />
        <AppText style={styles.time} value={moment().fromNow()} />
        <AppText style={styles.valueNote} value={'Ét ô ét!! khách hàng muốn có tiền sớm'} />
        <View style={styles.reply}>
          <AppText style={styles.replyText} value={'Trả lời'} />
        </View>
      </View>
    </View>
  )
});

export default Note;

const styles = ScaledSheet.create({
  note: {
    width: '100%',
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: '8@s',
    padding: '6@s',
  },
  noteItem: {
    flexDirection: 'row',
  },
  image: {
    width: '24@s',
    height: '24@s',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: color.palette.EEEEEE,
    marginTop: 0,
  },
  noteContent: {
    flexDirection: 'row',
    width: '80%',
    flexWrap: 'wrap',
    marginLeft: '8@s'
  },
  name: {
    fontSize: 12,
  },
  time: {
    fontSize: 12,
    color: color.palette.BABABA,
    paddingLeft: '4@s',
  },
  valueNote: {
    color: '#151940',
    fontSize: 12,
    paddingTop: '4@s',
    paddingBottom: '4@s',
    width: '100%'
  },
  reply: {
    paddingBottom: '1@s',
    borderBottomWidth: 1,
    borderColor: color.palette.blue
  },
  replyText: {
    color: color.palette.blue,
    fontSize: 12,
  }
});
