import { yupResolver } from "@hookform/resolvers/yup"
import { TabRouter } from "@react-navigation/native"
import { AddIcon, Checkbox, Pressable, Row, View } from "native-base"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Modal from "react-native-modal"
import { s, ScaledSheet } from "react-native-size-matters"
import { PencilSvg, RedTrashSvg } from "../../../assets/svgs"
import { AppText } from "../../../components/app-text/AppText"
import { fontFamily } from "../../../constants/font-family"
import { numberWithCommas } from "../../../constants/variable"
import { useStores } from "../../../models"
import { ROLE } from "../../../models/auth-store"
import { color } from "../../../theme"
import { TYPE } from "../constants"
import CalculateMoney from "./calculate-money"
import FormCustomer from "./form/form-customer"
import FormOwner, { validationSchema } from "./form/form-owner"
import FormUpdateUser from "./form/form-update-user"
import HomeInsurance from "./home-insurance"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import BottomView from "../../../components/bottom-view"

interface Props {
  productDetail: any
  questionGroups: any
  onPress: (data) => void
}

const MaxAge = 65;

const BuyStepOneForm = React.memo((props: Props) => {
  const { authStoreModel } = useStores()
  const { productDetail, onPress } = props

  const [ownerData, setOwnerData] = useState<any>({})
  const [formCustomerData, setFormCustomerData] = useState<any>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showModalStaff, setShowModalStaff] = useState<boolean>(false)
  const [showModalUpdateUser, setShowModalUpdateUser] = useState<boolean>(false)

  const [indexCustomerEdit, setIndexCustomerEdit] = useState(undefined)
  const [staffIsCustomer, setStaffIsCustomer] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const checkCTVAndFina = () => {
    const role = authStoreModel?.role

    if (role === ROLE.CTV || role === ROLE.FINA) {
      return false
    }

    return true
  }

  const packages = productDetail?.packages.map((el, index) => ({ ...el, value: index, label: `${el?.name}-${!checkCTVAndFina() ? el?.price : el?.priceRoot} VNĐ` }));
  const listPackageStaff = packages.filter(el => el?.objects?.find(e => e === TYPE?.staff));
  const listPackageRelative = packages.filter(el => el?.objects?.find(e => e === TYPE?.relative));

  const {
    control: controlOwner,
    handleSubmit: handleSubmitOwner,
    formState: { errors: errorsOwner },
    setValue: setValueOwner,
    clearErrors: clearErrorsOwner,
    getValues: getValuesOwner,
  } = useForm({
    delayError: 0,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange" || "onTouched",
  })

  useEffect(() => {
    const user = authStoreModel.user
    setValueOwner('fullName', user.fullName)
    setValueOwner('email', user?.emails?.[0]?.email || undefined)
    setValueOwner('tel', user?.tels?.[0]?.tel || undefined)
    setValueOwner('idNumber', user?.idNumber ? `${user?.idNumber}` : '')
    setValueOwner('gender', user?.gender)
    setValueOwner('dateOfBirth', user?.birthday)

    if (!user?.gender || !user?.birthday || !user?.idNumber || !user?.tels?.[0]?.tel || !user?.emails?.[0]?.email) {
      setShowModalUpdateUser(true)
    }
  }, [])

  const checkAge = (user) => {
    const birthday = new Date(user?.dateOfBirth);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const renderPrice = (customer, meta) => {
    const price = !checkCTVAndFina() ? meta?.price: meta?.priceRoot
    if (checkAge(customer) > MaxAge) {
      return price * 1.5;
    }

    return price || 0;
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

  const onSubmit = handleSubmitOwner((e) => {
    setOwnerData(e)
    const { fullName, dateOfBirth, email, idNumber, gender, tel, company, level } = e

    if (formCustomerData?.length > 0) {
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

      onPress(data)
    }
  })

  const addFormCustomer = () => {
    setShowModal(true)
  }

  const editFormCustomer = (index) => {
    setIndexCustomerEdit(index)
    setShowModal(true)
  }

  const removeFormCustomer = (index) => {
    const list = [...formCustomerData]
    list.splice(index, 1)
    setFormCustomerData(list)

    const checkStaffDeleted = list.find(el => el?.type === 'staff')
    if (!checkStaffDeleted) {
      setStaffIsCustomer(false)
    }

  }

  const onSubmitFormCustomer = (data) => {
    const contentCustomer = {
      ...data,
      meta: {
        ...packages[parseInt(data.package)],
        pricePacket: !checkCTVAndFina() ? packages[parseInt(data.package)]?.price: packages[parseInt(data.package)]?.priceRoot,
        amount: renderPrice(data, packages[parseInt(data.package)])
      },
    }

    const list = [...formCustomerData]

    if (indexCustomerEdit) {
      list.splice(indexCustomerEdit - 1, 1, contentCustomer)
      setFormCustomerData(list)
      setIndexCustomerEdit(undefined)
    } else {
      setFormCustomerData(list.concat([{ ...contentCustomer }]))
    }
    setShowModal(false)
    totalAmount()
  }

  const checkCurrentUser = handleSubmitOwner((e) => {
    setOwnerData({ ...e, type: 'staff' })
    setStaffIsCustomer(true)
    setShowModalStaff(true)
  })

  const getDefaults = () => {
    if (isEdit && indexCustomerEdit) {
      return formCustomerData[indexCustomerEdit - 1]
    }

    return {}
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView  keyboardShouldPersistTaps="handled"  contentContainerStyle={{flexGrow: 1}}>
      <FormOwner
        control={controlOwner}
        handleSubmit={handleSubmitOwner}
        setValue={setValueOwner}
        errors={{ ...errorsOwner }}
        clearErrors={clearErrorsOwner}
        getValues={getValuesOwner}
      />

      <View style={{ paddingHorizontal: s(16), marginBottom: s(16), flexDirection: 'row' }}>
        <Checkbox
          isChecked={staffIsCustomer}
          onChange={(e) => {
            if (e) {
              checkCurrentUser()
            } else {
              setStaffIsCustomer(!!formCustomerData.find(el => el?.type === 'staff'))
              setFormCustomerData([...formCustomerData].filter(el => el?.type !== 'staff'))
            }
          }}
          value={'test'}
          accessibilityLabel="choose numbers" />
        <AppText value={"Người mua là người được bảo hiểm"} style={{ marginLeft: s(8), fontFamily: fontFamily.medium }} />
      </View>

      <View style={{
        height: s(4),
        backgroundColor: color.palette.lightBlue,
        marginBottom: s(16),
      }} />

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
              {item?.type !== 'staff' &&
                <Pressable onPress={() => {
                  editFormCustomer(index + 1)
                  setIsEdit(true)
                }}>
                  <PencilSvg />
                </Pressable>
              }
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
        <BottomView height={s(140)}/>
      </KeyboardAwareScrollView>
      <CalculateMoney
        insurance={{
          ...ownerData,
          customers: [...formCustomerData],
          amount: totalAmount()?.value,
        }}
        productDetail={productDetail}
        onPress={onSubmit}
        showRegister={checkCTVAndFina()}
      />
      {showModal && <Modal
        isVisible={showModal}
        onBackdropPress={() => {
          setIsEdit(false)
          setShowModal(false)
          setIndexCustomerEdit(undefined)
        }}
        style={{ marginVertical: s(70), borderRadius: s(16) }}
      >
        <FormCustomer
          isEdit={isEdit}
          listPackageStaff={listPackageStaff}
          listPackageRelative={listPackageRelative}
          defaultValuesProps={{ ...getDefaults() }}
          onSubmit={(data) => {
            onSubmitFormCustomer(data)
          }}
          onClose={() => {
            setIsEdit(false)
            setShowModal(false)
            setIndexCustomerEdit(undefined)
          }}
        />
      </Modal>}

      {showModalStaff && <Modal
        isVisible={showModalStaff}
        onBackdropPress={() => {
          setShowModalStaff(false)
        }}
        style={{ marginVertical: s(70), borderRadius: s(16) }}
      >
        <FormCustomer
          isEdit={isEdit}
          isStaff={true}
          listPackageStaff={listPackageStaff}
          listPackageRelative={listPackageRelative}
          defaultValuesProps={ownerData}
          onSubmit={(data) => {
            onSubmitFormCustomer(data)
            setShowModalStaff(false)
          }}
          onClose={() => {
            const list = [...formCustomerData].filter(el => el?.type !== 'staff')
            setFormCustomerData(list)
            setShowModalStaff(false)
            setStaffIsCustomer(false)
          }}
        />
      </Modal>}

      {showModalUpdateUser && <Modal
        isVisible={showModalUpdateUser}
        style={{ marginVertical: s(70), borderRadius: s(16) }}
      >
        <FormUpdateUser
          defaultValuesProps={getValuesOwner()}
          onSubmit={(data) => {
            setShowModalUpdateUser(false)
          }}
          onClose={() => {
            setShowModalUpdateUser(false)
          }}
        />
      </Modal>}
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
