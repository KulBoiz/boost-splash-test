import { Box, Pressable } from "native-base"
import React from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { FastImage } from "../../../components/fast-image/fast-image"
import moment from "moment"
import { status } from "./validity-check"
import { color } from "../../../theme"
import { getClaimStatus, getTimeLeft } from "../constants"
import { getFullName, isIos } from "../../../constants/variable"
import { isIphoneX } from "react-native-iphone-x-helper"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const ManageInsuranceItem = React.memo(({ item, index, onPress }: Props) => {
  const data = item?.product
  const endDate = item?.meta?.time?.endTime
  const type = 'claim_insurance'
  const isClaim = item?.type === type
  const config = item?.product?.insuranceConfig

  const checkStatus = React.useCallback(() => {
    if ((Number(moment(endDate).format('x')) - +moment(new Date()).format('x')) > getTimeLeft(config?.countdown, config?.typeCountdown)){
      return status.effective
    }
    if ((Number(moment(endDate).format('x')) - +moment(new Date()).format('x')) < getTimeLeft(config?.countdown, config?.typeCountdown)
      && (Number(moment(endDate).format('x')) - +moment(new Date()).format('x')) > 0){
      return status.almostExpired
    }
    return status.expire
  },[config])

  const backgroundColor = checkStatus() === status.effective ?
    color.palette.lightGreen: checkStatus() === status.expire ?
      color.palette.lightRed : color.palette.lightOrange

  const textColor = checkStatus() === status.effective ?
    color.palette.green: checkStatus() === status.expire ?
      color.palette.angry : color.palette.orange

  const label = checkStatus() === status.effective ?
  'Có hiệu lực': checkStatus() === status.expire ?
    "Hết hiệu lực" : "Gần hết hiệu lực"

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      height={isIphoneX() ? vs(80) :  isIos ?  vs(100) : vs(80)}
      borderRadius={8}
      bg="white"
      mx={s(16)}
      mb={vs(10)}
      flexDirection="row"
      alignItems="center"
      shadow={3}
      px="4"
    >
      <Box alignItems="center" justifyContent="center">
        <FastImage
          source={{ uri: data?.info?.image?.url }}
          width={65}
          height={24}
          resizeMode="contain"
        />
      </Box>
      <Box flex={1} ml="6">
        <Text
          fontSize={12}
          fontWeight="700"
          color="black"
          lineHeight={17}
          text={data?.name ?? ''}
        />
        {isClaim && <Text
          mt="1"
          size={"medium12"}
          color={getClaimStatus(item?.status).color}
          lineHeight={17}
          textTransform="capitalize"
          text={getClaimStatus(item?.status).label ?? ""}
        />}
        <Text
          mt="1"
          size={"medium12"}
          color="#A1A8AB"
          lineHeight={17}
          textTransform="capitalize"
          text={getFullName(item?.user)}
        />

      </Box>

       <Box>
        <Text fontSize={10} fontWeight="400" color="#A1A8AB" lineHeight={14} text={item?.code ?? ""} />
         {!isClaim && <Box
          height={18}
          bg={backgroundColor}
          borderRadius={8}
          px="2"
          alignItems="center"
          justifyContent="center"
          mt="1"
        >
          <Text
            fontSize={10}
            color={textColor}
            lineHeight={14}
            textTransform="capitalize"
            text={label ?? ""}
          />
        </Box>
        }
      </Box>
    </Pressable>
  )
})

export default ManageInsuranceItem
