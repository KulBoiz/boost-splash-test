import React, { useState } from "react"
import { View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import FormCustomer from "./form/form-customer"
import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import FormOwner from "./form/form-owner"
import { AddIcon, Box, MinusIcon, Pressable } from "native-base"
import uuid from "uuid"
import { filter, find, map, union } from "../../../utils/lodash-utils"
import { TYPE } from "../constants"
import { numberWithCommas } from "../../../constants/variable"
import Modal from "react-native-modal"
import { AppText } from "../../../components/app-text/AppText"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

interface Props {
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
  onPress: (data) => void
}

const MaxAge = 65;

const BuyStepOneForm = React.memo((props: Props) => {
  const { productDetail, onPress } = props

  const [ownerData, setOwnerData] = useState<any>({})
  const [formCustomerData, setFormCustomerData] = useState<any>([])
  const [isSubmitForm, setIsSubmitForm] = useState<string>("")
  const [formOwnerIsValid, setFormOwnerIsValid] = useState<boolean>(false)
  const [addCustomer, setAddCustomer] = useState<boolean>(false)

  const packages = productDetail?.packages.map((el, index) => ({ ...el, value: index, label: `${el?.name}-${el?.price} VNĐ` }));
  const listPackageStaff = packages.filter(el => el?.objects?.find(e => e === TYPE?.staff));
  const listPackageRelative = packages.filter(el => el?.objects?.find(e => e === TYPE?.relative));

  const checkAge = (user) => {
    const birthday = new Date(user?.dateOfBirth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const renderPrice = (customer) => {
    if (checkAge(customer) > MaxAge) {
      return customer?.meta?.price * 1.5;
    }

    return customer?.meta?.price || 0;
  };

  const totalAmount = () => {
    let amount = 0;
    const customers = map(formCustomerData, (fc) => {
      return { ...fc.data }
    })

    customers?.forEach(customer => {
      amount = renderPrice(customer) + amount;
    });

    return {
      value: amount || 0,
      label: numberWithCommas(amount) || '',
    };
  };

  const onSubmit = async () => {
    setIsSubmitForm(new Date().toISOString())
    setTimeout(async () => {
      const { fullName, dateOfBirth, email, idNumber, gender, tel, company, level } = ownerData

      if (formOwnerIsValid && formCustomerData?.length > 0) {
        const data = {
          staffInfo: { fullName, dateOfBirth, email, idNumber, gender, tel },
          company,
          level,
          customers: formCustomerData.map((fc) => ({ ...fc.data, meta: packages[parseInt(fc.package)] })),
          productId: productDetail?.id,
          type: "insurances",
          subType: productDetail?.name,
          amount: totalAmount()?.value,
        }

        // const result = await insuranceStore.buyInsurance(data)
        // if (result) {
        //   onSuccess?.(data)
        // }

        console.log(data);

        onPress(data)
      }
    }, 1000)
  }

  const addFormCustomer = () => {
    setAddCustomer(true)
  }

  const removeFormCustomer = (index) => {
    const list = [...formCustomerData]
    list.splice(index, 1)
    setFormCustomerData(list)
  }

  const onSubmitFormCustomer = (data) => {
    setFormCustomerData(formCustomerData.concat([data]))
    setAddCustomer(false)
  }

  console.log('formCustomerData', formCustomerData);

  return (
    <View style={styles.container}>
      <FormOwner
        isSubmitForm={isSubmitForm}
        onSubmit={setOwnerData}
        onIsValid={setFormOwnerIsValid}
      />
      {formCustomerData.map((item, index) => {
        return (
          <Box key={index}>
            <View>
              <AppText value={item?.fullName} />
            </View>

            {index && <Pressable
              width="40px"
              height="40px"
              bg="primary"
              alignItems="center"
              justifyContent="center"
              rounded="full"
              onPress={() => removeFormCustomer(index)}
              mx={s(16)}
              mt={s(16)}
              mb="1"
            >
              <MinusIcon color="white" />
            </Pressable>}
          </Box>
        )
      })}

      <View style={{ alignItems: 'center' }}>
        <AppText value={"THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM"} style={[styles.headerText, { paddingLeft: s(15) }]} />
      </View>

      <Pressable
        width="210px"
        height="40px"
        bg="primary"
        alignItems="center"
        justifyContent="center"
        rounded="full"
        onPress={addFormCustomer}
        mx={s(16)}
        my={s(16)}
        style={{ flexDirection: 'row', justifyContent: 'space-around' }}
      >
        {/* <AddIcon color="white" /> */}
        <AppText color="white" style={{ fontFamily: fontFamily.medium }} value={"Thêm người hưởng bảo hiểm"} />
      </Pressable>

      {
        formCustomerData?.length === 0 &&
        <View style={{ alignItems: 'center', marginBottom: s(20) }}>
          <AppText color="red" style={{ fontFamily: fontFamily.medium }} value={"Cần thêm thông tin người hưởng bảo hiểm"} />
        </View>
      }

      <HomeInsurance productDetail={productDetail} />

      <CalculateMoney
        insurance={''}
        productDetail={productDetail}
        onPress={onSubmit}
      />

      <Modal
        isVisible={addCustomer}
        onBackdropPress={() => setAddCustomer(false)}
        style={{ marginVertical: s(70), borderRadius: s(16) }}
      >
        <FormCustomer
          listPackageStaff={listPackageStaff}
          listPackageRelative={listPackageRelative}
          onSubmit={(data) => {
            onSubmitFormCustomer(data)
          }}
          onClose={() => {
            setAddCustomer(false)
          }}
        />
      </Modal>
    </View>
  )
})

export default BuyStepOneForm

const styles = ScaledSheet.create({
  container: {
    // marginBottom: "24@s",
  },
  contentContainer: {
    paddingHorizontal: "16@s",
    paddingBottom: "16@s",
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    borderColor: color.palette.blue,
    // marginBottom: '8@s',
    marginHorizontal: "16@ms",
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.medium,
    fontWeight: "500",
  },
  headerBody: {
    padding: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "12@ms",
    color: color.palette.blue,
    marginBottom: "8@s",
  },
  icon: {
    width: "16@s",
    height: "16@s",
  },
  line: {
    height: 1,
    backgroundColor: color.palette.F0F0F0,
    marginHorizontal: "16@ms",
  },
})
