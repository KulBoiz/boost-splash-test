import { Box, HStack, Pressable } from "native-base"
import React, { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"

import FormInput from "../../../components/form-input/form-input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm?: (data) => void
}

const PopupEditLoanResult = React.memo(({ visible, onClose, onConfirm }: Props) => {
  const [data, setData] = useState<any>({
    loanDemand: "",
    borrowTime: "",
    interestRate: "",
    preferentialTime: "",
    prepaidTermFee: "",
    propertyValuation: "",
    bankNote: "",
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().required("Vui lòng nhập email hoặc số điện thoại"),
    password: Yup.string().required("Vui lòng nhập mật khẩu").trim(),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    delayError: 0,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const inputProps = {
    control,
    inputStyle: { height: 40 },
    style: { marginTop: 4 },
  }

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} onDismiss={() => setData({})}>
      <Box>
        <KeyboardAwareScrollView>
          <Box bg="white" borderRadius="8" p={s(16)}>
            <Text
              textAlign="center"
              color="black"
              fontSize="16"
              fontWeight="500"
              text="Kết quả"
              mb="6"
            />
            <FormInput
              {...{
                name: "amount",
                label: "Số tiền phê duyệt",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "time",
                label: "Thời gian vay",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "date",
                label: "Ngày phê duyệt",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "bank",
                label: "Mã hồ sơ phía ngân hàng",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "customer",
                label: "Mã khách hàng phía ngân hàng",
                error: errors?.product?.message,
                ...inputProps,
              }}
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
                onPress={handleSubmit(onConfirm)}
                flex="1"
                h={vs(39)}
                borderRadius="5"
                bg={isValid ? "primary" : "grayChateau"}
                alignItems="center"
                justifyContent="center"
                ml="4"
                disabled={!isValid}
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

export default PopupEditLoanResult
