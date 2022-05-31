import React, { useEffect, useState } from "react"
import { View, StyleSheet } from 'react-native';
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import FormInput from "../../../components/form-input/form-input"
import FormItemPicker from "../../../components/form-item-picker"
import { useStores } from "../../../models"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { observer } from "mobx-react-lite";
import { get } from "lodash"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}

const AgentForm = observer((props: Props) => {
  // @ts-ignore
  const { bankStore, locationStore, authStoreModel, agentStore} = useStores()
  const { control, errors, setValue } = props
  const [bank, setBank] = useState([])
  const [stateCountry, setStateCountry] = useState([])
  const [townDistrict, setTownDistrict] = useState([])
  const [subDistrict, setSubDistrict] = useState([])

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

      locationStore.get('state', undefined, idCountry).then((state) => {
        setStateCountry(state.data?.data?.map((val) => ({
          value: val.id,
          label: val.name
        })))
      })
    })
  }, [])

  const listBank = () => {
    const banks = bankStore?.banks ?? []
    return banks?.map((val) => ({
      value: val.id,
      label: val.name
    }))
  }

  const listBankBranch = () => {
    return bankStore?.bankBranches?.map((val) => ({
      value: val.id,
      label: val.name
    }))
  }

  const handleSelectBank = (bank) => {
    agentStore.bankInfo(bank?.label)
    setValue('bankBranch', '');

    bankStore.getBankBranch(bank?.value).then((res) => {
      setBank(res?.data?.map((val) => ({
        value: val.id,
        label: val.name
      })))
    })
  }

  const handleSelectState = (state) => {
    locationStore.get('town_district', undefined, state?.value).then((res) => {
      setTownDistrict(res.data?.data?.map((val) => ({
        value: val.id,
        label: val.name
      })))
    })
  }

  const handleSelectDistrict = (state) => {
    locationStore.get('sub_district', undefined, state?.value).then((res) => {
      setSubDistrict(res.data?.data?.map((val) => ({
        value: val.id,
        label: val.name
      })))
    })
  }
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
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
            handleSelect: handleSelectBank
          }}
        />
        {bank && bank.length > 0 && <FormItemPicker
          {...{
            data: listBankBranch(),
            name: 'bankBranch',
            label: 'Chi nhánh ngân hàng',
            placeholder: 'Chọn chi nhánh ngân hàng',
            control,
            setValue,
            error: errors?.bankBranch?.message
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
            handleSelect: handleSelectState
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
            handleSelect: handleSelectDistrict
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
      </KeyboardAwareScrollView>
    </View>
  )
});

export default AgentForm;

const styles = StyleSheet.create({
  container: {},
});
