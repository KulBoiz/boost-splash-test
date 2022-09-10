import React from "react"
import { FlatList, StyleSheet, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CommissionItem from "./components/commission-item"
import CommissionCash from "./components/commission-cash"
import EmptyList from "../../components/empty-list"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"

interface Props {
}

const CommissionList = React.memo((props: Props) => {

  const renderItem = () => {
    return <CommissionItem />
  }
  const renderEmpty = () => {
    return (
      <View style={styles.empty}>
        <EmptyList emptyIcon={<FastImage source={images.commission_empty} style={styles.icon}/>} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader headerText={"Danh sách hoa hồng"} isBlue />
      <CommissionCash />
      <FlatList
        data={[0,1,2,3,4]}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
      />
    </View>
  )
})

export default CommissionList

const styles = ScaledSheet.create({
  container: {
    flex:1,
    backgroundColor: color.background
  },
  empty: {
    paddingTop: '50@s'
  },
  icon: {
    width: '180@s',
    height: '180@s'
  }
})
