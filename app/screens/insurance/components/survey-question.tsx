import React, { useState } from "react"
import { TextInput, TouchableOpacity, View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { s, ScaledSheet } from "react-native-size-matters"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_MEDIUM_12, MARGIN_TOP_16, MARGIN_TOP_8, ROW, SPACE_BETWEEN } from "../../../styles/common-style"
import { color } from "../../../theme"

const QUESTION_TYPES = {
  OPEN_ENDED: 'OPEN_ENDED',
  OPEN_ENDED_NUMBER: 'OPEN_ENDED_NUMBER',
  REORDER: 'REORDER',
  IMAGE_SELECTION: 'IMAGE_SELECTION',
  TEXT_SELECTION: 'TEXT_SELECTION',
  DATE: 'DATE',
};

interface Props {
  productDetail: any,
  questionGroups: any,
}

const SurveyQuestion = React.memo((props: Props) => {
  const { questionGroups } = props
  // const [injured, setInjured] = useState<string>('')
  // const [fatalDisease, setFatalDisease] = useState<string>('')
  // const isValid = injured === 'no' && fatalDisease === 'no'
  const [keysQuestion, setKeyQuestion] = useState<string[]>([])

  const PreviewQuestionType = (type, question) => {
    switch (type) {
      // case QUESTION_TYPES.IMAGE_SELECTION:
      // 	return PreviewImageSelectionQuestion;
      case QUESTION_TYPES.TEXT_SELECTION:
        return <RenderCheckbox question={question}/>;
      case QUESTION_TYPES.OPEN_ENDED:
        return <RenderInput question={question}/>;
      // case QUESTION_TYPES.REORDER:
      // 	return PreviewReorderQuestion;
      // case QUESTION_TYPES.OPEN_ENDED_NUMBER:
      // 	return PreviewOpenEndedNumberQuestion;
      // case QUESTION_TYPES.DATE:
      // 	return PreviewDateQuestion;
      default:
        return <></>;
    }
  };

  const RenderCheckbox = React.memo(({ text, state, question }: { text?: string, state?: string , question: any}) => {
    // const check = (text === 'Có' && state === 'yes') || (text === 'Không' && state === 'no')
    const findKey = keysQuestion.find(el => el === question._iid)

    return (
      <TouchableOpacity
        style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, { width: '50%' }, MARGIN_TOP_16]}
      >
        <View style={[ROW, ALIGN_CENTER]}>
          <TouchableOpacity
            onPress={() => {

              console.log('question', question,keysQuestion );
              
              const keys = [...keysQuestion]
              const findKey = keys.find(el => el === question._iid)
              if (findKey) {
                setKeyQuestion(keys.filter(el => el !== question._iid))
              }
            }}>
            <View style={styles.bigCircle}>
              {!findKey && <View style={styles.circle} />}
            </View>
          </TouchableOpacity>
          <AppText value={'Không'} />
        </View>
        <View style={[ROW, ALIGN_CENTER]}>
          <TouchableOpacity
            onPress={() => {
              const keys = [...keysQuestion]
              const findKey = keys.find(el => el === question._iid)
              if (!findKey) {
                setKeyQuestion(keys.concat([question._iid]))
              }
            }}>
            <View style={styles.bigCircle}>
              {findKey && <View style={styles.circle} />}
            </View>
          </TouchableOpacity>
          <AppText value={'Có'} />
        </View>
      </TouchableOpacity>
    )
  })
  
  const RenderInput = React.memo(({ text, question }: { text?: string, question: any }) => {
    return (
        <TextInput
          multiline={true}
          value={text}
          placeholder={"1231"}
          style={{
            height: s(50),
            marginTop: s(16),
            borderWidth: 0.5,
            width: '100%',
            borderRadius: s(6),
            padding: s(8),
          }}
        />
    )
  })

  return (
    <View style={styles.container}>
      <AppText value={'Câu hỏi khảo sát theo sản phẩm'} style={styles.title} />
      {
        questionGroups?.children?.map((question, index) => {
          return (<View key={index.toString()}>
            <AppText
              value={question.content?.blocks?.[0]?.text}
              style={[FONT_MEDIUM_12, MARGIN_TOP_16]}
              color={color.palette.lighterGray}
            />
            {PreviewQuestionType(question?.type, question)}
          </View>)
        })
      }

      {keysQuestion.length > 0 && <View style={styles.noti}>
      <AppText value={'Không đủ điều kiện mua bảo hiểm'} style={styles.noti} /></View>}
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
    paddingTop: '16@s'
  },
  noti: {
    textAlign: 'center',
    color: color.palette.orange,
    marginTop: '16@s',
    borderTopWidth: 1,
    borderColor: color.palette.lightBlue,
  }
});

