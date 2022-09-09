
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import IntroduceStepOne from "./components/introduce-step-one"
import IntroduceStepTwo from "./components/introduce-step-two"
import Commission from "../commission"
import CommissionScreen from "../commission"
import CommissionList from "../commission/commssion-list"
import CommissionDetail from "../commission/commission-detail"

interface Props{ }

const RequestCounselling = React.memo((props: Props) => {
  const [step, setStep] = useState<number>(1)

  const nextStep = () => {
    setStep(2)
  }

  const preStep = () => {
    setStep(1)
  }
  const renderStep = () => {
    switch (step){
      case 1: {
        return <IntroduceStepOne {...{nextStep}}/>
      }
      case 2: {
        return <IntroduceStepTwo {...{preStep}}/>
      }
    }
  }
  return (
    <View style={styles.container}>
       <AppHeader headerTx={'header.requestCounselling'} />
       {renderStep()}
      {/* <CommissionDetail/> */}
    </View>
  )
});

export default RequestCounselling;

const styles = StyleSheet.create({
    container: {flex: 1},
});
