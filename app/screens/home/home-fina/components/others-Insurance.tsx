import React, { useEffect, useState } from "react"
import { DeviceEventEmitter, View, ViewStyle } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters'
import AppButton from '../../../../components/app-button/AppButton'
import AppSectionModal from '../../../../components/app-modal/section-modal'
import { AppText } from '../../../../components/app-text/AppText'
import { fontFamily } from '../../../../constants/font-family'
import { navigate } from '../../../../navigators'
import { ScreenNames } from '../../../../navigators/screen-names'
import { FONT_REGULAR_12, ROW } from "../../../../styles/common-style"
import { color } from '../../../../theme'
import HomeItem from './home-item'
import IconItem from './icon-item'
import { INSURANCE_PRODUCT } from '../constants'
import UtilityItem from "./utility-item"

interface Props {
  data: any[]
  title: string
  iconShape?: 'circle' | 'custom'
  style?: ViewStyle | any
  showAction?: boolean
}

const OthersInsurance = React.memo((props: Props) => {
  const { data, title, style, iconShape, showAction } = props
  const [visible, setVisible] = useState(false)
  const onPress = (e: any) => {
    setVisible(false)
    navigate(ScreenNames.INSURANCE_LIST_SCREEN, { key: e?.id, name: e?.name })
  }

  useEffect(() => {
    DeviceEventEmitter.addListener('utilityClose', () => {
      setVisible(false)
    });
    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  const openModal = () => {
    setVisible(true)
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <AppText value={title} style={styles.label} />
        {showAction && <AppText
          value={'Công cụ bảo hiểm'}
          onPress={openModal}
          style={FONT_REGULAR_12}
          color={color.palette.blue}
        />}
      </View>

      <View style={styles.itemContainer}>
        {data.map((e, i) => {
          return <IconItem
            icon={e?.icon?.url}
            title={e?.name}
            key={e?.title?.toString() + i.toString()}
            onPress={() => onPress(e)}
            percent={e?.highestInterestRate}
            iconShape={iconShape}
            middleText={e?.middleText}
            showPercentCustom={true}
          />
        })}
      </View>

      <AppSectionModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title={'Tiện ích'}
        hasBorder
      >
        <View style={styles.comfort}>
          {INSURANCE_PRODUCT?.map((e: any, i) => {
            return <UtilityItem
              icon={e?.image}
              title={e?.title?.toString()}
              key={e?.title?.toString() + i.toString()}
              onPress={e.onPress}
            />
          })}
        </View>
      </AppSectionModal>
    </View>
  )
})

export default OthersInsurance

const styles = ScaledSheet.create({
  container: {
    marginTop: '16@s',
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '12@s',
    paddingHorizontal: '16@ms',
    flexDirection: "row"
  },
  label: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    color: 'rgba(0, 0, 0, 0.85)',
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '8@ms',
    backgroundColor: color.palette.F9FBFF,
  },
  comfort: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

