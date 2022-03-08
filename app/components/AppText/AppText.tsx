import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import type { FontWeight } from 'react-native-svg';
import { s } from 'react-native-size-matters';
import { color } from "../../theme"

export type AppTextProps = {
  value?: string | number | null;
  fontSize?: number;
  color?: string;
  fontWeight?: FontWeight;
  // fontFamily?: FontFamily;
} & TextProps;

// export type FontFamily = 'Montserrat-Bold' | 'Montserrat-Medium' | 'Montserrat-Regular' | 'Montserrat-SemiBold';

const defaultProps: Partial<AppTextProps> = {
  fontSize: s(13),
  color: color.palette.black,
  // fontFamily: 'Montserrat-Regular',
};

// eslint-disable-next-line react/display-name
export const AppText: React.SFC<AppTextProps> = React.memo(
  ({ children, color, value, fontWeight, fontSize, ...props }) => {
    return (
      <Text
        {...props}
        style={StyleSheet.flatten([
          {
            // fontFamily,
            fontSize,
            color,
          },
          props.style,
        ])}>
        {value || children}
      </Text>
    );
  },
);

AppText.defaultProps = defaultProps;
