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

const RenderCheckbox = React.memo(({ text, state }: { text?: string, state?: string }) => {
  const check = (text === 'Có' && state === 'yes') || (text === 'Không' && state === 'no')
  return (
    <TouchableOpacity
      onPress={() => {
        // todo
      }}
      style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, { width: '50%'}, MARGIN_TOP_8]}
    >
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.bigCircle}>
          {check && <View style={styles.circle} />}
        </View>
        <AppText value={'Có'} />
      </View>
      <View style={[ROW, ALIGN_CENTER]}>
        <View style={styles.bigCircle}>
          {check && <View style={styles.circle} />}
        </View>
        <AppText value={'Không'} />
      </View>
    </TouchableOpacity>
  )
})

const RenderInput = React.memo(({ text }: { text?: string }) => {
  return (
    <TouchableOpacity onPress={() => {
      // todo
    }} style={[ROW, ALIGN_CENTER]}>
      <TextInput
        multiline={true}
        value={text}
        placeholder={"1231"}
        style={{
          height: s(50),
          marginTop: s(8),
          borderWidth: 0.5,
          width: '100%',
          borderRadius: s(6),
          padding: s(8),
        }}
      />
    </TouchableOpacity>
  )
})

const SurveyQuestion = React.memo((props: Props) => {
  const { questionGroups } = props
  // const [injured, setInjured] = useState<string>('')
  // const [fatalDisease, setFatalDisease] = useState<string>('')
  // const isValid = injured === 'no' && fatalDisease === 'no'

  console.log('questionGroup', questionGroups);

  const PreviewQuestionType = (type) => {
    switch (type) {
      // case QUESTION_TYPES.IMAGE_SELECTION:
      // 	return PreviewImageSelectionQuestion;
      case QUESTION_TYPES.TEXT_SELECTION:
        return <RenderCheckbox />;
      case QUESTION_TYPES.OPEN_ENDED:
        return <RenderInput />;
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

  return (
    <View style={styles.container}>
      <AppText value={'Câu hỏi khảo sát theo sản phẩm'} style={styles.title} />
      {
        questionGroups?.children?.map((question, index) => {
          return (<View key={index.toString()}>
            <AppText
              value={question.content?.blocks?.[0]?.text}
              style={[FONT_MEDIUM_12, MARGIN_TOP_8]}
              color={color.palette.lighterGray}
            />
            {PreviewQuestionType(question?.type)}
          </View>)
        })
      }
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
  }

});

