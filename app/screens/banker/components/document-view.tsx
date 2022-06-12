import { get } from "lodash"
import { Box, Pressable, IBoxProps, HStack } from "native-base"
import React, { useState } from "react"
import { useWindowDimensions } from "react-native"
import Collapsible from "react-native-collapsible"
import { s, vs } from "react-native-size-matters"
import { ChevronDownPrimarySvg, ChevronDownSvg, PictureSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import { FastImage } from "../../../components/fast-image/fast-image"
import { map } from "../../../utils/lodash-utils"

type Props = IBoxProps & {
  data: any
}

const DocumentView = React.memo(({ data, ...props }: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  const imageUrls: string[] = get(data, "images")
  const notUpdate = imageUrls?.length === 0 || !imageUrls
  const { width } = useWindowDimensions()
  const imageWidth = (width - s(64)) / 2

  const noPhoto = () => (
    <Box
      height={152}
      width={imageWidth}
      ml={s(12)}
      alignItems="center"
      justifyContent="center"
      bg="#C4C4C4"
      mb={s(12)}
    >
      <PictureSvg />
    </Box>
  )

  return (
    <Box bg="white" borderRadius="8" {...props}>
      <Pressable
        flexDirection="row"
        py={vs(12)}
        px={s(12)}
        alignItems="center"
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text
          fontWeight="400"
          color={!collapsed ? "primary" : "lightGray"}
          fontSize="12"
          lineHeight="17"
          flex="1"
          text={data?.document?.name}
          mr="3"
          numberOfLines={1}
        />
        {!!collapsed && (
          <Text
            fontWeight="400"
            color={!notUpdate ? "lightGray" : "orange"}
            fontSize="12"
            lineHeight="17"
            mr={s(8)}
            text={!notUpdate ? "đã cập nhật" : "chưa cập nhật"}
          />
        )}
        <Box style={!collapsed && { transform: [{ rotate: "180deg" }] }}>
          {collapsed ? <ChevronDownSvg /> : <ChevronDownPrimarySvg />}
        </Box>
      </Pressable>
      <Collapsible collapsed={collapsed}>
        <Box pt={s(12)}>
          {notUpdate ? (
            <HStack flexWrap="wrap">
              {noPhoto()}
              {noPhoto()}
            </HStack>
          ) : (
            <HStack flexWrap="wrap">
              {map(imageUrls, (el, index) => (
                <FastImage
                  key={index.toString()}
                  source={{ uri: el }}
                  height={152}
                  width={imageWidth}
                  ml={s(12)}
                  mb={s(12)}
                />
              ))}
            </HStack>
          )}
        </Box>
      </Collapsible>
    </Box>
  )
})

export default DocumentView
