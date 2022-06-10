import { Box, HStack, Pressable } from "native-base"
import React, { useState } from "react"
import { Platform } from "react-native"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import BankerInput from "./banker-input"

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: (note) => void
}

const PopupReject = React.memo(({ visible, onClose, onConfirm }: Props) => {
  const [value, setValue] = useState("")
  return (
    <Modal isVisible={visible} onDismiss={() => setValue("")} avoidKeyboard={Platform.OS === "ios"}>
      <Box bg="white" borderRadius="8" p={s(24)}>
        <Text
          color="ebony"
          fontSize="16"
          fontWeight="500"
          text="Bạn có chắc muốn từ chối khoản vay này?"
          mb="6"
        />
        <BankerInput
          label="Lý do từ chối khoản vay"
          multiline
          _container={{ height: vs(65) }}
          _label={{ fontSize: 10, lineHeight: 14, fontWeight: 400 }}
          _labelContainer={{ justifyContent: "flex-start", pt: "1" }}
          required
          pt="3"
          height={vs(65)}
          value={value}
          onChangeText={setValue}
        />
        <HStack mt="6">
          <Pressable
            onPress={onClose}
            flex="1"
            bg="white"
            borderWidth="1"
            h={vs(39)}
            borderRadius="5"
            borderColor="primary"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize={16} fontWeight="600" color="primary" tx="common.cancel" />
          </Pressable>
          <Pressable
            onPress={() => onConfirm?.(value)}
            flex="1"
            h={vs(39)}
            borderRadius="5"
            bg={value ? "primary" : "grayChateau"}
            alignItems="center"
            justifyContent="center"
            ml="4"
            disabled={!value}
          >
            <Text fontSize={16} fontWeight="600" color="white" tx="common.sure" />
          </Pressable>
        </HStack>
      </Box>
    </Modal>
  )
})

export default PopupReject
