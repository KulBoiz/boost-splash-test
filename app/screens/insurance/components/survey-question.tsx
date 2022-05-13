import React from "react"
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { ms, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { FONT_MEDIUM_12 } from "../../../styles/common-style"
import { color } from "../../../theme"
import BouncyCheckbox from "react-native-bouncy-checkbox"

interface Props{}

const iconComponent = () => (
  <View style={styles.circle}/>
)

const RenderCheckbox = React.memo(({text}: {text: string}) => {
  return (
    <BouncyCheckbox
      size={20}
      fillColor={color.palette.blue}
      unfillColor="#FFFFFF"
      text={text}
      iconStyle={{ borderColor: color.palette.black }}
      style={{marginRight: ms(-15)}}
      iconComponent={iconComponent}
    />
  )
})

const SurveyQuestion = React.memo((props: Props) => {

  return (
    <View style={styles.container}>
      <AppText value={'Câu hỏi khảo sát theo sản phẩm'} style={styles.title}/>
      <AppText value={'1. Anh/Chị có thương tật vĩnh viễn từ 50% không?'} style={FONT_MEDIUM_12} color={color.palette.lighterGray}/>
     <View style={styles.wrapCheckbox}>
       <RenderCheckbox text={"Có"}  />
       <RenderCheckbox text={"Không"}  />
     </View>
      <AppText value={'2. Anh/Chị có mắc bệnh hiểm nghèo không?'} style={FONT_MEDIUM_12} color={color.palette.lighterGray}/>
      <View style={styles.wrapCheckbox}>
        <RenderCheckbox text={"Có"} />
        <RenderCheckbox text={"Không"}  />
      </View>
      <View style={styles.wrapCondition}>
        <AppText style={FONT_MEDIUM_12} value={'Không đủ điều kiện mua bảo hiểm' || 'Đủ điều kiện mua bảo hiểm'} color={color.palette.angry || color.palette.green}/>
      </View>
    </View>
  )
});

export default SurveyQuestion;

const styles = ScaledSheet.create({
    container: {
      paddingHorizontal: '16@ms',
      paddingVertical: '24@s',
      backgroundColor: color.background,
      marginTop: '24@s'
    },
  title: {
      fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    marginBottom: '24@s'
  },
  circle: {
      width: '12@s',
    height: '12@s',
    borderRadius: '6@s',
    backgroundColor: color.palette.blue
  },
  wrapCheckbox: {
      flexDirection: 'row',
      marginVertical: '16@s',
    justifyContent: "space-between",
    width: '50%'
  },
  wrapCondition: {
      borderTopWidth: 1,
    borderTopColor: color.dim,
      alignItems: "center",
    paddingTop:'16@s'
  }

});

