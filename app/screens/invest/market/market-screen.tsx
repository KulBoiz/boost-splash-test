import React, { useCallback } from "react"
import { FlatList, View } from "react-native"
import AppHeader from "../../../components/app-header/AppHeader"
import MarketItem from "./components/market-item"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"

interface Props {
}

const MarketScreen = React.memo((props: Props) => {
  const renderItem = useCallback(() => {
    return <MarketItem />
  }, [])
  return (
    <View style={styles.container}>
      <AppHeader headerText={"Thông tin thị trường"} isBlue />
      <View style={styles.body}>
        <View style={styles.descriptionContainer}>

          <AppText value={"Sản phẩm"} style={styles.description}/>
          <AppText value={"NAV/CCQ"} style={styles.description}/>
        </View>

        <FlatList data={[0, 1, 2]} renderItem={renderItem} />

      </View>
    </View>
  )
})

export default MarketScreen

const styles = ScaledSheet.create({
  container: {},
  descriptionContainer: {
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: "12@s",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.offWhite,
  },
  description: {
    fontSize: '16@ms'
  },
  body: {
    paddingHorizontal: "16@s",
  },
})
