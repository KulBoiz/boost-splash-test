import React from 'react';
import { ViewStyle } from "react-native"
import { color } from "../../theme"
import { Pagination } from "react-native-snap-carousel"
import { ScaledSheet } from 'react-native-size-matters';

interface Props{
  length: number
  activeDot: number
  dotContainer?: ViewStyle | any
  dotShape?: 'circle' | 'oval'
}

const PaginationDot = React.memo((props: Props) => {
  const {length, activeDot, dotContainer, dotShape = 'circle'} = props
  return (
      <Pagination
        dotsLength={length}
        activeDotIndex={activeDot}
        containerStyle={[styles.dotContainer, dotContainer]}
        dotStyle={dotShape === 'circle' ? [styles.dotCircle, styles.active] : styles.dotStyle}
        inactiveDotStyle={dotShape === 'circle' ? [styles.dotCircle, styles.inactive] : styles.inactiveDotStyle}
        inactiveDotOpacity={0.5}
        inactiveDotScale={dotShape === 'circle' ? 1 : 0.8}
      />
  )
});

export default PaginationDot;
PaginationDot.displayName = 'PaginationDot'

const styles = ScaledSheet.create({
  dotContainer: {
    marginTop: '-10@s'
  },
  dotStyle: {
    width: '22@s',
    height: '8@s',
    borderRadius: '4@s',
    marginHorizontal: '-5@s',
    backgroundColor: color.palette.blue
  },
  inactiveDotStyle: {
    width: '10@s',
    height: '10@s',
    borderRadius: '5@s',
    marginHorizontal: '-5@s',
    backgroundColor: color.palette.gray
  },
  dotCircle: {
    width: '6@s',
    height: '6@s',
    borderRadius: '3@s',
    marginHorizontal: '-5@s',
  },
  active: {
    backgroundColor: color.palette.blue
  },
  inactive: {
    backgroundColor: color.palette.gray
  }
});
