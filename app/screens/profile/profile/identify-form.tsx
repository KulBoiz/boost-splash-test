import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import FormInput from "../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue } from "react-hook-form/dist/types/form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import FormDatePicker from "../../../components/form-date-time"
import { useStores } from "../../../models"
import FormItemPicker from "../../../components/form-item-picker"
import { MARGIN_TOP_8, ROW } from "../../../styles/common-style"
import CitizenIdentification from "../../settting/advance-information/citizen-identification"

interface Props {
  editable: boolean
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
  const { locationStore, authStoreModel } = useStores()
  const { control, setValue, errors, clearErrors, editable } = props
  const identification = authStoreModel?.user?.identification
  const [city, setCity] = useState()
  const [code, setCode] = useState()

  useEffect(() => {
    locationStore.get("country", "VN").then((res) => {
      const idCountry = res?.data?.data?.[0]?.id
      setCode(idCountry)
      locationStore.get("state", undefined, idCountry).then((state) => {
        setCity(formatData(state.data?.data))
      })
    })
  }, [])

  const handleSelectState = (state) => {
    clearErrors("placeOfIssue")
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
          name: "idNumber",
          label: "Số CMND / CCCD / Hộ chiếu",
          placeholder: "Số CMND / CCCD / Hộ chiếu",
          control,
          error: errors?.idNumber?.message,
          editable: editable,
        }}
      />
      <View style={ROW}>
        <FormDatePicker
          {...{
            style: { flex: 1 },
            clearErrors,
            name: "issuedOn",
            label: "Ngày cấp",
            placeholder: "Ngày cấp",
            setValue: setValue,
            control,
            error: errors?.issuedOn?.message,
            disable: !editable,
          }}
        />

        <FormItemPicker
          {...{
            style: { flex: 1, marginLeft: 15 },
            name: "placeOfIssue",
            label: "Nơi cấp",
            placeholder: "Nơi cấp",
            control,
            disable: !editable,
            setValue,
            error: errors?.placeOfIssue?.message,
            data: city,
            handleSelect: handleSelectState,
            onChangeSearchText: onChangeSearchState,
          }}
        />
      </View>
      {(identification?.backSidePhoto?.url && identification?.frontPhoto?.url) &&
        <CitizenIdentification
          style={MARGIN_TOP_8}
          backImage={identification?.backSidePhoto?.url}
          frontImage={identification?.frontPhoto?.url}
        />}

    </View>
  )
})

export default IdentifyForm

const styles = StyleSheet.create({
  container: {},
})
