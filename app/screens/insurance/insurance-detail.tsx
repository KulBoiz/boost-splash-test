import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { AppText } from "../../components/app-text/AppText"
import AppHeader from "../../components/app-header/AppHeader"

interface Props{}

const InsuranceDetail = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'BH mất cấp / Cướp xe máy '} isBlue/>
      <View style={styles.body}>
        <AppText value={'Đầu tư cho tương lai chính là bảo vệ tương lai của bạn. Chi phí tuy nhỏ nhưng bảo vệ cực lớn. Hãy sẵn sàng ngay từ bây giờ!\n'} />
        <AppText value={'Cùng với các đối tác bảo hiểm lớn, chúng tôi mang lại cho bạn sự lựa chọn đa dạng và ngày càng ưu việt hơn\n'} />
        <AppText value={'Chúng tôi cung cấp các loại hình bảo hiểm phi nhân thọ và nhân thọ: từ con người đến tài sản. Bảo vệ bạn và gia đình một cách toàn diện nhất'} />
      </View>
    </View>
  )
});

export default InsuranceDetail;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background
  },
  body: {
    padding: '16@s',
  },
  wrapButton: {
    flex: 1,
    justifyContent: "flex-end"
  }
});
