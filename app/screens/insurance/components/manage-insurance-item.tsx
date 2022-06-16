import { Box, Pressable } from "native-base"
import React, { useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { FastImage } from "../../../components/fast-image/fast-image"

interface Props {
  item: any
  index: number
  onPress: (item) => void
}

const ManageInsuranceItem = React.memo(({ item, index, onPress }: Props) => {
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
          source={{ uri: "https://bshc.com.vn/wp-content/uploads/2021/05/logo900900.png" }}
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
          text={"An tâm mùa dịch"}
        />
        <Text
          mt="1"
          size={"medium12"}
          color="#A1A8AB"
          lineHeight={17}
          textTransform="capitalize"
          text={"Trần Minh Tuấn"}
        />
      </Box>
      <Box>
        <Text fontSize={10} fontWeight="400" color="#A1A8AB" lineHeight={14} text={"123456890"} />
        <Box
          height={18}
          bg="#E5FFE2"
          borderRadius={8}
          px="2"
          alignItems="center"
          justifyContent="center"
          mt="1"
        >
          <Text
            fontSize={10}
            color="#52BF50"
            lineHeight={14}
            textTransform="capitalize"
            text={"Có hiệu lực"}
          />
        </Box>
      </Box>
    </Pressable>
  )
})

export default ManageInsuranceItem
