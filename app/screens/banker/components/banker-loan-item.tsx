import moment from "moment"
import numeral from "numeral"
import { Box, Pressable } from "native-base"
import React from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { find } from "../../../utils/lodash-utils"
import { LOAN_STATUS_DATA } from "../constants"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const BankerLoanItem = React.memo(({ item, index, onPress }: Props) => {
  const status = find(LOAN_STATUS_DATA, { key: item?.dealDetails?.[0]?.status })

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
          text={status?.text}
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
          text={item?.product?.name}
        />
        <Text
          mt="1"
          fontSize={12}
          fontWeight="400"
          color="ebony"
          lineHeight={17}
          textTransform="capitalize"
          text={
            item?.user?.fullName || `${item?.user?.firstName || ""} ${item?.user?.lastName || ""}`
          }
        />
        <Text
          mt="1"
          fontSize={12}
          fontWeight="700"
          color="primary"
          lineHeight={17}
          text={`${numeral(item?.loanMoney).format("0,0")}${item?.suffix || "vnđ"}`}
        />
        <Text
          mt="1"
          fontSize={10}
          fontWeight="400"
          color="grayChateau"
          lineHeight={14}
          text={moment(item.createdAt).format("hh:mm - DD/MM/YYYY")}
        />
      </Box>
    </Pressable>
  )
})

export default BankerLoanItem
