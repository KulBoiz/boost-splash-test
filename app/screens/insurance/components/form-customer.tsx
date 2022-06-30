import React, { useEffect, useState } from "react"
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
import {
  EMPLOYEE_INSURANCE,
  IS_INSURANCE_CARD,
  PACKAGES_INSURANCE_RELATIVE,
  PACKAGES_INSURANCE_STAFF,
  RELATIONSHIP_INSURANCE,
} from "../constants"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

interface Props {
  isSubmitForm?: string
  onSubmit?: (data) => void
  onIsValid?: (value) => void
  defaultValues?: any
}

const FormCustomer = React.memo((props: Props) => {
  const { isSubmitForm, defaultValues, onIsValid } = props

  const [packages, setPackages] = useState<any>([])

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    dateOfBirth: Yup.date()
      .required("Vui lòng nhập ngày sinh")
      .max(new Date(), "Ngày sinh không phù hợp"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    idNumber: Yup.string().required("Vui lòng nhập CMND/CCCD/Hộ chiếu"),
    tel: Yup.string().required("Vui lòng nhập số điện thoại"),
    employeeBuy: Yup.string().required("Vui lòng chọn"),
    package: Yup.string().required("Vui lòng chọn loại bảo hiểm"),
    relationship: Yup.string().required("Vui lòng chọn quan hệ chủ hợp đống"),
    isInsuranceCard: Yup.string().required("Vui lòng chọn"),
    email: Yup.string().trim().required("Vui lòng nhập email").email("Địa chỉ email không hợp lệ"),
  })
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    setValue,
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
        <AppText value={"THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM"} style={styles.title} />
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
              control,
              error: errors?.dateOfBirth?.message,
            }}
          />
          <FormItemPicker
            {...{
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
        <FormItemPicker
          {...{
            style: { flex: 1 },
            data: EMPLOYEE_INSURANCE,
            name: "employeeBuy",
            labelTx: "placeholder.insurance.employeeBuy",
            placeholderTx: "placeholder.insurance.employeeBuy",
            control,
            setValue: (key, value) => {
              setValue("employeeBuy", value)
              setPackages(
                value === "staff" ? PACKAGES_INSURANCE_STAFF : PACKAGES_INSURANCE_RELATIVE,
              )
            },
            error: errors?.employeeBuy?.message,
          }}
        />
        <FormItemPicker
          {...{
            style: { flex: 1 },
            data: packages,
            name: "package",
            labelTx: "placeholder.insurance.package",
            placeholderTx: "placeholder.insurance.package",
            control,
            setValue: (key, value) => setValue("package", value),
            error: errors?.package?.message,
          }}
        />
        <FormItemPicker
          {...{
            style: { flex: 1 },
            data: RELATIONSHIP_INSURANCE,
            name: "relationship",
            labelTx: "placeholder.insurance.relationship",
            placeholderTx: "placeholder.insurance.relationship",
            control,
            setValue: (key, value) => setValue("relationship", value),
            error: errors?.relationship?.message,
          }}
        />
        <FormItemPicker
          {...{
            style: { flex: 1 },
            data: IS_INSURANCE_CARD,
            name: "isInsuranceCard",
            labelTx: "placeholder.insurance.isInsuranceCard",
            placeholderTx: "placeholder.insurance.isInsuranceCard",
            control,
            setValue: (key, value) => setValue("isInsuranceCard", value),
            error: errors?.isInsuranceCard?.message,
          }}
        />
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
      </View>
    </>
  )
})

export default FormCustomer

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@ms",
    backgroundColor: color.background,
    // marginTop: '24@s',
    paddingTop: "24@s",
    paddingVertical: 8,
  },
  title: {
    fontSize: "16@ms",
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    marginBottom: "8@s",
  },
})
