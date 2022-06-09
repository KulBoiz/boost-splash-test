import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import FormItemPicker from "../../../components/form-item-picker"
import { useStores } from "../../../models"
import { observer } from "mobx-react-lite";
import { get } from "lodash"

interface Props {
  control: Control
  errors: FieldErrors<any>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}

const AgentForm = observer((props: Props) => {
  const { bankStore, locationStore, authStoreModel, agentStore} = useStores()
  const { control, errors, setValue, watch } = props
  const [bankBranch, setBankBranch] = useState([])
  const [stateCountry, setStateCountry] = useState([])
  const [townDistrict, setTownDistrict] = useState([])
  const [subDistrict, setSubDistrict] = useState([])
  const [code, setCode] = useState()

  const email = get(authStoreModel?.user,'emails[0].email')
  const phone = get(authStoreModel?.user,'tels[0].tel')

  useEffect(() => {
    bankStore.getBankList();
    if (email){
      setValue('email', email)
    }
    if (phone){
      setValue('phone', phone)

    }
    locationStore.get('country', 'VN').then((res) => {
      const idCountry = res?.data?.data?.[0]?.id
      setCode(idCountry)
      locationStore.get('state', undefined, idCountry).then((state) => {
        setStateCountry(formatData(state.data?.data))
      })
    })
  }, [])

  const formatData = (array) => {
    return array?.map((val) => ({
      value: val.id,
      label: val.name
    }))
  }

  const listBank = () => {
    const banks = bankStore?.banks ?? []
    return formatData(banks)
  }

  const listBankBranch = () => {
    return formatData(bankStore?.bankBranches)
  }

  const handleSelectBank = (bank) => {
    agentStore.bankInfo(bank?.label)
    setValue('bankBranch', '');

    bankStore.getBankBranch(bank?.value).then((res) => {
      setBankBranch(formatData(res?.data))
    })
  }

  const handleSelectState = (state) => {
    locationStore.get('town_district', undefined, state?.value).then((res) => {
      setTownDistrict(formatData(res?.data?.data))
    })
  }

  const handleSelectDistrict = (state) => {
    locationStore.get('sub_district', undefined, state?.value).then((res) => {
      setSubDistrict(formatData(res.data?.data))
    })
  }

  const onChangeSearchBank = (value) => {
    bankStore.getBankList(value);
  }

  const onChangeSearchBankBranch = (value) => {
    bankStore.getBankBranch(watch('bankName'), value).then((res) => {
      setBankBranch(formatData(res?.data))
    })
  }

  const onChangeSearchState = (value) => {
    locationStore.get('state', undefined, code, value).then((res) => {
      setStateCountry(formatData(res.data?.data))
    })
  }

  const onChangeSearchDistrict = (value) => {
    locationStore.get('town_district', undefined, watch('province'), value).then((res) => {
      setTownDistrict(formatData(res.data?.data))
    })
  }

  const onChangeSearchSubDistrict = (value) => {
    locationStore.get('sub_district', undefined, watch('district'), value).then((res) => {
      setSubDistrict(formatData(res.data?.data))
    })
  }

  return (
    <View style={styles.container}>
        <FormInput
          {...{
            name: 'email',
            label: 'Email',
            placeholderTx: 'placeholder.email',
            control,
            error: errors?.email?.message,
            autoCapitalize: 'none'
          }}
        />
        <FormInput
          {...{
            name: 'phone',
            labelTx: 'label.phoneNumber',
            placeholderTx: 'placeholder.phone',
            control,
            error: errors?.phone?.message
          }}
        />
        <FormInput
          {...{
            name: 'bankNumber',
            label: 'Số tài khoản ngân hàng',
            placeholder: 'Nhập số tài khoản',
            keyboardType: 'number-pad',
            control,
            error: errors?.bankNumber?.message
          }}
        />
        <FormItemPicker
          {...{
            name: 'bankName',
            label: 'Tên ngân hàng',
            placeholder: 'Chọn ngân hàng',
            control,
            setValue,
            error: errors?.bankName?.message,
            data: listBank(),
            handleSelect: handleSelectBank,
            onChangeSearchText: onChangeSearchBank
          }}
        />
        {bankBranch && bankBranch.length > 0 && <FormItemPicker
          {...{
            data: listBankBranch(),
            name: 'bankBranch',
            label: 'Chi nhánh ngân hàng',
            placeholder: 'Chọn chi nhánh ngân hàng',
            control,
            setValue,
            error: errors?.bankBranch?.message,
            onChangeSearchText: onChangeSearchBankBranch
          }}
        />}

        <FormItemPicker
          {...{
            name: 'province',
            label: 'Tỉnh / TP trực thuộc',
            placeholder: 'Tỉnh / TP trực thuộc',
            control,
            setValue,
            error: errors?.province?.message,
            data: stateCountry,
            handleSelect: handleSelectState,
            onChangeSearchText: onChangeSearchState
          }}
        />
        <FormItemPicker
          {...{
            name: 'district',
            label: 'Quận / huyện',
            placeholder: 'Quận / huyện',
            control,
            setValue,
            error: errors?.district?.message,
            data: townDistrict,
            handleSelect: handleSelectDistrict,
            onChangeSearchText: onChangeSearchDistrict
          }}
        />
        <FormItemPicker
          {...{
            name: 'commune',
            label: 'Phường / xã',
            placeholder: 'Phường / xã',
            control,
            setValue,
            error: errors?.commune?.message,
            data: subDistrict,
            onChangeSearchText: onChangeSearchSubDistrict
          }}
        />
        <FormInput
          {...{
            name: 'address',
            label: 'Địa chỉ cụ thể',
            placeholder: 'Nhập số nhà và tên đường',
            control,
            error: errors?.address?.message
          }}
        />
      <View style={{height: 20}}/>
    </View>
  )
});

export default AgentForm;

const styles = StyleSheet.create({
  container: {},
});
