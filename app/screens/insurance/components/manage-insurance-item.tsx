import { Box, Pressable } from "native-base"
import React, { useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { FastImage } from "../../../components/fast-image/fast-image"
import moment from "moment"
import { status } from "./validity-check"
import { color } from "../../../theme"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const ManageInsuranceItem = React.memo(({ item, index, onPress }: Props) => {
  const data = item?.product
  const date = 60 * 60 * 24 * 30
  const endDate = item?.meta?.time?.endTime

  // const checkStatus = React.useCallback(() => {
  //   if (moment().diff(moment(endDate), 'second') < date && moment().diff(moment(endDate), 'second') !== 0){
  //     return status.almostExpired
  //   }
  //   if (moment().diff(moment(endDate), 'second') > date){
  //     return status.effective
  //   }
  //   return status.expire
  // },[])

  // const backgroundColorHeader = checkStatus() === status.effective ?
  //   color.palette.green: checkStatus() === status.expire ?
  //     color.palette.angry : color.palette.orange

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      height={vs(74)}
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
        <Text
          mt="1"
          size={"medium12"}
          color="#A1A8AB"
          lineHeight={17}
          textTransform="capitalize"
          text={item?.user?.fullName ?? ''}
        />
        <Text
          mt="1"
          size={"medium12"}
          color="#A1A8AB"
          lineHeight={17}
          textTransform="capitalize"
          text={item?.meta?.name ?? ''}
        />
      </Box>
      <Box>
      {/*  <Text fontSize={10} fontWeight="400" color="#A1A8AB" lineHeight={14} text={item?.code ?? ''} />*/}
      {/*   <Box*/}
      {/*    height={18}*/}
      {/*    bg="#E5FFE2"*/}
      {/*    borderRadius={8}*/}
      {/*    px="2"*/}
      {/*    alignItems="center"*/}
      {/*    justifyContent="center"*/}
      {/*    mt="1"*/}
      {/*   >*/}
      {/*    <Text*/}
      {/*      fontSize={10}*/}
      {/*      color="#52BF50"*/}
      {/*      lineHeight={14}*/}
      {/*      textTransform="capitalize"*/}
      {/*      text={"Có hiệu lực"}*/}
      {/*    />*/}
      {/*   </Box>*/}
      </Box>
    </Pressable>
  )
})

export default ManageInsuranceItem
