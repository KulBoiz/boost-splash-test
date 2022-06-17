import { Box, HStack, Pressable } from "native-base"
import React, { useEffect, useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Modal from "react-native-modal"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../../components"

import FormInput from "../../../components/form-input/form-input"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import FormDatePicker from "../../../components/form-date-time"

interface Props {
  visible: boolean
  onClose: () => void
  onConfirm?: (data) => void
  data: any
}

const PopupEditLoanResult = React.memo(({ visible, onClose, onConfirm, data: dataBank }: Props) => {
  const [data, setData] = useState<any>({
    approvalAmount: "",
    borrowTime: "",
    approvalDate: "",
    codeBankProfile: "",
    codeBankCustomer: "",
  })

  const validationSchema = Yup.object().shape({
    // approvalAmount: Yup.string().trim().required("Vui lòng nhập"),
    // borrowTime: Yup.string().required("Vui lòng nhập").trim(),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm({
    delayError: 0,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })

  useEffect(() => {
    setValue('approvalAmount', dataBank?.approvalAmount?.toString() || '')
    setValue('borrowTime', dataBank?.borrowTime?.toString() ||  '')
    setValue('approvalDate', dataBank?.approvalDate)
    setValue('codeBankProfile', dataBank?.codeBankProfile)
    setValue('codeBankCustomer', dataBank?.codeBankCustomer)
  }, [])

  const inputProps = {
    control,
    // inputStyle: { height: 40 },
    // style: { marginTop: 4 },
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
                name: "approvalAmount",
                label: "Số tiền phê duyệt",
                error: errors?.approvalAmount?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "borrowTime",
                label: "Thời gian vay",
                error: errors?.borrowTime?.message,
                ...inputProps,
              }}
            />
            {/* <FormInput
              {...{
                name: "date",
                label: "Ngày phê duyệt",
                error: errors?.product?.message,
                ...inputProps,
              }}
            /> */}
            <FormDatePicker
              {...{
                // style: { flex: 1, marginRight: 5 },
                name: 'approvalDate',
                label: "Ngày phê duyệt",
                placeholder: 'DD/MM/YYYY',
                setValue: setValue,
                ...inputProps,
                error: errors?.approvalDate?.message
              }}
            />
            <FormInput
              {...{
                name: "codeBankProfile",
                label: "Mã hồ sơ phía ngân hàng",
                error: errors?.codeBankProfile?.message,
                ...inputProps,
              }}
            />
            <FormInput
              {...{
                name: "codeBankCustomer",
                label: "Mã khách hàng phía ngân hàng",
                error: errors?.codeBankCustomer?.message,
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

export default PopupEditLoanResult
