import React from 'react';
import { ViewStyle } from "react-native"
import { color } from "../../theme"
import { Pagination } from "react-native-snap-carousel"
import { ScaledSheet } from 'react-native-size-matters';

interface Props{
  length: number
  activeDot: number
  dotContainer?: ViewStyle | any
}

const PaginationDot = React.memo((props: Props) => {
  const {length, activeDot, dotContainer} = props
  return (
      <Pagination
        dotsLength={length}
        activeDotIndex={activeDot}
        containerStyle={dotContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.5}
        inactiveDotScale={0.6}
      />
  )
});

export default PaginationDot;

const styles = ScaledSheet.create({
  dotStyle: {
    width: '25@s',
    height: '10@s',
    borderRadius: '8@s',
    marginHorizontal: '-5@s',
    backgroundColor: color.palette.blue
  },
  inactiveDotStyle: {
    width: '15@s',
    height: '15@s',
    borderRadius: '8@s',
    marginHorizontal: '-5@s',
    backgroundColor: color.palette.gray
  }
});
