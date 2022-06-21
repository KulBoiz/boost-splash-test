import React, { useCallback, useRef } from "react"
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { width } from "../../../constants/variable"
import { ms, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import Carousel from 'react-native-snap-carousel';
import { fontFamily } from "../../../constants/font-family"
import BankItem from "./bank-item"

interface Props{}

const LoanPackage = React.memo((props: Props) => {
  const { loanStore } = useStores()
  const ref = useRef()
  const data = loanStore?.products?.slice(0, 10) || []


  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{paddingVertical: 3}}>
        <BankItem item={item} />
      </View>
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText value={'Gói vay'} style={styles.label} />
        <AppText value={'Xem thêm'} style={styles.viewMore} onPress={() => navigate(ScreenNames.FINANCE, { index: 1 })} />
      </View>

      <Carousel
        ref={ref.current}
        key={(e, i) => e.name + i.toString()}
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width-ms(200)}
        inactiveSlideScale={1}
        activeSlideAlignment={'start'}
      />
    </View>
  )
});

export default LoanPackage;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '24@ms'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewMore: {
    fontSize: '12@ms',
    color: '#177DDC',
    fontFamily: fontFamily.bold
  },
  label: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    marginBottom: '12@s',
    color: 'rgba(0, 0, 0, 0.85)'
  },
});
