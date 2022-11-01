import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from "yup"
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import FormInput from "../../../components/form-input/form-input"

interface Props{}

const SyncAccount = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    tel: Yup.string().required(i18n.t("errors.requirePhone")),
    idNumber: Yup.string().required(i18n.t("errors.requireCitizenIdentification")),
  })
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    clearErrors,
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          required: true,
          name: 'tel',
          labelTx: 'label.phoneNumber',
          placeholderTx: 'placeholder.phone',
          control,
          error: errors?.tel?.message,
        }}
      />
      <FormInput
      {...{
        required: true,
        name: 'idNumber',
        labelTx: 'label.citizenIdentification',
        placeholderTx: 'placeholder.citizenIdentification',
        control,
        error: errors?.idNumber?.message,
      }}
    />
    </View>
  )
});

export default SyncAccount;

const styles = StyleSheet.create({
    container: {},
});
