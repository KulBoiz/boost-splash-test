import { StackActions, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { StyleSheet, View } from "react-native"
import { AuthSvg } from "../../assets/svgs"
import { AppText } from "../../components/app-text/AppText"
import { useStores } from "../../models"
import { ScreenNames } from "../../navigators/screen-names"
import { color } from "../../theme"

interface Props { }

const SettingAuthScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { authStoreModel } = useStores()

  const login = () => {
    navigation.dispatch(StackActions.push(ScreenNames.AUTH))
  }

  if (!!authStoreModel?.user) {
    return <></>
  }

  return (
    <View style={styles.container}>
      <AuthSvg />
      <View style={styles.description}>
        <AppText value={'Bạn cần phải '} />
        <AppText value={'Đăng nhập'} underline onPress={login} color={color.palette.blue} />
        <AppText value={' để sử dụng tính năng này'} />
      </View>
    </View>
  )
});

export default SettingAuthScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: color.palette.lightBlue,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  description: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: 16
  }
});
