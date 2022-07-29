import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import FormInput from "../../../components/form-input/form-input"
import {
  Control,
  UseFormClearErrors,
  UseFormSetValue,
} from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import FormDatePicker from "../../../components/form-date-time"
import { useStores } from "../../../models"
import FormItemPicker from "../../../components/form-item-picker"
import { ROW } from "../../../styles/common-style"

interface Props{
  control: Control
  setValue: UseFormSetValue<FieldValues>
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
}

const formatData = (array) => {
  return array?.map((val) => ({
    value: val?.id ?? "",
    label: val?.name?.replace(/\t/g, "") ?? "",
  }))
}

const IdentifyForm = React.memo((props: Props) => {
  const {locationStore} = useStores()
  const {control, setValue, errors, clearErrors } = props
  const [city, setCity] = useState()
  const [code, setCode] = useState()

  useEffect(()=> {
    locationStore.get("country", "VN").then((res) => {
      const idCountry = res?.data?.data?.[0]?.id
      setCode(idCountry)
      locationStore.get("state", undefined, idCountry).then((state) => {
        setCity(formatData(state.data?.data))
      })
    })
  },[])

  const handleSelectState = (state) => {
    clearErrors("province")
  }

  const onChangeSearchState = (value) => {
    locationStore.get("state", undefined, code, value).then((res) => {
      setCity(formatData(res.data?.data))
    })
  }
  return (
    <View style={styles.container}>
      <FormInput
        {...{
          name: "id",
          labelTx: "label.fullName",
          placeholderTx: "placeholder.insurance.fullName",
          control,
          error: errors?.fullName?.message,
          editable: false,
        }}
      />
      <View style={ROW}>
        <FormDatePicker
          {...{
            style:{flex:1},
            clearErrors,
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
            style:{flex:1, marginLeft: 15},
            name: "province",
            label: "Tỉnh / TP trực thuộc",
            placeholder: "Tỉnh / TP trực thuộc",
            control,
            setValue,
            error: errors?.province?.message,
            data: city,
            handleSelect: handleSelectState,
            onChangeSearchText: onChangeSearchState,
          }}
        />
      </View>

    </View>
  )
});

export default IdentifyForm;

const styles = StyleSheet.create({
  container: {},
});
