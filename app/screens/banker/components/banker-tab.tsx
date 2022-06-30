import { observer } from "mobx-react-lite"
import { HStack, Pressable, ScrollView } from "native-base"
import React, { useCallback, useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { map } from "../../../utils/lodash-utils"

interface Props {
  onChangeTab?: (key) => void
  data: any
  tab: any
}

const BankerTab = observer(({ onChangeTab, data, tab }: Props) => {
  const [tabSelected, setTabSelected] = useState(data?.[0]?.key)
  const onSelectTab = (key) => () => {
      setTabSelected?.(key)
      onChangeTab?.(key)
    }

  return (
    <HStack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: s(16) }}
      >
        {map(data, (status, index) => {
          const selected = tab === status.key
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

export default BankerTab
