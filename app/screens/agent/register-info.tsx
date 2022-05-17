import React, { useState } from "react"
import { View, StyleSheet } from 'react-native';
import AppHeader from "../../components/app-header/AppHeader"
import RenderStepAgent from "./components/render-step"

interface Props{}

const RegisterInfo = React.memo((props: Props) => {
  const [currentPosition, setCurrentPosition] = useState(0)

  return (
    <View style={styles.container}>
      <AppHeader headerText={'Đăng ký thông tin'}/>
      <RenderStepAgent currentPosition={currentPosition} />
    </View>
  )
});

export default RegisterInfo;

const styles = StyleSheet.create({
    container: {},
});
