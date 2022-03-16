import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { FontAwesome as Icon } from '@expo/vector-icons';
import { TabBg } from "./TabBg"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({ bgColor, ...props }) => (
  <View
    style={styles.container}
    pointerEvents="box-none"
  >
    <TabBg
      color={bgColor}
      style={styles.background}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={()=> navigate(ScreenNames.REQUEST_COUNSELLING)}
    >
      <Icon
        name="plus"
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#E94F37',
    borderRadius: 27,
    height: 50,
    justifyContent: 'center',
    top: -22.5,
    width: 50,
  },
  buttonIcon: {
    color: '#F6F7EB',
    fontSize: 24
  },
  container: {
    alignItems: 'center',
    position: 'relative',
    width: 75
  }
});
