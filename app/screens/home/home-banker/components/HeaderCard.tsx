import React from 'react';
import { TouchableOpacity, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import { ScaledSheet } from "react-native-size-matters";
import { BellBankSvg } from "../../../../assets/svgs";
import { AppText } from '../../../../components/app-text/AppText';
import { fontFamily } from "../../../../constants/font-family";
import { useStores } from '../../../../models';
import { navigate } from "../../../../navigators";
import { ScreenNames } from "../../../../navigators/screen-names";
import { ROW } from "../../../../styles/common-style";
import { color } from "../../../../theme";

interface Props { }

const HeaderCard = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const { user } = authStoreModel

  return (
    <View style={styles.header}>
      <View style={styles.wrapContent}>
        <View style={[ROW, styles.itemContainer, { justifyContent: "flex-end", marginBottom: 10 }]}>
          <TouchableOpacity onPress={() => navigate(ScreenNames.NOTICE)}>
            <BellBankSvg />
          </TouchableOpacity>
        </View>

        <View>
          <AppText value={`Chào ${user?.fullName},`} style={styles.name} />
          <AppText value={`Chào mừng bạn quay lại đây!`} />
        </View>
      </View>
    </View>
  )
});

export default HeaderCard;

const styles = ScaledSheet.create({
  container: {},
  wrapContent: {
    paddingTop: isIphoneX() ? '70@s' : 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: '20@s'
  },
  itemContainer: {
    width: '100%',
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
