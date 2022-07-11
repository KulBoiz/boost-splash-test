import React from 'react';
import { Pressable, TouchableOpacity, View } from "react-native"
import { isIphoneX } from "react-native-iphone-x-helper";
import { s, ScaledSheet } from "react-native-size-matters"
import { BellBankSvg, DefaultAvatarSvg } from "../../../../assets/svgs"
import { AppText } from '../../../../components/app-text/AppText';
import { fontFamily } from "../../../../constants/font-family";
import { useStores } from '../../../../models';
import { navigate } from "../../../../navigators";
import { ScreenNames } from "../../../../navigators/screen-names";
import { ROW } from "../../../../styles/common-style";
import { color } from "../../../../theme";
import FastImage from "react-native-fast-image"
import { observer } from "mobx-react-lite"
import { getLastWord } from "../../../../constants/variable"
import { LinearGradient } from 'expo-linear-gradient';

interface Props { }

const HeaderCard = observer((props: Props) => {
  const { authStoreModel } = useStores()
  const { user } = authStoreModel
  const avatar = authStoreModel?.user?.avatar

  return (
    <LinearGradient colors={['#064DD6','#316CDD']} start={[0,0.5]} end={[0, 0.8]}>
      <View style={styles.header}>
          <View style={[ROW, styles.itemContainer]}>
            <View style={ROW}>
              <Pressable onPress={()=> navigate(ScreenNames.SETTING)}>
                {!!avatar ?
                  <FastImage source={{uri: avatar}} style={styles.avatar} /> :
                  <DefaultAvatarSvg width={s(40)} height={s(40)} />
                }
              </Pressable>
              <View style={styles.wrapName}>
                <AppText value={`Chào ${getLastWord(user?.fullName)},`} style={styles.name} />
                <AppText value={`Chào mừng bạn quay lại!`} style={styles.welcome} />
              </View>
            </View>
            <TouchableOpacity onPress={() => navigate(ScreenNames.NOTICE)}>
              <BellBankSvg width={s(24)} height={s(24)}/>
            </TouchableOpacity>
          </View>

      </View>
    </LinearGradient>

  )
});

export default HeaderCard;

const styles = ScaledSheet.create({
  header: {
    height: isIphoneX() ? '110@vs' : '90@vs',
    justifyContent: 'flex-end',
    paddingHorizontal: '24@ms',

  },
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    borderWidth: 1,
    borderColor: 'white',
  },
  wrapName :{
    marginLeft: '10@ms'
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '15@s'
  },
  welcome: {
    fontSize: '14@ms',
    color: color.palette.white,
  },
  name: {
    fontSize: '20@ms',
    color: color.palette.white,
    fontFamily: fontFamily.bold
  },

});
