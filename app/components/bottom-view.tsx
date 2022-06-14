import React from 'react';
import { View } from 'react-native';

interface Props{
  height: number
}

const BottomView = React.memo(({ height }: Props) => {
  return (
    <View style={{height}}/>
  )
});

export default BottomView;
