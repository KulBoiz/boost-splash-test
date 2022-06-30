import React, { useState } from "react"
import { View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import FormCustomer from "./form-customer"
import HomeInsurance from "./home-insurance"
import CalculateMoney from "./calculate-money"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { useStores } from "../../../models"
import FormOwner from "./form-owner"
import { AddIcon, Box, MinusIcon, Pressable } from "native-base"
import uuid from "uuid"
import { filter, find, map, union } from "../../../utils/lodash-utils"

interface Props {
  insuranceType: number
  setInsuranceType(e: number): void
  productDetail: any
  questionGroups: any
  onSuccess?: (data) => void
}

const BuyStepOneForm = React.memo((props: Props) => {
  const { onSuccess, insuranceType, productDetail } = props
  const { insuranceStore } = useStores()

  const insurance = productDetail?.packages?.[insuranceType]
  const [ownerData, setOwnerData] = useState<any>({})
  const [formCustomerData, setFormCustomerData] = useState<any>([
    { data: {}, id: uuid.v4(), isValid: false },
  ])
  const [isSubmitForm, setIsSubmitForm] = useState<string>("")
  const [formOwnerIsValid, setFormOwnerIsValid] = useState<boolean>(false)

  const isValid = formOwnerIsValid && !find(formCustomerData, (fc) => !fc.isValid)

  const onSubmit = async () => {
    setIsSubmitForm(new Date().toISOString())
    setTimeout(async () => {
      if (isValid) {
        const data = {
          staffInfo: {
            fullName: ownerData.fullName,
            dateOfBirth: ownerData.dateOfBirth,
            email: ownerData.email,
            idNumber: ownerData.idNumber,
            gender: ownerData.gender,
            tel: ownerData.tel,
          },
          company: ownerData.company,
          level: ownerData.level,
          customers: map(formCustomerData, (fc) => fc.data),
          productId: productDetail?.id,
          type: "insurances",
          subType: "",
          amount: insurance?.price,
        }
        const result = await insuranceStore.buyInsurance(data)
        if (result) {
          onSuccess?.(data)
        }
      }
    }, 1000)
  }

  const addFormCustomer = () => {
    setFormCustomerData(union(formCustomerData, [{ data: {}, id: uuid.v4(), isValid: false }]))
  }
  const removeFormCustomer = (id) => {
    setFormCustomerData(filter(formCustomerData, (f) => f.id !== id))
  }

  const onSubmitFormCustomer = (fId, data) => {
    setFormCustomerData(
      map(formCustomerData, (f) => {
        if (f.id === fId) {
          return {
            ...f,
            data,
          }
        } else {
          return f
        }
      }),
    )
  }
  const onValidFormCustomer = (fId, value) => {
    setFormCustomerData(
      map(formCustomerData, (f) => {
        if (f.id === fId) {
          return {
            ...f,
            isValid: value,
          }
        } else {
          return f
        }
      }),
    )
  }

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
            <FormCustomer
              isSubmitForm={isSubmitForm}
              onSubmit={(data) => onSubmitFormCustomer(item.id, data)}
              onIsValid={(value) => onValidFormCustomer(item.id, value)}
            />

            {index ? (
              <Pressable
                width="40px"
                height="40px"
                bg="primary"
                alignItems="center"
                justifyContent="center"
                rounded="full"
                onPress={() => removeFormCustomer(item.id)}
                mx={s(16)}
                mt={s(16)}
                mb="1"
              >
                <MinusIcon color="white" />
              </Pressable>
            ) : null}
          </Box>
        )
      })}
      <Pressable
        width="40px"
        height="40px"
        bg="primary"
        alignItems="center"
        justifyContent="center"
        rounded="full"
        onPress={addFormCustomer}
        mx={s(16)}
        my={s(16)}
      >
        <AddIcon color="white" />
      </Pressable>

      <HomeInsurance productDetail={productDetail} />
      <CalculateMoney
        insurance={insurance}
        // enable={!isValid}
        productDetail={productDetail}
        onPress={onSubmit}
      />
    </View>
  )
})

export default BuyStepOneForm

const styles = ScaledSheet.create({
  container: {
    marginBottom: "24@s",
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
