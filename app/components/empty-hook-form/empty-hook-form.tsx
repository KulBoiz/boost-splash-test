import React from 'react';
import { Controller } from 'react-hook-form';
import { View, StyleSheet, TextStyle } from "react-native"
import { Control } from "react-hook-form/dist/types/form"
import { Text } from "../text/text"
import { fontFamily } from "../../constants/font-family"
import { color } from "../../theme"
import { ms } from "react-native-size-matters"

interface Props{
  control: Control
  error: string
  name: string
}

const ERROR: TextStyle = {
  // position: "absolute",
  fontFamily: fontFamily.medium,
  color: color.palette.angry,
  fontSize: ms(12),
  // marginTop: 4,
}
const EmptyHookForm = React.memo((props: Props) => {
  const {control, error, name} = props
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={() => (<View/>)}
        name={name}
      />
      {!!error && (
        <Text text={error} style={error ? ERROR : null} />
      )}
    </View>
  )
});

export default EmptyHookForm;

const styles = StyleSheet.create({
    container: {},
});
