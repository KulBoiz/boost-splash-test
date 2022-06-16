import { Box, Spinner, HStack, Pressable } from "native-base"
import React from "react"
import Modal from "react-native-modal"
import { vs } from "react-native-size-matters"
import { ClosePopupSvg } from "../../assets/svgs"
import { TxKeyPath } from "../../i18n"
import { Text } from "../text/text"

interface Props {
  visible: boolean
  message?: string
  messageTx?: TxKeyPath
  onConfirm?: () => void
  onClose?: () => void
  type?: "confirm" | "reject"
  confirmText?: string
  rejectText?: string
  loading?: boolean
}

const PopupAlert = React.memo(
  ({
    visible,
    message,
    messageTx,
    onConfirm,
    onClose,
    type = "confirm",
    confirmText,
    rejectText,
    loading,
  }: Props) => {
    return (
      <Modal isVisible={visible}>
        <Box bg="white" borderRadius="8" p={vs(24)}>
          <Pressable onPress={onClose} position="absolute" top="-16" right="-16" zIndex={1}>
            <ClosePopupSvg />
          </Pressable>
          <Text color="ebony" fontSize="16" fontWeight="500" text={message} tx={messageTx} />
          <HStack mt={vs(24)}>
            <Pressable
              onPress={onClose}
              flex="1"
              bg="catskillWhite"
              h={vs(39)}
              borderRadius="5"
              alignItems="center"
              justifyContent="center"
              disabled={loading}
            >
              {rejectText ? (
                <Text fontSize={16} fontWeight="600" color="osloGray" text={rejectText} />
              ) : (
                <Text fontSize={16} fontWeight="600" color="osloGray" tx="common.cancel" />
              )}
            </Pressable>
            <Pressable
              onPress={onConfirm}
              flex="1"
              h={vs(39)}
              borderRadius="5"
              bg={type === "confirm" ? "primary" : "burntSienna"}
              alignItems="center"
              justifyContent="center"
              ml="4"
              disabled={loading}
            >
              {loading ? (
                <Spinner color="white" />
              ) : confirmText ? (
                <Text fontSize={16} fontWeight="600" color="white" text={confirmText} />
              ) : (
                <Text fontSize={16} fontWeight="600" color="white" tx="common.sure" />
              )}
            </Pressable>
          </HStack>
        </Box>
      </Modal>
    )
  },
)

export default PopupAlert
