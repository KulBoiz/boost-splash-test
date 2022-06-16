import { observer } from "mobx-react-lite"
import { Box, HStack, Pressable, ScrollView } from "native-base"
import React, { useCallback, useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { INSURANCE_TABS } from "../constants"

interface Props {
  tabSelect?: string
  onChangeTab?: (key) => void
}

const ManageInsuranceTab = observer(({ onChangeTab, tabSelect }: Props) => {
  const onSelectTab = useCallback(
    (key) => () => {
      onChangeTab?.(key)
    },
    [onChangeTab],
  )

  return (
    <HStack>
      {INSURANCE_TABS.map((status, index) => {
        if (status.key === "line") {
          return <Box height={17} borderLeftWidth={1} borderLeftColor="#DCDDDF" mt="4" />
        }
        const selected = tabSelect === status.key
        return (
          <Pressable
            onPress={onSelectTab(status.key)}
            key={index}
            height={50}
            flex="1"
            px="2"
            borderColor="primary"
            alignItems="center"
            justifyContent="center"
            borderBottomWidth="1"
            borderBottomColor={selected ? "primary" : "#DCDDDF"}
          >
            <Text text={status.text} size="medium12" color={selected ? "primary" : "ebony"} />
            <Box
              position="absolute"
              right="0"
              height={17}
              borderLeftWidth={1}
              borderLeftColor="#DCDDDF"
              mt="4"
            />
          </Pressable>
        )
      })}
    </HStack>
  )
})

export default ManageInsuranceTab
