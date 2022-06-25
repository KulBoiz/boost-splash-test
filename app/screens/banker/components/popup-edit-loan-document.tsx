import { Box, HStack, Pressable, ScrollView } from "native-base"
import React, { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"

import FormInput from "../../../components/form-input/form-input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { createNumberMask, useMaskedInputProps } from "react-native-mask-input"

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm: (data) => void
}

const PopupEditLoanDocument = React.memo(({ visible, onClose, onConfirm }: Props) => {
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
    product: Yup.string().trim().required("Vui lòng nhập sản phẩm"),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
    setValue,
  } = useForm({
    delayError: 0,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const inputProps: any = {
    control,
    // inputStyle: { height: 40 },
    // style: { marginTop: 4 },
  }

  const currencyMask = createNumberMask({
    delimiter: ",",
    precision: 0,
  })

  const currencyInputProps = useMaskedInputProps({
    value: getValues("approvalAmount"),
    onChangeText: (value) => setValue("approvalAmount", value),
    mask: currencyMask,
  })

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
              text="Hồ sơ vay"
              mb="1"
            />
            <FormInput
              {...{
                name: "product",
                label: "Sản phẩm",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "sp",
                label: "Mã SP CĐT",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "code",
                label: "Mã căn hộ",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "address",
                label: "Địa chỉ",
                error: errors?.product?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "money",
                label: "Số tiền khách yêu cầu vay",
                error: errors?.product?.message,
                ...inputProps,
                keyboardType: "number-pad",
                returnKeyType: "done",
                ...currencyInputProps,
              }}
            />
            <FormInput
              {...{
                name: "time",
                label: "Thời gian vay",
                placeholder: "Nhập số tháng vay",
                error: errors?.product?.message,
                ...inputProps,
                keyboardType: "number-pad",
                returnKeyType: "done",
              }}
            />
            <FormInput
              {...{
                name: "created_at",
                label: "Thời gian tạo",
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

export default PopupEditLoanDocument
