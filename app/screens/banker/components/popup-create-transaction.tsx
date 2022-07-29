import { yupResolver } from "@hookform/resolvers/yup"
import { Box, HStack, Pressable, ScrollView } from "native-base"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import * as Yup from "yup"
import { Text } from "../../../components"
import FormDatePicker from "../../../components/form-date-time"
import FormInput from "../../../components/form-input/form-input"
import { createNumberMask, useMaskedInputProps } from "react-native-mask-input"
import { notZeroOnly } from "../../../constants/regex"


interface Props {
  visible: boolean
  onClose: () => void
  onConfirm?: (data) => void
  data: any
}

const PopupCreateTransaction = React.memo(({ visible, onClose, onConfirm, data: dataBank }: Props) => {
  const [data, setData] = useState<any>({
    disbursedAmount: "",
    paymentDate: "",
  })

  const validationSchema = Yup.object().shape({
    disbursedAmount: Yup.string()
      .trim()
      .required("Vui lòng nhập")
      .matches(notZeroOnly, 'Số tiền giải ngân phải lớn hơn 0'),
    paymentDate: Yup.string().required("Vui lòng nhập").trim(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm({
    delayError: 0,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const inputProps = {
    control,
  }

  const currencyMask = createNumberMask({
    delimiter: ",",
    precision: 0,
  })

  const currencyInputProps = useMaskedInputProps({
    value: watch("disbursedAmount"),
    onChangeText: (value) => {setValue("disbursedAmount", value); clearErrors('disbursedAmount')},
    mask: currencyMask,
  })

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} onDismiss={() => setData({})}>
      <Box>
        <ScrollView>
          <Box bg="white" borderRadius="8" p={s(16)}>
            <Text
              textAlign="center"
              color="black"
              fontSize="16"
              fontWeight="500"
              text="Giải ngân"
              mb="6"
            />
            <FormInput
              {...{
                name: "disbursedAmount",
                label: "Số tiền phê duyệt",
                error: errors?.disbursedAmount?.message,
                ...inputProps,
                ...currencyInputProps,
                keyboardType: 'number-pad',
              }}
            />
            <FormDatePicker
              {...{
                clearErrors,
                name: "paymentDate",
                label: "Ngày phê duyệt",
                placeholder: "DD/MM/YYYY",
                setValue: setValue,
                ...inputProps,
                error: errors?.paymentDate?.message,
                isMaximumDate: false,
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
                // @ts-ignore
                onPress={handleSubmit(onConfirm)}
                flex="1"
                h={vs(39)}
                borderRadius="5"
                bg={"primary"}
                alignItems="center"
                justifyContent="center"
                ml="4"
              >
                <Text fontSize={16} fontWeight="600" color="white" tx="common.confirm" />
              </Pressable>
            </HStack>
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  )
})

export default PopupCreateTransaction
