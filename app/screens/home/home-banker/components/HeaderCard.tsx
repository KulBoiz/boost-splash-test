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

interface Props { }

const HeaderCard = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const { user } = authStoreModel
  const avatar = authStoreModel?.user?.avatar

  return (
    <View style={styles.header}>
      <View style={styles.wrapContent}>
        <View style={[ROW, styles.itemContainer]}>
          <Pressable onPress={()=> navigate(ScreenNames.SETTING)}>
            {!!avatar ?
              <FastImage source={{uri: avatar}} style={styles.avatar} /> :
              <DefaultAvatarSvg width={s(40)} height={s(40)} />
            }
          </Pressable>

          <TouchableOpacity onPress={() => navigate(ScreenNames.NOTICE)}>
            <BellBankSvg />
          </TouchableOpacity>
        </View>

        <View>
          <AppText value={`Chào ${user?.fullName},`} style={styles.name} />
          <AppText value={`Chào mừng bạn quay lại!`} style={styles.welcome} />
        </View>
      </View>
    </View>
  )
});

export default HeaderCard;

const styles = ScaledSheet.create({
  container: {},
  wrapContent: {
    paddingTop: isIphoneX() ? '60@s' : '40@s',
    width: "100%",
    paddingHorizontal: '24@ms',
    paddingBottom: '20@s'
  },
  avatar: {
    width: '40@s',
    height: '40@s',
    borderRadius: '20@s',
    borderWidth: 1,
    borderColor: 'white',
  },
  itemContainer: {
    width: '100%',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '28@s'
  },
  welcome: {
    fontSize: '16@ms'
  },
  name: {
    fontSize: '24@ms',
    color: color.palette.black,
    fontFamily: fontFamily.bold
  },
  header: {
    // height: isIphoneX() ? '110@vs' : '90@vs',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.palette.white
  }
});
