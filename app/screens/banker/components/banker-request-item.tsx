import moment from "moment"
import numeral from "numeral"
import { Box, Pressable } from "native-base"
import React from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { find } from "../../../utils/lodash-utils"
import { getSurveyName, GET_TASK_STATUS_ASSIGNED } from "../constants"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const BankerRequestItem = React.memo(({ item, index, onPress }: Props) => {
  const name = getSurveyName(item.surveyDetails)
  const loanDetail =
    find(item.surveyDetails, (i) => i.questionData?.code === "QUESTION_LPC_LOAN_DEMAND") ||
    find(item.surveyDetails, (i) => i.questionData?.type === "OPEN_ENDED_NUMBER")
  const loanPlan = find(
    item.surveyDetails,
    (i) => i.questionData?.code === "QUESTION_LPC_LOAN_PLAN",
  )
  console.log('bank item', item)
  return (
    <Pressable
      onPress={() => onPress?.(item)}
      height={vs(110)}
      borderRadius={8}
      bg="white"
      mx={s(16)}
      mt={index ? vs(10) : 0}
      flexDirection="row"
      alignItems="center"
    >
      <Box alignItems="center" justifyContent="center" width={s(100)} px="4">
        <Text fontSize={10} fontWeight="500" color="ebony" text={`HSV - ${item._iid}`} />
        <Text
          fontSize={10}
          fontWeight="500"
          mt="0.5"
          color="grayChateau"
          textAlign="center"
          text={GET_TASK_STATUS_ASSIGNED[item.task?.statusAssign]}
        />
      </Box>
      <Box height={vs(77)} borderLeftWidth={1} mr={s(21)} borderLeftColor="iron" />
      <Box>
        <Text
          textTransform="uppercase"
          fontSize={12}
          fontWeight="700"
          color="black"
          lineHeight={17}
          text={loanPlan?.selectedOptions?.[0]?.content}
        />
        {!!name && (
          <Text mt="1" fontSize={12} fontWeight="400" color="ebony" lineHeight={17} text={name} />
        )}
        <Text
          mt="1"
          fontSize={12}
          fontWeight="700"
          color="primary"
          lineHeight={17}
          text={`${numeral(loanDetail?.content).format("0,0")}${
            loanDetail?.questionData?.suffix || ""
          }`}
        />
        <Text
          mt="1"
          fontSize={10}
          fontWeight="400"
          color="grayChateau"
          lineHeight={14}
          text={moment(item.sharedAt).format("hh:mm - DD/MM/YYYY")}
        />
      </Box>
    </Pressable>
  )
})

export default BankerRequestItem
