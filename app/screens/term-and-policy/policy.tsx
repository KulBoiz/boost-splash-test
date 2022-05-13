import React from 'react';
import { ScrollView, View } from "react-native"
import {
  ADDRESS, COMMITMENT_TO_SECURITY_OF_CUSTOMERS_PERSONAL_INFORMATION,
  DEFINE,
  INFORMATION_PROTECTION, MEANS_AND_TOOLS_FOR_CUSTOMERS_TO_ACCESS, MECHANISM_FOR_RECEIVING,
  PEOPLE_OR_ORGANIZATION, PERSONAL_INFORMATION_STORAGE_TIME, PURPOSE_OF_INFORMATION_COLLECTION, SCOPE_OF_APPLICATION,
  SCOPE_OF_USE_OF_PERSONAL_INFORMATION,
} from "./constants"
import {
  FONT_BOLD_12,
  MARGIN_BOTTOM_16,
  MARGIN_BOTTOM_8,
  ROW,
} from "../../styles/common-style"
import { AppText } from "../../components/app-text/AppText"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../constants/font-family"
import ParsedText from "react-native-parsed-text"
import CircleContent from "./circle-content"

interface Props{}
const Policy = React.memo((props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <AppText value={'Chính sách bảo mật thông tin'} style={[styles.title, MARGIN_BOTTOM_8]}/>
      <AppText value={'1. ĐỊNH NGHĨA'} style={styles.h2}/>
      {
        DEFINE.map((val, id)=>{
          return (
            <View key={id.toString()} style={[MARGIN_BOTTOM_16, ROW]}>
              <View style={styles.circle}/>
              <ParsedText
                style={styles.content}
                parse={
                  [
                    {pattern: /FINA:|Ứng dụng|Tài khoản/, style: FONT_BOLD_12},
                  ]
                }
                childrenProps={{allowFontScaling: false}}
              >
                {val}
              </ParsedText>
            </View>
          )
        })
      }
      <AppText value={'2. CHÍNH SÁCH BẢO VỆ THÔNG TIN CÁ NHÂN CỦA KHÁCH HÀNG'} style={styles.h2}/>
      <CircleContent data={INFORMATION_PROTECTION} />
      <AppText value={'3. PHẠM VI ÁP DỤNG'} style={styles.h2}/>
      <AppText value={SCOPE_OF_APPLICATION} style={styles.contentText} />
      <AppText value={'4. MỤC ĐÍCH THU THẬP THÔNG TIN CÁ NHÂN CỦA KHÁCH HÀNG'} style={styles.h2}/>
      <AppText value={PURPOSE_OF_INFORMATION_COLLECTION} style={styles.contentText} />
      <AppText value={'5. PHẠM VI SỬ DỤNG THÔNG TIN CÁ NHÂN'} style={styles.h2}/>
      <CircleContent data={SCOPE_OF_USE_OF_PERSONAL_INFORMATION} />
      <AppText value={'6. THỜI GIAN LƯU TRỮ THÔNG TIN CÁ NHÂN'} style={styles.h2}/>
      <AppText value={PERSONAL_INFORMATION_STORAGE_TIME} style={styles.contentText} />
      <AppText value={'7. NHỮNG NGƯỜI HOẶC TỔ CHỨC CÓ THỂ ĐƯỢC TIẾP CẬN VỚI THÔNG TIN CÁ NH N CỦA KHÁCH HÀNG'} style={styles.h2}/>
      <CircleContent data={PEOPLE_OR_ORGANIZATION} />
      <AppText value={'8. ĐỊA CHỈ CỦA ĐƠN VỊ THU THẬP VÀ QUẢN LÝ THÔNG TIN'} style={styles.h2}/>
      <CircleContent data={ADDRESS} />
      <AppText value={'9. PHƯƠNG TIỆN VÀ CÔNG CỤ ĐỂ KHÁCH HÀNG TIẾP CẬN VÀ CHỈNH SỬA DỮ LIỆU THÔNG TIN CÁ NH N CỦA MÌNH'} style={styles.h2}/>
      <AppText value={MEANS_AND_TOOLS_FOR_CUSTOMERS_TO_ACCESS} style={styles.contentText} />
      <AppText value={'10. CAM KẾT BẢO MẬT THÔNG TIN CÁ NHÂN CỦA KHÁCH HÀNG'} style={styles.h2}/>
      <AppText value={COMMITMENT_TO_SECURITY_OF_CUSTOMERS_PERSONAL_INFORMATION} style={styles.contentText} />
      <AppText value={'11. CƠ CHẾ TIẾP NHẬN VÀ GIẢI QUYẾT KHIẾU NẠI LIÊN QUAN ĐẾN VIỆC THÔNG TIN CỦA KHÁCH HÀNG'} style={styles.h2}/>
      <AppText value={MECHANISM_FOR_RECEIVING} style={styles.contentText} />
      <View style={{height: 50}}/>
    </ScrollView>
  )
});

export default Policy;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      padding: '16@ms',
      backgroundColor: color.palette.lightBlue
    },
  title: {
    fontSize: '24@ms',
    fontFamily: fontFamily.semiBold,
    textAlign: "center"
  },
  h2: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    marginBottom: '8@s',
    lineHeight: '20@ms'
  },
  h3: {
    fontSize: '13@ms',
    fontFamily: fontFamily.semiBold,
  },
  content: {
    width: '95%',
    fontSize: '12@ms',
    lineHeight: '14@s'
  },
  contentText: {
    marginLeft: '16@ms',
    width: '95%',
    fontSize: '12@ms',
    lineHeight: '14@s',
    marginBottom: '16@s'
  },
  circle: {
    width: '6@s',
    height:'6@s',
    borderRadius: '3@s',
    backgroundColor: color.palette.black,
    marginRight: '10@s',
    marginTop: '5@s'
  }
});
