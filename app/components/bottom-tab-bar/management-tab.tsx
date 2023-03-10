/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useMemo } from "react"
import { View } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import { hasNotch } from 'react-native-device-info';
import { ScaledSheet } from 'react-native-size-matters';
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import { width } from "../../constants/variable"
import { fontFamily } from "../../constants/font-family"
import { HIT_SLOP } from "../../styles/common-style"

const enum tabName {
  finance = 'Tài chính',
  insurance = 'Bảo hiểm',
  invest = 'Đầu tư'
}
function ManagementTabBar({ state, descriptors, navigation }: any) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const tabBarCustom = useMemo(() => ([
    {
      index: 0,
      title: tabName.finance,
      icon: <FastImage source={images.management_finance} style={styles.icon} tintColor={color.palette.grayChateau}/>,
      iconActive: <FastImage source={images.management_finance} style={styles.icon} tintColor={color.primary}/>,
    },
    {
      index: 1,
      title: tabName.insurance,
      icon: <FastImage source={images.management_insurance} style={styles.icon} tintColor={color.palette.grayChateau}/>,
      iconActive: <FastImage source={images.management_insurance} style={styles.icon} tintColor={color.primary}/>,
    },
    {
      index: 2,
      title: tabName.invest,
      icon: <FastImage source={images.management_invest} style={styles.icon} tintColor={color.palette.grayChateau}/>,
      iconActive: <FastImage source={images.management_invest} style={styles.icon} tintColor={color.primary}/>,
    },
  ]), [])

  return (
    <View style={styles.wrap}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <TouchableOpacity
              key={index}
              hitSlop={HIT_SLOP}
              style={styles.wrapIcon}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              {isFocused ? tabBarCustom[index].iconActive : tabBarCustom[index].icon}
              <AppText style={[styles.text, isFocused ? styles.textActive : null]}>{tabBarCustom[index].title}</AppText>
            </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default ManagementTabBar;

const styles = ScaledSheet.create({
  icon: {
    width: '18@s',
    height: '18@s'
  },
  wrap: {
    borderTopRightRadius: '20@s',
    borderTopLeftRadius: '20@s',
    elevation: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,
    flexDirection: 'row',
    height: hasNotch() ? '80@s' : '60@s',
    alignItems: 'center',
    width: width,
    justifyContent: 'space-around',
    paddingBottom: hasNotch() ? '20@vs' : '5@vs',
    backgroundColor: color.background,
  },
  wrapIcon: { alignItems: 'center'},
  textActive: {
    color: color.primary,
    fontSize: '10@ms',
    fontFamily: fontFamily.semiBold,
  },
  text: {
    marginTop: 5,
    color: color.palette.grayChateau,
    fontSize: '10@ms',
    fontFamily: fontFamily.medium
  },
});
