import moment from "moment"
import numeral from "numeral"
import { Box, Pressable } from "native-base"
import React, { useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { find } from "../../../utils/lodash-utils"
import { getSurveyName, GET_STATUS_BANK_FEED_BACK, GET_TASK_STATUS_ASSIGNED } from "../constants"
import { useStores } from "../../../models"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const BankerRequestItem = React.memo(({ item, index, onPress }: Props) => {
  const { authStoreModel } = useStores()
  const name = getSurveyName(item.surveyDetails)
  const loanDetail =
    find(item.surveyDetails, (i) => i.questionData?.code === "QUESTION_LPC_LOAN_DEMAND") ||
    find(item.surveyDetails, (i) => i.questionData?.type === "OPEN_ENDED_NUMBER")
  const loanPlan = find(
    item.surveyDetails,
    (i) => i.questionData?.code === "QUESTION_LPC_LOAN_PLAN",
  )

  const status = () => {
    const feedBack = item?.bankFeedbacks?.find(el => el?.userId === authStoreModel?.user?.id)
    const status = GET_STATUS_BANK_FEED_BACK[feedBack?.responseStatus]
    return status || 'Chờ xử lý'
  }

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
          text={status()}
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
