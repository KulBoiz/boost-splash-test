import { Box, Pressable, IBoxProps, Row } from "native-base"
import React, { useState } from "react"
import { useWindowDimensions } from "react-native"
import Collapsible from "react-native-collapsible"
import { s, vs } from "react-native-size-matters"
import {
  ChevronDownPrimarySvg,
  ChevronDownSvg,
  ImageDocumentSvg,
} from "../../../assets/svgs"
import { Text } from "../../../components"
import { map } from "../../../utils/lodash-utils"
import DocumentItem from "../../loan-profile/components/document-item"

type Props = IBoxProps & {
  data: any
}

const DocumentView = React.memo(({ data, ...props }: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  const files = data?.files || []
  const notUpdate = files?.length === 0 || !files

  return (
    <Box bg="white" borderRadius="8" {...props}>
      <Pressable
        flexDirection="row"
        py={vs(12)}
        px={s(12)}
        alignItems="center"
        onPress={() => setCollapsed(!collapsed)}
        disabled={notUpdate}
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
        {!notUpdate ? (
          <Row alignItems="center" mr="1">
            <Text size="regular14" fontWeight="500" color="lightGray" mr="1" text={files?.length} />
            <ImageDocumentSvg width={18} height={18} />
          </Row>
        ) : (
          <Text
            fontWeight="400"
            color={"orange"}
            fontSize="12"
            lineHeight="17"
            mr={s(8)}
            text={"chưa cập nhật"}
          />
        )}
        {notUpdate ? null : (
          <Box style={!collapsed && { transform: [{ rotate: "180deg" }] }}>
            {collapsed ? <ChevronDownSvg /> : <ChevronDownPrimarySvg />}
          </Box>
        )}
      </Pressable>
      <Collapsible collapsed={collapsed}>
        <Box mx={s(16)} mb={s(16)}>
          {map(files, (file, index) => (
            <DocumentItem key={index} file={file} viewOnly />
          ))}
        </Box>
      </Collapsible>
    </Box>
  )
})

export default DocumentView
