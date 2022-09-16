import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import Share from 'react-native-share';
import AppButton from '../app-button/AppButton';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { color } from '../../theme';

interface Props {
  url?: string | any;
  isIcon?: boolean
}

const ShareComponent = React.memo((props: Props) => {
  const { url, isIcon = false } = props

  const title = 'Chia sẻ từ FINA';
  const message = '';
  const options = {
    title,
    subject: title,
    message: `${message} ${url}`,
  }
  const share = () => {
    Share.open(options).then((res) => {
      console.log(res)
    });
  }

  const myIcon = <View>
    <Icon name="share-alt" size={20} color="#FFF" onPress={share}/>
  </View>;

  return (
    <View style={!isIcon ? styles.container : styles.iconContainer}>
      {isIcon ? myIcon : <AppButton title={'Chia sẻ'} onPress={share} containerStyle={styles.buttonShare} titleStyle={{ color: color.palette.blue }}/>}
    </View>
  )
});

export default ShareComponent;

const styles = ScaledSheet.create({
  container: {

  },
  buttonShare: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: color.palette.blue
  },
  iconContainer: {
    position: 'absolute',
    width: '40@s',
    height: '40@s',
    bottom: '50@s',
    right: '30@s',
    borderWidth: 1,
    borderColor: '#064DD6',
    borderRadius: '20@s',
    backgroundColor: '#064DD6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  }
});
