import React, { useCallback, useMemo, useState } from "react"
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../../components/app-header/AppHeader"
import { AppText } from "../../../components/app-text/AppText"
import { ROW } from "../../../styles/common-style"

interface Props{}

const Survey = React.memo((props: Props) => {
  const [step, setStep] = useState<number>(0)

  const renderRight = useMemo(()=> {
    return(
      <View style={ROW}>
        <AppText value={step}/>
        <AppText value={'/7'}/>
      </View>
    )
  },[step])

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Khảo sát khẩu vị đầu tư'} isBlue renderRightIcon={renderRight}/>
    </View>
  )
});

export default Survey;

const styles = StyleSheet.create({
    container: {},
});
