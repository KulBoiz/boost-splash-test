import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { AppText } from "../../../../components/app-text/AppText"
import FormInput from "../../../../components/form-input/form-input"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormItemPicker from "../../../../components/form-item-picker"
import { presets } from "../../../../constants/presets"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../../models"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}

const formatData = (array) => {
  return array?.map((val) => ({
    value: val?.id ?? "",
    label: val?.name?.replace(/\t/g, "") ?? "",
  }))
}
const country = [
  { label: "Việt Nam", value: "VN" },
]
const AddressForm = React.memo((props: Props) => {
  const { locationStore, agentStore, ekycStore } = useStores()
  const { user } = ekycStore

  const { control, errors, setValue, clearErrors, watch } = props
  const [province, setProvince] = useState([])
  const [townDistrict, setTownDistrict] = useState([])
  const [subDistrict, setSubDistrict] = useState([])
  const [code, setCode] = useState()

  useEffect(() => {
    locationStore.get("country", "VN").then((res) => {
      const idCountry = res?.data?.data?.[0]?.id
      setCode(idCountry)
      setValue("country", "VN")
      locationStore.get("state", undefined, idCountry).then((state) => {
        setProvince(formatData(state.data?.data))
        user?.stateId && setValue("province", user?.stateId)
      })
      if (user?.stateId){
        locationStore.get("town_district", undefined, user?.stateId).then((res) => {
          setTownDistrict(formatData(res?.data?.data))
          setValue("district", user?.districtId)
        })
      }
      if (user?.districtId) {
        locationStore.get("sub_district", undefined, user?.districtId).then((res) => {
          setSubDistrict(formatData(res?.data?.data))
        })
      }
      if (user?.subDistrictId) {
          setValue("commune", user?.subDistrictId)
      }
      setValue("address", user?.address ?? '')
    })
  }, [])

  const handleSelectState = (state) => {
    clearErrors("province")
    setValue("district", "")
    setValue("commune", "")
    setTownDistrict([])
    setSubDistrict([])
    agentStore.province(state?.label, state?.value)
    locationStore.get("town_district", undefined, state?.value).then((res) => {
      setTownDistrict(formatData(res?.data?.data))
    })
  }

  const handleSelectDistrict = (state) => {
    clearErrors("district")
    setValue("commune", "")
    setSubDistrict([])
    agentStore.district(state?.label, state?.value)
    locationStore.get("sub_district", undefined, state?.value).then((res) => {
      setSubDistrict(formatData(res.data?.data))
    })
  }

  const handleSelectCommune = (state) => {
    clearErrors("commune")
    agentStore.commune(state?.label, state?.value)
  }

  const onChangeSearchState = (value) => {
    locationStore.get("state", undefined, code, value).then((res) => {
      setProvince(formatData(res.data?.data))
    })
  }

  const onChangeSearchDistrict = (value) => {
    locationStore.get("town_district", undefined, watch("province"), value).then((res) => {
      setTownDistrict(formatData(res.data?.data))
    })
  }

  const onChangeSearchSubDistrict = (value) => {
    locationStore.get("sub_district", undefined, watch("district"), value).then((res) => {
      setSubDistrict(formatData(res.data?.data))
    })
  }

  return (
    <View style={styles.container}>
      <AppText value={"IV. Thông tin địa chỉ"} style={presets.label} />
      <FormInput
        {...{
          required: true,
          name: "address",
          label: "Địa chỉ thường chú",
          placeholder: "Địa chỉ",
          control,
          error: errors?.email?.message,
        }}
      />
        <FormItemPicker
          {...{
            required: true,
            name: "country",
            label: "Quốc gia",
            placeholder: "Quốc gia",
            control,
            setValue,
            error: errors?.country?.message,
            data: country,
            handleSelect: handleSelectState,
            onChangeSearchText: onChangeSearchState,
          }}
        />
        <FormItemPicker
          {...{
            required: true,
            name: "province",
            label: "Tỉnh/Thành",
            placeholder: "Tỉnh/Thành",
            control,
            setValue,
            error: errors?.province?.message,
            data: province,
            handleSelect: handleSelectState,
            onChangeSearchText: onChangeSearchState,
          }}
        />
        <FormItemPicker
          {...{
            required: true,
            name: "district",
            label: "Quận/Huyện",
            placeholder: "Quận/Huyện",
            control,
            setValue,
            error: errors?.district?.message,
            data: townDistrict,
            handleSelect: handleSelectDistrict,
            onChangeSearchText: onChangeSearchDistrict,
          }}
        />
        <FormItemPicker
          {...{
            required: true,
            name: "commune",
            label: "Phường/Xã",
            placeholder: "Phường/Xã",
            control,
            setValue,
            error: errors?.commune?.message,
            data: subDistrict,
            onChangeSearchText: onChangeSearchSubDistrict,
            handleSelect: handleSelectCommune,
          }}
        />
    </View>
  )
})

export default AddressForm

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@s",
    marginTop: '16@s',
  },
})
