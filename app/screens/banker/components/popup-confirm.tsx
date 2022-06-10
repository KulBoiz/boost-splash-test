import { Box, HStack, Pressable } from "native-base"
import React from "react"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import BankerInput from "./banker-input"

interface Props {
  visible: boolean
}

const PopupConfirm = React.memo(({ visible }: Props) => {
  return (
    <Modal isVisible={visible}>
      <Box bg="white" borderRadius="8" p={s(16)}>
        <Text
          textAlign="center"
          color="black"
          fontSize="16"
          fontWeight="500"
          text="Chào gói vay"
          mb="6"
        />
        <BankerInput label="Khả năng vay" prefix="vnđ" required />
        <BankerInput _container={{ mt: "5" }} label="Số năm cho vay" prefix="vnđ" required />
        <BankerInput _container={{ mt: "5" }} label="Lãi suất ưu đãi dự kiến" prefix="năm" />
        <BankerInput _container={{ mt: "5" }} label="Thời gian ưu đãi dự kiến" prefix="%" />
        <BankerInput _container={{ mt: "5" }} label="Phí trả trước hạn dự kiến" prefix="tháng" />
        <BankerInput
          _container={{ mt: "5", height: vs(63) }}
          multiline
          _labelContainer={{ justifyContent: "flex-start", pt: "1" }}
          label="Định giá tài sản sơ bộ dự kiến"
          height={vs(63)}
          pt="3"
        />
        <BankerInput
          _container={{ mt: "5", height: vs(63) }}
          multiline
          _labelContainer={{ justifyContent: "flex-start", pt: "1" }}
          label="Ghi chú"
          height={vs(63)}
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
            <Text fontSize={16} fontWeight="600" color="white" tx="common.confirm" />
          </Pressable>
        </HStack>
      </Box>
    </Modal>
  )
})

export default PopupConfirm
