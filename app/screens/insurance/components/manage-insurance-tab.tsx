import { observer } from "mobx-react-lite"
import { Box, HStack, Pressable, ScrollView } from "native-base"
import React, { useCallback, useState } from "react"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import { useStores } from "../../../models"

interface Props {
  onChangeTab?: (key) => void
}

const ManageInsuranceTab = observer(({ onChangeTab }: Props) => {
  const {} = useStores()

  const data = [
    { key: "1", text: "Danh sách bảo hiểm" },
    { key: "line" },
    { key: "2", text: "Yêu cầu bồi thường" },
  ]
  const [tabSelect, setTabSelect] = useState(data[0].key)

  const onSelectTab = useCallback(
    (key) => () => {
      setTabSelect(key)
      onChangeTab?.(key)
    },
    [onChangeTab],
  )

  return (
    <HStack>
      {data.map((status, index) => {
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
          </Pressable>
        )
      })}
    </HStack>
  )
})

export default ManageInsuranceTab
