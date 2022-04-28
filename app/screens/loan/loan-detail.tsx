import React from 'react';
import { ScrollView, View } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import ProductInfo from "./components/product-info"
import LoanDetailItem from "./components/loan-detail-item"
import AppButton from "../../components/app-button/AppButton"
import CollapsibleRequestProfile from "./components/collapsible-request-profile"
import { ScreenNames } from "../../navigators/screen-names"
import { navigate } from "../../navigators"

interface Props{}

const item = {
  "id": "6109ebe6bb2755cb1a17d662",
  "_iid": 870,
  "createdAt": "2021-08-04T01:22:46.912Z",
  "updatedAt": "2022-04-19T10:41:07.993Z",
  "code": "LOD100870",
  "name": "Nhà dự án | Gem Sky World | MB Bank | Lãi suất 0% | Ưu đãi 24 tháng",
  "advantages": "- Cho vay linh hoạt\n- Độ phủ chi nhánh rộng, hỗ trợ được nhiều khách hàng.\n- Một trong top những ngân hàng thương mại cổ phần ở Việt Nam.",
  "slug": "nha-du-an-gem-sky-world-mb-bank-lai-suat-77-uu-dai-12-thang-6109ebe6bb2755cb1a17d662",
  "categoryId": "60e54fd9442b6522372836be",
  "orgId": "60e053628cf80a69dda374ac",
  "productId": "60e188f757d9f6f0f3a3b64d",
  "documentTemplateId": "60e69fa6bd478f21e5176785",
  "info": {
    "preferentialTime": 24,
    "preferentialRate": 0,
    "afterPreferentialRate": 11,
    "maxRate": 75,
    "maxTime": 20,
    "earlyRepaymentFee": "3.5",
    "amplitude": null,
    "typeService": "advanced"
  },
  "status": "approved",
  "applyFrom": "2021-06-01T01:21:38.389Z",
  "createdById": "60e0533757d9f6f0f3381644",
  "updatedById": "60e0533257d9f6f0f33810cb",
  "product": {
    "id": "60e188f757d9f6f0f3a3b64d",
    "updatedAt": "2022-04-11T12:04:24.405Z",
    "code": "MORTGAGE-158",
    "name": "Nhà Dự Án | GEM SKY WORLD | VBTT",
    "type": "loan",
    "slug": "nha-du-an-gem-sky-world-use-60e188f757d9f6f0f3a3b64d",
    "categoryId": "60e54fd9442b6522372836be",
    "description": "Sản phẩm vay mua GEM SKY WORLD độc quyền bởi VPBank đi kèm nhiều ưu đãi hấp dẫn.",
    "conditions": "",
    "disadvantages": "",
    "advantages": "CĐT Hà An sẽ hỗ trợ khách hàng thanh toán 100% lãi suất vay vốn trong vòng 12 tháng hoặc cho đến ngày CĐT thông báo bàn giao sản phẩm, tùy trường hợp nào đến trước.",
    "outstandingAdvantages": "Ân hạn nợ gốc lên đến 12 tháng",
    "info": {
      "projectId": "60e0563257d9f6f0f338da45"
    },
    "status": "approved",
    "oldId": 158,
    "orgId": "60e0533b8cf80a69dda333dc",
    "documentTemplateId": "60e54fd5442b65223728327f",
    "projectId": "60e0563257d9f6f0f338da45",
    "rootOrgId": "60e0533b8cf80a69dda333dc"
  },
  "outstandingAdvantages": "Lãi suất cực kỳ ưu đãi",
  "org": {
    "id": "60e053628cf80a69dda374ac",
    "_iid": 8,
    "createdAt": "2021-07-03T12:09:06.188Z",
    "deletedAt": null,
    "updatedAt": "2022-01-20T07:27:29.440Z",
    "parentOrgId": "60e0533b8cf80a69dda333dc",
    "rootOrgId": "60e0533b8cf80a69dda333dc",
    "code": "MBBank",
    "name": "Ngân hàng TMCP Quân đội (MBBANK)",
    "image": {
      "id": "619ca2024c92bbac5322692f",
      "_iid": 1665,
      "createdAt": "2021-11-23T08:10:42.876Z",
      "updatedAt": "2021-11-23T08:10:42.876Z",
      "name": "MBBank.png",
      "isImage": true,
      "url": "https://storage.googleapis.com/image-fina/upload/fina/MBBank.png",
      "type": "image/png",
      "encoding": "7bit",
      "fieldname": "file",
      "size": 17153
    },
    "email": null,
    "emails": [
      {}
    ],
    "tels": [
      {}
    ],
    "address": "",
    "type": "bank",
    "orgPaths": ",2,8,",
    "backgroundColor": "#131ed2",
    "roleIds": null,
    "permissions": null,
    "groupIds": null,
    "oldId": 9,
    "orgId": "60e0533b8cf80a69dda333dc",
    "tel": null
  }
}
const LoanDetail : React.FC<Props> = observer(() => {
  return (
    <View style={styles.container}>
      <AppHeader headerText={'Chi Tiết Gói Vay'} isBlue/>
      <ScrollView style={styles.body}>
        <LoanDetailItem item={item} />
        <ProductInfo />
        <CollapsibleRequestProfile />
        <AppButton tx={'auth.registerNow'} onPress={()=> navigate(ScreenNames.REGISTER_LOAN)} containerStyle={styles.btn}/>
        <View style={{height: 100}}/>
      </ScrollView>
    </View>
  )
});

export default LoanDetail;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
    },
  body: {
    paddingHorizontal: '16@ms',
    paddingVertical: '30@s'
  },
  btn: {
    backgroundColor: color.palette.orange,
    alignSelf: "center"
  }
});
