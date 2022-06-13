import React from 'react';
import { View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface Props { }

const ViewContent = React.memo((props: Props) => {
  return (
    <View>

    </View>
  )
});

export default ViewContent;

const styles = ScaledSheet.create({
  container: {},
});
