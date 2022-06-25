import { yupResolver } from "@hookform/resolvers/yup"
import { Box, HStack, Pressable } from "native-base"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import * as Yup from "yup"
import { Text } from "../../../components"
import FormDatePicker from "../../../components/form-date-time"
import FormInput from "../../../components/form-input/form-input"


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
    disbursedAmount: Yup.string().trim().required("Vui lòng nhập"),
    paymentDate: Yup.string().required("Vui lòng nhập").trim(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    delayError: 0,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  const inputProps = {
    control,
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
              text="Giải ngân"
              mb="6"
            />
            <FormInput
              {...{
                name: "disbursedAmount",
                label: "Số tiền phê duyệt",
                error: errors?.disbursedAmount?.message,
                ...inputProps,
                keyboardType: 'number-pad'
              }}
            />
            <FormDatePicker
              {...{
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
        </KeyboardAwareScrollView>
      </Box>
    </Modal>
  )
})

export default PopupCreateTransaction
