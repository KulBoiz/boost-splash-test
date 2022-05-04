import React from 'react';
import { TouchableOpacity, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppHeader from "../../components/app-header/AppHeader";
import { AppText } from '../../components/app-text/AppText';
import { HIT_SLOP } from '../../styles/common-style';
import { color } from "../../theme";
import Info from './components/info';
import Result from './components/result';

interface Props { }

const ProfileDetail = React.memo((props: Props) => {
  const [key, setKey] = React.useState<number>(0);
  const [paths] = React.useState([
    { title: 'Thông tin' },
    { title: 'Lịch sử xử lý' },
    { title: 'Kết quả' },
  ]);

  return (
    <View style={styles.container}>
      <AppHeader headerText={'chi tiết hồ sơ'} isBlue />

      <View style={styles.menu}>
        {paths.map((e, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => setKey(index)} hitSlop={HIT_SLOP}>
              <View style={index === paths.length - 1 ? styles.menuText : styles.menuTextBottom}>
                <AppText style={key === index && styles.active} value={e.title} />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>

      {key === 0 && <Info />}
      {key === 1 && <></>}
      {key === 2 && <Result />}
    </View>
  )
});

export default ProfileDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: color.palette.EEEEEE,
    margin: '24@s',
    borderRadius: '8@s',
  },
  menuText: {
    color: color.palette.BABABA,
    width: 120,
    textAlign: 'center',
    padding: '8@s',

  },
  menuTextBottom: {
    width: 120,
    textAlign: 'center',
    padding: '8@s',

  },
  active: {
    backgroundColor: color.palette.white,
    color: color.palette.blue,
    borderRadius: '10@s',
    textAlign: 'center',
  }
});
