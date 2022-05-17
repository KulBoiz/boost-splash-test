import React, { useState } from "react"
import { TouchableOpacity, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_MEDIUM_12, ROW } from "../../../styles/common-style"
import { color } from "../../../theme"

interface Props{}

const RenderCheckbox = React.memo(({text, state, setState}: {text: string, state: string, setState(): void}) => {
  const check = (text ==='Có' && state === 'yes') || (text === 'Không' && state === 'no')
  return (
    <TouchableOpacity onPress={setState} style={[ROW, ALIGN_CENTER]}>
      <View style={styles.bigCircle}>
        {check && <View style={styles.circle}/>}
      </View>
      <AppText value={text}/>
    </TouchableOpacity>
  )
})

const SurveyQuestion = React.memo((props: Props) => {
  const [injured, setInjured] = useState<string>('')
  const [fatalDisease, setFatalDisease] = useState<string>('')
  const isValid = injured === 'no' && fatalDisease === 'no'
  return (
    <View style={styles.container}>
      <AppText value={'Câu hỏi khảo sát theo sản phẩm'} style={styles.title}/>
      <AppText value={'1. Anh/Chị có thương tật vĩnh viễn từ 50% không?'} style={FONT_MEDIUM_12} color={color.palette.lighterGray}/>
     <View style={styles.wrapCheckbox}>
       <RenderCheckbox text={"Có"} {...{state: injured, setState:()=> setInjured('yes')}}/>
       <RenderCheckbox text={"Không"} {...{state: injured, setState:()=>  setInjured('no')}} />
     </View>
      <AppText value={'2. Anh/Chị có mắc bệnh hiểm nghèo không?'} style={FONT_MEDIUM_12} color={color.palette.lighterGray}/>
      <View style={styles.wrapCheckbox}>
        <RenderCheckbox text={"Có"} {...{state: fatalDisease, setState:()=> setFatalDisease('yes')}}/>
        <RenderCheckbox text={"Không"}  {...{state: fatalDisease, setState:()=>  setFatalDisease('no')}}/>
      </View>
      <View style={styles.wrapCondition}>
        {!!injured && !!fatalDisease &&
          <AppText style={FONT_MEDIUM_12}
                   value={ isValid ? 'Đủ điều kiện mua bảo hiểm' : 'Không đủ điều kiện mua bảo hiểm'}
                   color={isValid ? color.palette.green : color.palette.angry }/>
        }
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
  bigCircle: {
      marginRight: '4@s',
    width: '16@s',
    height: '16@s',
    borderRadius: '8@s',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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

