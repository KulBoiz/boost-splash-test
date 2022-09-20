import React, { useState } from 'react';
import { Alert, ScrollView, View, Linking } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import AppHeader from "../../components/app-header/AppHeader"
import * as Yup from "yup"
import { useStores } from '../../models';
import i18n from "i18n-js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import AppViewNoAuth from '../../components/app-view-no-auth';
import FormInput from '../../components/form-input/form-input';
import TermCheckbox from '../auth/components/TermCheckbox';
import AppButton from '../../components/app-button/AppButton';
import FormItemPicker from '../../components/form-item-picker';
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import CollapsibleClaimUpload from './components/collapsible-claim-upload';
import { RouteProp, useRoute } from "@react-navigation/native"
import { AppText } from "../../components/app-text/AppText"
import { fontFamily } from "../../constants/font-family"
import { NavigatorParamList } from "../../navigators/params-list"
import { debounce } from "lodash"


export const USER_RELATIONSHIP = {
  FATHER: 'father',
  MOTHER: 'mother',
  CHILD: 'child',
  WIFE: 'wife',
  HUSBAND: 'husband',
  SIBLINGS: 'siblings',
  FRIEND: 'friend',
  AUNT_AND_UNCLE: 'aunt_and_uncle',
  OTHER: 'other',
};

interface Props { }

const ClaimInsuranceDetailScreen = React.memo((props: Props) => {
  const {params: {productId, index}} = useRoute<RouteProp<NavigatorParamList, ScreenNames.CLAIM_INSURANCE>>()
  const { loanStore, authStoreModel, insuranceStore, appStore} = useStores()
  const id = insuranceStore?.listBuy[index]?.id
  const metadata = {...insuranceStore?.listBuy[index]?.meta, dealId: id}

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().trim().required(i18n.t("errors.requireFullName")),
    email: Yup.string()
      .trim()
      .required(i18n.t("errors.requireEmail"))
      .email("Không đúng định dạng email"),
    phone: Yup.string().trim().required(i18n.t("errors.requirePhone")),
    note: Yup.string().trim(),
  })
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [checkboxState, setCheckboxState] = useState<boolean>(false)
  const [images, setImages] = useState<any[]>([])
  const downloadLink = 'https://drive.google.com/uc?export=download&id=1sVP1xparV8EFhp0ziCeKAFj-LiYKvgjh'

  const onDataChange = (e: any) => {
    setImages(e)
  }

  const sendRequest = async (data) => {
    setLoading(true)
    const send = await loanStore.createRequestCounselling(
      data.email,
      data.fullName,
      data.phone,
      data.note,
      'claim_insurance',
      productId,
      images,
      metadata,
    )
    if (send.kind === "ok") {
      // todo
      navigate(ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN)
    } else {Alert.alert("Something went wrong")}
    setLoading(false)
  }
  if (!authStoreModel.isLoggedIn) {
    return <AppViewNoAuth />
  }

  const handlePressDebounced = debounce(sendRequest, 500, {
    leading: true,
    trailing: false
  });

  return (
    <>
      <AppHeader headerText={'Claim Bảo Hiểm'} isBlue />
      <ScrollView style={styles.container}>
        <AppText
          value={'Tải xuống giấy yêu cầu trả tiền bảo hiểm'}
          // onPress={download}
          onPress={()=> Linking.openURL(downloadLink)}
          underline
          style={styles.downloadText}
        />
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
          <FormItemPicker
            {...{
              name: "relationship",
              autoCapitalize: "none",
              label: "Quan hệ với người hưởng bảo hiểm",
              error: errors?.address?.message,
              control,
              setValue,
              data: [
                { label: 'Bố', value: USER_RELATIONSHIP.FATHER },
                { label: 'Mẹ', value: USER_RELATIONSHIP.MOTHER },
                { label: 'Vợ', value: USER_RELATIONSHIP.WIFE },
                { label: 'Chồng', value: USER_RELATIONSHIP.HUSBAND },
                { label: 'Con', value: USER_RELATIONSHIP.CHILD },
                { label: 'Khác', value: USER_RELATIONSHIP.OTHER },],
            }}
          />
          <FormInput
            {...{
              name: "note",
              placeholder: "note",
              autoCapitalize: "none",
              label: "Ghi chú",
              error: errors?.note?.message,
              control,
              multiline: true,
            }}
          />
          <CollapsibleClaimUpload {...{ data: [], onDataChange }}/>
          <TermCheckbox checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
        </View>
      </ScrollView>

        <View style={styles.wrapBtn}>
          <AppButton
            loading={loading}
            tx={"common.sentInformation"}
            disable={!checkboxState || loading}
            onPress={handleSubmit(handlePressDebounced)}
          />
        </View>
    </>
  )
});

export default ClaimInsuranceDetailScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  downloadText: {
    marginTop: '16@s',
    marginHorizontal: '16@s',
    color: color.palette.blue,
    fontFamily: fontFamily.semiBold,
    fontSize: '16@ms'
  },
  banner: {
    borderRadius: "8@s",
    width: "90%",
    height: "95@s",
    marginVertical: "16@s",
    alignSelf: "center",
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: "16@s",
    paddingBottom: '10@s'
  },

  checkbox: {
    marginTop: "16@s",
  },
  wrapBtn: {
    backgroundColor: color.background,
    paddingHorizontal: "16@s",
    paddingBottom: "30@s",
  },
});
