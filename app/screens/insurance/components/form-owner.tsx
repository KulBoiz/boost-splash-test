import React, { useEffect } from "react"
import { View } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { ScaledSheet } from "react-native-size-matters"
import FormInput from "../../../components/form-input/form-input"
import { color } from "../../../theme"
import FormDatePicker from "../../../components/form-date-time"
import FormItemPicker from "../../../components/form-item-picker"
import { GENDER } from "../../../constants/gender"
import { Row } from "native-base"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

interface Props {
  isSubmitForm?: string
  onSubmit?: (data) => void
  defaultValues?: any
  onIsValid?: (value) => void
}

const FormOwner = React.memo((props: Props) => {
  const { isSubmitForm, defaultValues, onIsValid } = props

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    dateOfBirth: Yup.date()
      .required("Vui lòng nhập ngày sinh")
      .max(new Date(), "Ngày sinh không phù hợp"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    idNumber: Yup.string().required("Vui lòng nhập CMND/CCCD/Hộ chiếu"),
    tel: Yup.string().required("Vui lòng nhập số điện thoại"),
    company: Yup.string().required("Vui lòng nhập công ty"),
    level: Yup.string().required("Vui lòng nhập chức vụ"),
    email: Yup.string().trim().required("Vui lòng nhập email").email("Địa chỉ email không hợp lệ"),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    clearErrors
  } = useForm({
    delayError: 0,
    defaultValues,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  const onSubmit = handleSubmit((data) => {
    props?.onSubmit?.(data)
  })

  useEffect(() => {
    if (isSubmitForm) {
      onSubmit()
    }
    if (isValid) {
      onSubmit()
    }
  }, [isSubmitForm, isValid])

  useEffect(() => {
    onIsValid?.(isValid)
  }, [isValid])

  return (
    <>
      <View style={styles.container}>
        <AppText value={"THÔNG TIN CHỦ HỢP ĐỒNG"} style={styles.title} />
        <FormInput
          {...{
            name: "fullName",
            labelTx: "placeholder.insurance.fullName",
            placeholderTx: "placeholder.insurance.fullName",
            control,
            error: errors?.fullName?.message,
          }}
        />
        <Row>
          <FormDatePicker
            {...{
              style: { flex: 1, marginRight: 5 },
              name: "dateOfBirth",
              labelTx: "placeholder.insurance.dateOfBirth",
              placeholderTx: "placeholder.insurance.dateOfBirth",
              setValue: setValue,
              clearErrors,
              control,
              error: errors?.dateOfBirth?.message,
            }}
          />
          <FormItemPicker
            {...{
              clearErrors,
              style: { flex: 1 },
              data: GENDER,
              name: "gender",
              labelTx: "placeholder.insurance.gender",
              placeholderTx: "placeholder.insurance.gender",
              control,
              setValue: (key, value) => setValue("gender", value),
              error: errors?.gender?.message,
            }}
          />
        </Row>
        <FormInput
          {...{
            name: "email",
            label: "Email",
            placeholder: "Email",
            autoCapitalize: "none",
            control,
            error: errors?.email?.message,
            style: { marginTop: 6 },
          }}
        />
        <FormInput
          {...{
            name: "idNumber",
            labelTx: "placeholder.insurance.idNumber",
            placeholderTx: "placeholder.insurance.idNumber",
            control,
            error: errors?.idNumber?.message,
            keyboardType: "number-pad",
            style: { marginTop: 6 },
          }}
        />
        <FormInput
          {...{
            name: "tel",
            labelTx: "placeholder.insurance.tel",
            placeholderTx: "placeholder.insurance.tel",
            control,
            error: errors?.tel?.message,
            keyboardType: "number-pad",
            style: { marginTop: 6 },
          }}
        />
        <FormInput
          {...{
            name: "company",
            labelTx: "placeholder.insurance.company",
            placeholderTx: "placeholder.insurance.company",
            control,
            error: errors?.company?.message,
          }}
        />
        <FormInput
          {...{
            name: "level",
            labelTx: "placeholder.insurance.level",
            placeholderTx: "placeholder.insurance.level",
            control,
            error: errors?.level?.message,
          }}
        />
      </View>
    </>
  )
})

export default FormOwner

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@ms",
    backgroundColor: color.background,
    // marginTop: '24@s',
    paddingTop: "24@s",
    paddingBottom: "8@s",
  },
  title: {
    fontSize: "16@ms",
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    marginBottom: "8@s",
  },
})
