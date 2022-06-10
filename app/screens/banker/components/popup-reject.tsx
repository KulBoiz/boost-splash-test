import { Box, HStack, Pressable } from "native-base"
import React from "react"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import BankerInput from "./banker-input"

interface Props {
  visible: boolean
}

const PopupReject = React.memo(({ visible }: Props) => {
  return (
    <Modal isVisible={visible}>
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
        />
        <HStack mt="6">
          <Pressable
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
            flex="1"
            h={vs(39)}
            borderRadius="5"
            bg="primary"
            alignItems="center"
            justifyContent="center"
            ml="4"
          >
            <Text fontSize={16} fontWeight="600" color="white" tx="common.sure" />
          </Pressable>
        </HStack>
      </Box>
    </Modal>
  )
})

export default PopupReject
