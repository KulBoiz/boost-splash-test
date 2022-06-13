import React, { useCallback, useRef, useState } from "react"
import { View } from 'react-native';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { width } from "../../../constants/variable"
import PaginationDot from "../../../components/pagination-dot/pagination-dot"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import Carousel from 'react-native-snap-carousel';
import { fontFamily } from "../../../constants/font-family"
import BankItem from "./bank-item"

interface Props{}

const LoanPackage = React.memo((props: Props) => {
  const { loanStore } = useStores()
  const ref = useRef()
  const [activeDot, setActiveDot] = useState(0)
  const data = loanStore?.products?.data?.slice(0, 10) || []


  const renderItem = useCallback(({ item }) => {
    return (
      <View>
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
        itemWidth={width}
        loop
        onSnapToItem={(index) => setActiveDot(index)}
      />
      <PaginationDot length={data.length} activeDot={activeDot} dotShape={'circle'} />
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
    fontSize: '14@ms',
    color: color.palette.blue,
    fontFamily: fontFamily.medium
  },
  label: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    marginBottom: '12@s'
  },
});
