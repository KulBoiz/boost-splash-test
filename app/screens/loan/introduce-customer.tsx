
import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import IntroduceStepOne from "./components/introduce-step-one"
import IntroduceStepTwo from "./components/introduce-step-two"

interface Props{}

const IntroduceLoanCustomer = React.memo((props: Props) => {
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
      <AppHeader headerTx={'loan.introduceLoanCustomer'} />
      {renderStep()}
    </View>
  )
});

export default IntroduceLoanCustomer;

const styles = StyleSheet.create({
    container: {flex: 1},
});
