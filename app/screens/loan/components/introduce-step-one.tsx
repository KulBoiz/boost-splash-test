import React, { useState } from "react"
import { Alert, Keyboard, Pressable, View } from "react-native"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import FormInput from "../../../components/form-input/form-input"
import AppButton from "../../../components/app-button/AppButton"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { presets } from "../../../constants/presets"
import { color } from "../../../theme"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import i18n from "i18n-js"
import AppViewNoAuth from "../../../components/app-view-no-auth"
import TermCheckbox from "../../auth/components/TermCheckbox"

interface Props {
  nextStep(): void
}

const IntroduceStepOne = observer(({ nextStep }: Props) => {
  const { loanStore, authStoreModel } = useStores()
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required(i18n.t("errors.requireFullName")),
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email("Không đúng định dạng email"),
    phone: Yup.string().trim().required(i18n.t("errors.requirePhone")),
    address: Yup.string().trim(),
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const [checkboxState, setCheckboxState] = useState<boolean>(false)

  const sendRequest = async (data) => {
    if (authStoreModel.token) {
      const send = await loanStore.requestCounselling(
        data.fullName,
        data.email,
        data.phone,
        data.address,
      )
      if (send.kind === "ok") {
        nextStep()
      } else Alert.alert("Something went wrong")
    } else {
      const send = await loanStore.createRequestCounselling(
        data.email,
        data.fullName,
        data.phone,
        data.address,
      )
      if (send.kind === "ok") {
        nextStep()
      } else Alert.alert("Something went wrong")
    }
  }
  if (!authStoreModel.isLoggedIn) {
    return <AppViewNoAuth />
  }

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.body}>
        <FormInput
          {...{
            name: "fullName",
            placeholderTx: "placeholder.fullName",
            autoCapitalize: "none",
            control,
            labelTx: "label.fullName",
            error: errors?.fullName?.message,
          }}
        />
        <FormInput
          {...{
            name: "email",
            placeholderTx: "placeholder.email",
            autoCapitalize: "none",
            label: "Email",
            error: errors?.email?.message,
            control,
          }}
        />
        <FormInput
          {...{
            name: "phone",
            placeholderTx: "placeholder.phone",
            autoCapitalize: "none",
            labelTx: "label.phoneNumber",
            control,
            error: errors?.phone?.message,
            keyboardType: "number-pad",
          }}
        />
        <FormInput
          {...{
            name: "address",
            placeholderTx: "placeholder.address",
            autoCapitalize: "none",
            label: "Địa chỉ",
            error: errors?.address?.message,
            control,
          }}
        />
        <AppText tx={"guide.enterKeyword"} style={presets.note} />
        <TermCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
        <View style={styles.wrapBtn}>
          <AppButton
            tx={"common.sentInformation"}
            disable={!checkboxState}
            onPress={handleSubmit(sendRequest)}
          />
        </View>
      </View>
    </Pressable>
  )
})

export default IntroduceStepOne

IntroduceStepOne.displayName = "IntroduceStepOne"

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  banner: {
    borderRadius: "8@s",
    width: "90%",
    height: "95@s",
    marginVertical: "16@s",
    alignSelf: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: "16@s",
  },

  checkbox: {
    marginTop: "16@s",
  },
  wrapBtn: {
    justifyContent: "flex-end",
    flex: 1,
    paddingBottom: "30@s",
  },
})
