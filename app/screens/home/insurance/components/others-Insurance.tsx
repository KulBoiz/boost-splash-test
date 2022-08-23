import React, { useEffect, useState } from "react"
import { DeviceEventEmitter, View, ViewStyle } from "react-native"
import { s, ScaledSheet } from 'react-native-size-matters'
import AppButton from '../../../../components/app-button/AppButton'
import AppSectionModal from '../../../../components/app-modal/section-modal'
import { AppText } from '../../../../components/app-text/AppText'
import { fontFamily } from '../../../../constants/font-family'
import { navigate } from '../../../../navigators'
import { ScreenNames } from '../../../../navigators/screen-names'
import { ROW } from '../../../../styles/common-style'
import { color } from '../../../../theme'
import HomeItem from '../../home-fina/components/home-item'
import IconItem from '../../home-fina/components/icon-item'
import { INSURANCE_PRODUCT } from '../../home-fina/constants'
import UtilityItem from "../../home-fina/components/utility-item"

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
      <View style={[ROW, { alignItems: "center", justifyContent: "space-between", marginBottom: s(12) }]}>
        <AppText value={title} style={styles.label} />
        {showAction && <AppButton
          title={'Tiện ích'}
          onPress={openModal}
          containerStyle={styles.btn}
          titleStyle={{ fontSize: s(12), fontFamily: fontFamily.regular, color: color.palette.blue}}
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
    marginTop: '12@s',
  },
  btn: {
    width: '50@s',
    height: '25@s',
    marginRight: '24@s',
    backgroundColor: color.palette.white
  },
  label: {
    fontSize: '14@ms',
    fontFamily: fontFamily.semiBold,
    marginLeft: '16@ms',
    color: 'rgba(0, 0, 0, 0.85)',
  },
  itemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: '12@ms',
    backgroundColor: color.palette.F9FBFF,
  },
  comfort: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

