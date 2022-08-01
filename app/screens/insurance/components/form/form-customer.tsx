import { yupResolver } from "@hookform/resolvers/yup"
import { Pressable, Row } from "native-base"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Alert, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { s, ScaledSheet } from "react-native-size-matters"
import * as Yup from "yup"
import { AppText } from "../../../../components/app-text/AppText"
import FormDatePicker from "../../../../components/form-date-time"
import FormInput from "../../../../components/form-input/form-input"
import FormItemPicker from "../../../../components/form-item-picker"
import { fontFamily } from "../../../../constants/font-family"
import { GENDER } from "../../../../constants/gender"
import { color } from "../../../../theme"
import {
  checkAge,
  EMPLOYEE_INSURANCE,
  IS_INSURANCE_CARD, RELATIONSHIP_INSURANCE
} from "../../constants"

interface Props {
  onSubmit?: (data) => void
  defaultValuesProps?: any
  listPackageStaff: any
  listPackageRelative: any
  onClose: any
  isEdit: boolean
  isStaff?: boolean
}

const FormCustomer = (props: Props) => {
  const {
    defaultValuesProps, listPackageStaff, listPackageRelative, onClose, isEdit, isStaff = false
  } = props

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
    defaultValues: { ...defaultValuesProps },
    mode: 'all',
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  useEffect(() => {
    if (defaultValuesProps && defaultValuesProps?.employeeBuy) {
      setPackages(
        defaultValuesProps.employeeBuy === "staff" ? listPackageStaff : listPackageRelative,
      )
      setValue('package', parseInt(defaultValuesProps.package));
    }
  }, [defaultValuesProps])

  const onSubmit = handleSubmit((data) => {
    const age = checkAge(getValues())

    if (age < minAge() || age >= 70) {
      Alert.alert("Tuổi chọn không hợp lệ")
      return
    }

    props?.onSubmit?.(data)
  })

  const minAge = () => {
    const employeeBuy = getValues('employeeBuy')
    return employeeBuy === 'staff' ? 18 : 1
  }

  useEffect(() => {
    const age = checkAge(getValues())

    if (age < minAge() || age >= 70) {
      Alert.alert("Tuổi chọn không hợp lệ")
    }
  }, [getValues()?.dateOfBirth])

  useEffect(() => {
    setValue('dateOfBirth', undefined);
    setValue('relationship', '')
  }, [getValues()?.employeeBuy, minAge()])

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
          {getValues().employeeBuy && <FormItemPicker
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
          />}
          <FormInput
            {...{
              name: "fullName",
              labelTx: "placeholder.insurance.fullName",
              placeholderTx: "placeholder.insurance.fullName",
              control,
              error: errors?.fullName?.message,
              editable: !isStaff
            }}
          />
          {getValues().employeeBuy &&
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
                  disable: isStaff
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
                  disable: isStaff
                }}
              />
            </Row>
          }
          <FormInput
            {...{
              name: "idNumber",
              labelTx: "placeholder.insurance.idNumber",
              placeholderTx: "placeholder.insurance.idNumber",
              control,
              keyboardType: "number-pad",
              style: { marginTop: 6 },
              error: undefined,
              editable: !isStaff
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
              editable: !isStaff
            }}
          />
          {(!isStaff && getValues().employeeBuy && getValues().employeeBuy !== 'staff') && <FormItemPicker
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
          />}
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
            <AppText color="white" value={isEdit ? "Cập nhập" : "Tạo"} />
          </Pressable>
        </Row>
      </View>
    </>
  )
}

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
