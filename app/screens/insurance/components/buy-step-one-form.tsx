import React, { useState } from "react"
// import { View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import FormCustomer from "./form/form-customer"
import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import FormOwner from "./form/form-owner"
import { AddIcon, Pressable, Row, View } from "native-base"
import { TYPE } from "../constants"
import { numberWithCommas } from "../../../constants/variable"
import Modal from "react-native-modal"
import { AppText } from "../../../components/app-text/AppText"
import { PencilSvg, RedTrashSvg } from "../../../assets/svgs"

interface Props {
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

  const renderPrice = (customer, meta) => {
    if (checkAge(customer) > MaxAge) {
      return meta?.price * 1.5;
    }

    return meta?.price || 0;
  };

  const totalAmount = () => {
    let amount = 0;
    formCustomerData?.forEach(customer => {
      amount = customer?.meta?.amount + amount;
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
          customers: formCustomerData,
          productId: productDetail?.id,
          type: "insurances",
          subType: productDetail?.name,
          amount: totalAmount()?.value,
        }

        // const result = await insuranceStore.buyInsurance(data)
        // if (result) {
        //   onSuccess?.(data)
        // }

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

    setFormCustomerData(formCustomerData.concat([
      {
        ...data,
        meta: {
          ...packages[parseInt(data.package)],
          amount: renderPrice(data, packages[parseInt(data.package)])
        },
      }]))
    setAddCustomer(false)
    totalAmount()
  }

  return (
    <View style={styles.container}>
      <FormOwner
        isSubmitForm={isSubmitForm}
        onSubmit={setOwnerData}
        onIsValid={setFormOwnerIsValid}
      />

      <View style={{ alignItems: 'center' }}>
        <AppText value={"THÔNG TIN NGƯỜI HƯỞNG BẢO HIỂM"} style={[styles.headerText, { paddingLeft: s(15) }]} />
      </View>

      {formCustomerData.map((item, index) => {
        return (
          <Row key={index} style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: s(16),
            marginTop: s(16)
          }}>
            <View style={styles.itemName}>
              <AppText style={styles.headerText} value={item?.fullName} />
              <Pressable>
                <PencilSvg />
              </Pressable>
            </View>

            <Pressable
              width="40px"
              height="40px"
              alignItems="center"
              justifyContent="center"
              onPress={() => removeFormCustomer(index)}
              ml={s(12)}
            >
              <RedTrashSvg />
            </Pressable>
          </Row>
        )
      })}

      <Pressable
        bg="primary"
        alignItems="center"
        justifyContent="center"
        rounded="full"
        onPress={addFormCustomer}
        mx={s(16)}
        my={s(16)}
        style={{ flexDirection: 'row', paddingVertical: 10 }}
      >
        <View style={styles.wrapPlus} rounded="full">
          <AddIcon color="white" />
        </View>
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
        insurance={{
          ...ownerData,
          customers: [...formCustomerData],
          amount: totalAmount()?.value,
        }}
        productDetail={productDetail}
        onPress={onSubmit}
        showRegister
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
  itemName: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: s(32),
    borderStyle: 'dashed',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(16),
    padding: s(12),
  },
  wrapPlus: {
    borderWidth: 2,
    borderColor: color.palette.white,
    padding: '2@s',
    marginRight: '10@s'
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
