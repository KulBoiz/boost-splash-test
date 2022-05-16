import React, { useRef, useState } from "react"
import { ScrollView } from "react-native"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import BuyStepOne from "./components/buy-step-one"
import RenderStep from "./components/render-step"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import BuyStepTwo from "./components/buy-step-two"
import BuyStepThree from "./components/buy-step-three"
import BuyRecords from "./components/buy-records"

interface Props{}

const BuyInsurance = React.memo((props: Props) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("Vui lòng nhập email hoặc số điện thoại"),
    // .email("This is not a valid email"),
    password: Yup.string().required("Vui lòng nhập mật khẩu").trim(),
  })
  const {control, handleSubmit, formState: {errors}} = useForm({
    delayError: 0,
    defaultValues: undefined,
    mode: "all",
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  })
  const ref = useRef(null)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [insuranceType, setInsuranceType] = useState<number>(0)


  const stepTwo = () => {
    // @ts-ignore
    ref.current.scrollTo({ x: 0, animated: true })
    setCurrentPosition(1)
  }
  const stepThree = () => {
    setCurrentPosition(2)
  }
  const buyRecords = () => {
    setCurrentPosition(3)
  }

  const renderScreen = () => {
    switch (currentPosition){
      case 0: return <BuyStepOne  {...{control, errors, onPress:stepTwo, insuranceType, setInsuranceType}}/>
      case 1: return <BuyStepTwo {...{stepThree}}/>
      case 2: return <BuyStepThree {...{onPress: buyRecords}}/>
      case 3: return <BuyRecords />
    }
  }
  return (
    <ScrollView style={styles.container} ref={ref}>
      {currentPosition < 3 &&  <RenderStep {...{currentPosition}}/>}
      {renderScreen()}
    </ScrollView>
  )
});

export default BuyInsurance;

const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.palette.lightBlue,
    },
});
