import { Box, Pressable, IBoxProps } from "native-base"
import React, { useState } from "react"
import Collapsible from "react-native-collapsible"
import { s, vs } from "react-native-size-matters"
import { ChevronDownPrimarySvg, ChevronDownSvg } from "../../../assets/svgs"
import { Text } from "../../../components"

type Props = IBoxProps & {
  status?: "not-update" | "updated"
  type?: "confirm" | "reject"
  title: string
}

const DocumentView = React.memo(({ title, status = "not-update", ...props }: Props) => {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Box bg="white" borderRadius="8" {...props}>
      <Pressable
        flexDirection="row"
        p={vs(12)}
        alignItems="center"
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text
          fontWeight="400"
          color={!collapsed ? "primary" : "lightGray"}
          fontSize="12"
          lineHeight="17"
          flex="1"
          text={title}
        />
        {!!collapsed && (
          <Text
            fontWeight="400"
            color={status === "updated" ? "lightGray" : "orange"}
            fontSize="12"
            lineHeight="17"
            mr={s(8)}
            text={status === "updated" ? "đã cập nhật" : "chưa cập nhật"}
          />
        )}
        <Box style={!collapsed && { transform: [{ rotate: "180deg" }] }}>
          {collapsed ? <ChevronDownSvg /> : <ChevronDownPrimarySvg />}
        </Box>
      </Pressable>
      <Collapsible collapsed={collapsed}>
        <Box px={vs(12)} pb={vs(12)}>
          {props.children}
        </Box>
      </Collapsible>
    </Box>
  )
})

export default DocumentView
