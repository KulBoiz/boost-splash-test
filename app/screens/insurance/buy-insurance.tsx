import React, { useState } from "react"
import { ScrollView } from "react-native"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import BuyStepOne from "./components/buy-step-one"
import InsurancePicker from "./components/insurance-picker"
import RenderStep from "./components/render-step"

interface Props{}

const BuyInsurance = React.memo((props: Props) => {
  const [currentPosition, setCurrentPosition] = useState(0)
  return (
    <ScrollView style={styles.container}>
     <RenderStep {...{currentPosition}}/>
      <BuyStepOne />
      <InsurancePicker />
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
