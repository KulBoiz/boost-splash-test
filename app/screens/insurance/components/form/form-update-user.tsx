import { yupResolver } from "@hookform/resolvers/yup"
import { Pressable, Row } from "native-base"
import React from "react"
import { useForm } from "react-hook-form"
import { View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { s, ScaledSheet } from "react-native-size-matters"
import * as Yup from "yup"
import { AppText } from "../../../../components/app-text/AppText"
import FormDatePicker from "../../../../components/form-date-time"
import FormInput from "../../../../components/form-input/form-input"
import FormItemPicker from "../../../../components/form-item-picker"
import { fontFamily } from "../../../../constants/font-family"
import { GENDER } from "../../../../constants/gender"
import { useStores } from "../../../../models"
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"
import { MARGIN_BOTTOM_8, MARGIN_TOP_8 } from "../../../../styles/common-style"
import { color } from "../../../../theme"
// identification
interface Props {
  onSubmit?: (data) => void
  defaultValuesProps?: any
  onClose: any
}

const FormUpdateUser = (props: Props) => {
  const {
    defaultValuesProps, onClose = false
  } = props
  const { authStoreModel } = useStores()

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Vui lòng nhập họ và tên"),
    dateOfBirth: Yup.date()
      .required("Vui lòng nhập ngày sinh"),
    gender: Yup.string().required("Vui lòng chọn giới tính"),
    tel: Yup.string().required("Vui lòng nhập số điện thoại"),
    email: Yup.string().required("Vui lòng nhập số email"),
    issuedOn: Yup.string().required("Vui lòng chọn ngày cấp"),
    placeOfIssue: Yup.string().required("Vui lòng nhập số nơi cấp"),
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


  const onSubmit = handleSubmit((data) => {
    const body = {
      fullName: data.fullName,
      idNumber: data.idNumber,
      gender: data.gender,
      tels: [{ tel: data.tel}],
      emails: [{ email: data.email }],
      birthday: data?.dateOfBirth,
      identification: {
        issuedOn: data.issuedOn,
        placeOfIssue: data.placeOfIssue,
      }
    }

    authStoreModel.updateInfoUser(body).then(() => {
      authStoreModel.getFullInfoUser(authStoreModel?.userId)
      props?.onSubmit?.(body)
    })
  })

  return (
    <>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <AppText value={"CẬP NHẬP THÔNG TIN CHỦ HỢP ĐỒNG"} style={styles.title} />
          <AppText style={[MARGIN_TOP_8, MARGIN_BOTTOM_8]} color="red" value={'* Bạn cần cập nhật đầy đủ thông tin để có thể mua bảo hiểm'} />
          <FormInput
            {...{
              name: "fullName",
              labelTx: "placeholder.insurance.fullName",
              placeholderTx: "placeholder.insurance.fullName",
              control,
              error: errors?.fullName?.message,
              editable: false,
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
              error: undefined,
            }}
          />
          <Row>
            <FormDatePicker
              {...{
                clearErrors,
                style: { flex: 1, marginRight: 5 },
                name: 'issuedOn',
                label: "Ngày cấp",
                placeholderTx: "Ngày cấp",
                setValue: setValue,
                control,
                error: errors?.issuedOn?.message,
              }}
            />
            <FormInput
              {...{
                clearErrors,
                style: { flex: 1 },
                name: 'placeOfIssue',
                label: "Nơi cấp",
                placeholder: "Nơi cấp",
                control,
                error: errors?.placeOfIssue?.message,
              }}
            />
          </Row>
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
            onPress={() => {
              onClose();
              navigate(ScreenNames.HOME);
            }}
            style={styles.btn}
          >
            <AppText color="white" value={"Huỷ"} />
          </Pressable>
          <Pressable
            onPress={onSubmit}
            style={styles.btn}
          >
            <AppText color="white" value={"Cập nhập"} />
          </Pressable>
        </Row>
      </View>
    </>
  )
}

export default FormUpdateUser

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@ms",
    backgroundColor: color.background,
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
