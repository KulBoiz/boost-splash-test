import React from 'react';
import { View } from 'react-native';
import UserAvatar from "../../../components/user-avatar/user-avatar"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { get } from "lodash"
import { color } from "../../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { FONT_REGULAR_12, TEXT_CENTER } from "../../../styles/common-style"
import { observer } from "mobx-react-lite"

interface Props {
  renderRole: string;
}
const content = 'Theo quy định của NHNN. Chủ ví điện tử cần cung cấp hình ảnh chứng từ cá nhân để đảm bảo chính chủ, xác thực tài khoản, và tăng cường bảo mật'

const VerifyUser = observer(({ renderRole }: Props) => {
  const { authStoreModel } = useStores()
  const name = get(authStoreModel?.user, 'fullName')

  return (
    <View style={styles.container}>
      <UserAvatar style={styles.avatar} />
      <View style={styles.infoContainer}>
        <AppText value={name ?? 'FINA'} style={styles.name} />
        {renderRole && <View style={styles.verifyContainer}>
          <AppText value={renderRole ?? ''} style={styles.verify} />
        </View>}
        <AppText value={content} style={[TEXT_CENTER, FONT_REGULAR_12]} />
      </View>

    </View>
  )
});

export default VerifyUser;

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    paddingHorizontal: '16@ms',
    marginBottom: '30@s'
  },
  avatar: {
    top: '45@vs',
    zIndex: 1
  },
  verifyContainer: {
    paddingVertical: '7@s',
    backgroundColor: 'rgba(221, 51, 51, 0.2)',
    borderRadius: '17@s',
    paddingHorizontal: '10@s',
    marginTop: '8@s',
    marginBottom: '24@s'
  },
  verify: {
    fontSize: '8@ms',
    color: color.palette.angry,
  },
  name: {
    fontSize: '18@ms',
    fontFamily: fontFamily.bold,
    marginTop: '4@s'
  },
  infoContainer: {
    paddingBottom: '37@s',
    paddingTop: '50@s',
    paddingHorizontal: '24@s',
    width: '100%',
    minHeight: '130@s',
    backgroundColor: color.background,
    borderRadius: '16@s',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
