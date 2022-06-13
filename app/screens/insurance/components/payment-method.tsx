import React from 'react';
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, FONT_MEDIUM_14, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { PaymeSvg } from "../../../assets/svgs"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
// import FastImage from "react-native-fast-image"
// import { images } from "../../../assets/images"

interface Props { }

const PaymentMethod = React.memo((props: Props) => {
  return (
    <View style={styles.container}>
      <AppText value={'Các phương thức thanh toán'} style={FONT_MEDIUM_14} />
      <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, styles.border]}>
        <PaymeSvg />
        <View style={[ROW, ALIGN_CENTER]}>
          {/* <AppText value={'Phương thức mặc định'} style={styles.text} /> */}
          {/* <View style={styles.wrapCheck}>
          <FastImage source={images.check} style={styles.check}/>
        </View> */}
        </View>
      </View>
    </View>
  )
});

export default PaymentMethod;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    paddingTop: '16@s',
    backgroundColor: color.palette.lightBlue,
  },
  text: {
    fontSize: '10@ms',
    color: color.palette.lighterGray,
    marginRight: '16@ms'
  },
  border: {
    marginTop: '16@s',
    borderRadius: '8@s',
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.background,
    height: '60@ms',
    paddingHorizontal: '16@ms'
  },
  wrapCheck: {
    width: '24@s',
    height: '24@s',
    borderRadius: '12@s',
    backgroundColor: color.palette.blue,
    alignItems: "center",
    justifyContent: "center"
  },
  check: {
    width: '9@s',
    height: '6@s'
  }
});
