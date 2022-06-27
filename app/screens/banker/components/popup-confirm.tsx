import { Box, HStack, Pressable } from "native-base"
import React, { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { createNumberMask, useMaskedInputProps } from "react-native-mask-input"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"
import BankerInput from "./banker-input"

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: (data) => void
}

const PopupConfirm = React.memo(({ visible, onClose, onConfirm }: Props) => {
  const [data, setData] = useState<any>({
    loanDemand: "",
    borrowTime: "",
    interestRate: "",
    preferentialTime: "",
    prepaidTermFee: "",
    propertyValuation: "",
    bankNote: "",
  })
  const buttonDisabled = !data?.loanDemand || !data?.borrowTime

  const currencyMask = createNumberMask({
    delimiter: ",",
    precision: 0,
  })

  const loanDemandMaskedInputProps = useMaskedInputProps({
    value: data.loanDemand,
    onChangeText: (value) => setData({ ...data, loanDemand: value }),
    mask: currencyMask,
  })
  const prepaidTermFeedMaskedInputProps = useMaskedInputProps({
    value: data.prepaidTermFee,
    onChangeText: (value) => setData({ ...data, prepaidTermFee: value }),
    mask: currencyMask,
  })

  return (
    <Modal isVisible={visible} onDismiss={() => setData({})}>
      <Box>
        <KeyboardAwareScrollView>
          <Box bg="white" borderRadius="8" p={s(16)}>
            <Text
              textAlign="center"
              color="black"
              fontSize="16"
              fontWeight="500"
              text="Chào gói vay"
              mb="6"
            />
            <BankerInput
              label="Khả năng vay"
              prefix="vnđ"
              required
              keyboardType="number-pad"
              {...loanDemandMaskedInputProps}
            />
            <BankerInput
              _container={{ mt: "5" }}
              label="Số tháng cho vay"
              prefix="tháng"
              required
              keyboardType="number-pad"
              value={data.borrowTime}
              onChangeText={(value) => setData({ ...data, borrowTime: value })}
            />
            <BankerInput
              _container={{ mt: "5" }}
              label="Lãi suất ưu đãi dự kiến"
              prefix="%"
              keyboardType="number-pad"
              value={data.interestRate}
              onChangeText={(value) => setData({ ...data, interestRate: value })}
            />
            <BankerInput
              _container={{ mt: "5" }}
              label="Thời gian ưu đãi dự kiến"
              prefix="tháng"
              keyboardType="number-pad"
              value={data.preferentialTime}
              onChangeText={(value) => setData({ ...data, preferentialTime: value })}
            />
            <BankerInput
              _container={{ mt: "5" }}
              label="Phí trả trước hạn dự kiến"
              prefix="vnđ"
              keyboardType="number-pad"
              {...prepaidTermFeedMaskedInputProps}
            />
            <BankerInput
              _container={{ mt: "5", height: vs(63) }}
              multiline
              _labelContainer={{ justifyContent: "flex-start", pt: "1" }}
              label="Định giá tài sản sơ bộ dự kiến"
              height={vs(63)}
              pt="3"
              value={data.propertyValuation}
              onChangeText={(value) => setData({ ...data, propertyValuation: value })}
            />
            <BankerInput
              _container={{ mt: "5", height: vs(63) }}
              multiline
              _labelContainer={{ justifyContent: "flex-start", pt: "1" }}
              label="Ghi chú"
              height={vs(63)}
              pt="3"
              value={data.bankNote}
              onChangeText={(value) => setData({ ...data, bankNote: value })}
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
                onPress={() => onConfirm(data)}
                flex="1"
                h={vs(39)}
                borderRadius="5"
                bg={!buttonDisabled ? "primary" : "grayChateau"}
                alignItems="center"
                justifyContent="center"
                ml="4"
                disabled={buttonDisabled}
              >
                <Text fontSize={16} fontWeight="600" color="white" tx="common.confirm" />
              </Pressable>
            </HStack>
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </Modal>
  )
})

export default PopupConfirm
