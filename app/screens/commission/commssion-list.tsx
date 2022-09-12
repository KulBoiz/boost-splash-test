import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import AppHeader from "../../components/app-header/AppHeader"
import CommissionItem from "./components/commission-item"
import CommissionCash from "./components/commission-cash"
import EmptyList from "../../components/empty-list"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { useStores } from "../../models"

interface Props {
}

const type = {
  loan: 'loan',
  insurances: 'insurances'
}

const CommissionList = React.memo((props: Props) => {
  const { commissionStore, authStoreModel } = useStores()
  const [commission, setCommission] = useState<any>({})


  useEffect(() => {
    const userId = authStoreModel?.userId
    commissionStore.getCommission(userId, type.insurances).then(res => {
      setCommission(res)
    })
  }, [])

  const renderItem = ({item, index}) => {
    return <CommissionItem item={item}/>
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
      <CommissionCash  metadata={commission?.metadata}/>
      <FlatList
        data={commission?.data || []}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(e, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
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
  },
  flatList: {
    paddingVertical: '12@s',
    paddingHorizontal: '16@s'
  }
})
