import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import { fontFamily } from "../../../../constants/font-family"
import { ScaledSheet, s } from "react-native-size-matters"
import FormInput from "../../../../components/form-input/form-input"
import { color } from "../../../../theme"
import FormDatePicker from "../../../../components/form-date-time"
import FormItemPicker from "../../../../components/form-item-picker"
import { GENDER } from "../../../../constants/gender"
import { Row, Pressable } from "native-base"
import {
  EMPLOYEE_INSURANCE,
  IS_INSURANCE_CARD,
  PACKAGES_INSURANCE_RELATIVE,
  PACKAGES_INSURANCE_STAFF,
  RELATIONSHIP_INSURANCE,
} from "../../constants"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { isEmpty } from "lodash"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import colors from "native-base/lib/typescript/theme/base/colors"

interface Props {
  onSubmit?: (data) => void
  defaultValues?: any
  listPackageStaff: any
  listPackageRelative: any
  onClose: () => void
}

const FormCustomer = React.memo((props: Props) => {
  const { defaultValues, listPackageStaff, listPackageRelative, onClose } = props

  const [packages, setPackages] = useState<any>([])

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    dateOfBirth: Yup.date()
      .required("Vui lòng nhập ngày sinh"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    tel: Yup.string().required("Vui lòng nhập số điện thoại"),
    employeeBuy: Yup.string().required("Vui lòng chọn"),
    package: Yup.string().required("Vui lòng chọn loại bảo hiểm"),
  })
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    clearErrors
  } = useForm({
    delayError: 0,
    defaultValues,
    mode: 'all',
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  const onSubmit = handleSubmit((data) => {
    props?.onSubmit?.(data)
  })

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <AppText value={"THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM"} style={styles.title} />
          <FormItemPicker
            {...{
              clearErrors,
              style: { flex: 1 },
              data: EMPLOYEE_INSURANCE,
              name: "employeeBuy",
              labelTx: "placeholder.insurance.employeeBuy",
              placeholderTx: "placeholder.insurance.employeeBuy",
              control,
              setValue: (key, value) => {
                setValue("employeeBuy", value)
                setValue("package", undefined)
                setPackages(
                  value === "staff" ? listPackageStaff : listPackageRelative,
                )
              },
              error: errors?.employeeBuy?.message,
            }}
          />
          <FormItemPicker
            {...{
              clearErrors,
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
                clearErrors,
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
              name: "idNumber",
              labelTx: "placeholder.insurance.idNumber",
              placeholderTx: "placeholder.insurance.idNumber",
              control,
              keyboardType: "number-pad",
              style: { marginTop: 6 },
              error: undefined
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
              clearErrors,
              style: { flex: 1 },
              data: RELATIONSHIP_INSURANCE,
              name: "relationship",
              labelTx: "placeholder.insurance.relationship",
              placeholderTx: "placeholder.insurance.relationship",
              control,
              setValue: (key, value) => setValue("relationship", value),
              error: undefined
            }}
          />
          <FormItemPicker
            {...{
              clearErrors,
              style: { flex: 1 },
              data: IS_INSURANCE_CARD,
              name: "isInsuranceCard",
              labelTx: "placeholder.insurance.isInsuranceCard",
              placeholderTx: "placeholder.insurance.isInsuranceCard",
              control,
              setValue: (key, value) => setValue("isInsuranceCard", value),
              error: undefined
            }}
          />
          <FormInput
            {...{
              name: "email",
              label: "Email",
              placeholder: "Email",
              autoCapitalize: "none",
              control,
              style: { marginTop: 6 },
              error: undefined
            }}
          />
        </KeyboardAwareScrollView>
        <Row style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Pressable
            onPress={onClose}
            style={styles.btn}
          >
            <AppText color="white" value={"Huỷ"} />
          </Pressable>
          <Pressable
            onPress={onSubmit}
            style={styles.btn}
          >
            <AppText color="white" value={"Tạo"} />
          </Pressable>
        </Row>
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
    borderRadius: s(8)
  },
  title: {
    fontSize: "16@ms",
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    marginBottom: "8@s",
  },
  btn: {
    width: '120@s',
    height: '40@s',
    backgroundColor: color.palette.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8@s'
  }
})
