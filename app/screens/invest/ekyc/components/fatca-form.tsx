import React, { useCallback } from "react"
import { View } from 'react-native';
import { AppText } from "../../../../components/app-text/AppText"
import { presets } from "../../../../constants/presets"
import { Control, UseFormClearErrors, UseFormSetValue, UseFormWatch } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { ScaledSheet } from "react-native-size-matters"
import CustomCheckbox from "../../../../components/checkbox/custom-checkbox"
import { FATCA1, FATCA2, FATCA3 } from "../../constants"
import { FONT_REGULAR_12, FONT_REGULAR_14, MARGIN_TOP_8, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import EmptyHookForm from "../../../../components/empty-hook-form/empty-hook-form"

interface Props {
  control: Control
  errors: FieldErrors<FieldValues>
  clearErrors: UseFormClearErrors<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  watch: UseFormWatch<FieldValues>
}

interface ItemProp {
  title: string
  setOption(e: any): void
  value: string
}
const FATCA_OPTION = [
  {label: 'Có',value:'true'},
  {label: 'Không',value:'false'}
]
const FatcaItem = React.memo(({title, setOption, value}: ItemProp) => {
  return(
    <View style={styles.fatcaItem}>
      <AppText value={title} style={FONT_REGULAR_14}/>
      <View style={[ROW, SPACE_BETWEEN, {width: '40%'}, MARGIN_TOP_8]}>
        {FATCA_OPTION.map((val, index)=> {
          const isChecked = value === val.value
          return <CustomCheckbox isChecked={isChecked} onPress={()=> setOption(val.value)} textStyle={FONT_REGULAR_12} text={val.label} key={index}/>
        })}
      </View>
    </View>
  )
})

const FatcaForm = React.memo((props: Props) => {
  const {watch, setValue, errors, control, clearErrors} = props

  const setFatca1 = useCallback((value) => {
    setValue('fatca1', value)
    clearErrors('fatca1')
  },[])

  const setFatca2 = useCallback((value) => {
    setValue('fatca2', value)
    clearErrors('fatca2')
  },[])

  const setFatca3 = useCallback((value) => {
    setValue('fatca3', value)
    clearErrors('fatca3')
  },[])


  return (
    <View style={styles.container}>
      <AppText value={'IV. Xác nhận Quốc tịch Hoa Kỳ (U.S Citizen)'} style={presets.label} />
      <FatcaItem setOption={setFatca1} value={watch('fatca1')} title={FATCA1}/>
      <EmptyHookForm   {...{
        name: 'fatca1',
        control,
        error: errors?.fatca1?.message,
      }}/>

      <FatcaItem setOption={setFatca2} value={watch('fatca2')} title={FATCA2}/>
      <EmptyHookForm   {...{
        name: 'fatca2',
        control,
        error: errors?.fatca2?.message,
      }}/>

      <FatcaItem setOption={setFatca3} value={watch('fatca3')} title={FATCA3}/>
      <EmptyHookForm   {...{
        name: 'fatca3',
        control,
        error: errors?.fatca3?.message,
      }}/>
    </View>
  )
});

export default FatcaForm;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: "16@s",
    marginTop: '16@s',
  },
  fatcaItem: {
    marginTop: '24@s'
  }
});
