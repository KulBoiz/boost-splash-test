import React, { useState } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from "react-native-size-matters"
import InsurancePicker from "./insurance-picker"
import SurveyQuestion from "./survey-question"
import InputCustomer from "./input-customer"
import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { Control } from "react-hook-form/dist/types/form"
import { FieldErrors } from "react-hook-form/dist/types/errors"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { color } from '../../../theme';
import ItemView from '../../loan/components/item-view';
import { AppText } from '../../../components/app-text/AppText';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import moment from 'moment';
import { MARGIN_TOP_16 } from '../../../styles/common-style';
import { fontFamily } from '../../../constants/font-family';
import { useStores } from '../../../models';
import Accordion from 'react-native-collapsible/Accordion';

interface Props {
  control: Control,
  errors: FieldErrors<FieldValues>
  onPress(): void
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
  setValue: any
  getValues: any
}

const BuyStepOneForm = React.memo((props: Props) => {
  const {
    control,
    errors,
    onPress,
    insuranceType,
    setInsuranceType,
    productDetail,
    questionGroups,
    setValue,
    getValues
  } = props
  const { authStoreModel } = useStores()

  const insurance = productDetail?.packages?.[insuranceType]
  const [enable, setEnable] = useState();

  const [activeSections, setActiveSections] = useState<number[]>([0]);
  const _handleSections = (index: number[]) => {
    setActiveSections(index);
  };

  const renderHeader = (index: number, title: string) => {
    const isOpen = activeSections[0] === index
    return (
      <>
        <View
          style={styles.headerBody}>
            <AppText
              value={title}
              style={styles.headerText}
            />
          <FastImage source={activeSections?.includes(index) ? images.arrow_up : images.arrow_down} style={styles.icon} />
        </View>
        {isOpen && <View style={styles.line}/>}
      </>
  );
  };

  const renderContent = () => {
    const info = authStoreModel?.user
    return (
      <View style={styles.contentContainer}>
        <ItemView title={'Họ và tên:'} content={info?.fullName} style={MARGIN_TOP_16}/>
        <ItemView title={'Ngày sinh:'} content={`${moment(info?.dateOfBirth).format('DD/MM/YYYY')}`} style={MARGIN_TOP_16}/>
        <ItemView title={'CMND/ CCCD:'} content={info?.citizenIdentification} style={MARGIN_TOP_16}/>
        <ItemView title={'Email'} content={info?.email} style={MARGIN_TOP_16}/>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <Benefit /> */}
      <Accordion
        containerStyle={[styles.collapsibleContainer,  {borderWidth: activeSections.length > 0 ? 1: 0}]}
        sections={[0]}
        activeSections={activeSections}
        renderHeader={(content, index) => renderHeader(index, 'Thông tin người mua bảo hiểm')}
        renderContent={() =>renderContent()}
        onChange={(indexes) => _handleSections(indexes)}
        keyExtractor={(v, i) => i.toString()}
        underlayColor={'transparent'}
      />

      {
        !enable && <>
          <InputCustomer
            {...{ control, errors, setValue, getValues }}
          />
        </>
      }

      <HomeInsurance productDetail={productDetail} />
      <CalculateMoney {...{ onPress }} insurance={insurance} enable={enable} productDetail={productDetail} />
    </View>
  )
});

export default BuyStepOneForm;

const styles = ScaledSheet.create({
  container: {
    marginVertical: '24@s',
    // marginHorizontal:'16@ms'
  },
  contentContainer: {
    paddingHorizontal: '16@s',
    paddingBottom: '16@s'
  },
  collapsibleContainer:{
    backgroundColor: color.background,
    borderRadius: '8@s',
    borderColor: color.palette.blue,
    // marginBottom: '8@s',
    marginHorizontal:'16@ms',
  },
  headerText:{
    fontSize: '14@ms',
    fontFamily: fontFamily.medium,
    fontWeight: '500'
  },
  headerBody: {
    padding: '16@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize:'12@ms',
    color: color.palette.blue,
    marginBottom: '8@s'
  },
  icon: {
    width: '16@s',
    height: '16@s',
  },
  line: {
    height: 1,
    backgroundColor: color.palette.F0F0F0,
    marginHorizontal:'16@ms'
  }
});
