import moment from "moment"
import numeral from "numeral"
import { Box, HStack, Pressable, ScrollView } from "native-base"
import React, { useCallback, useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { find } from "../../../utils/lodash-utils"
import { LOAN_STATUS_DATA } from "../constants"

interface Props {
  onChangeTab?: (key) => void
}

const BankerLoanTab = React.memo(({ onChangeTab }: Props) => {
  const [tabSelected, setTabSelected] = useState(LOAN_STATUS_DATA[0].key)

  const onSelectTab = useCallback(
    (key) => () => {
      setTabSelected(key)
      onChangeTab?.(key)
    },
    [onChangeTab],
  )

  return (
    <HStack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: s(16) }}
      >
        {LOAN_STATUS_DATA.map((status, index) => {
          const selected = tabSelected === status.key
          return (
            <Pressable
              onPress={onSelectTab(status.key)}
              key={index}
              mr={s(8)}
              height={vs(33)}
              borderRadius="5"
              borderWidth="1"
              px="2"
              borderColor="primary"
              alignItems="center"
              justifyContent="center"
              bg={selected ? "primary" : "transparent"}
            >
              <Text
                text={status.text}
                fontSize="12"
                fontWeight="500"
                color={selected ? "white" : "primary"}
              />
            </Pressable>
          )
        })}
      </ScrollView>
    </HStack>
  )
})

export default BankerLoanTab
