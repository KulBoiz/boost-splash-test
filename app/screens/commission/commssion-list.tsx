import React, { useCallback, useEffect, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import CommissionItem from "./components/commission-item"
import CommissionCash from "./components/commission-cash"
import EmptyList from "../../components/empty-list"
import FastImage from "react-native-fast-image"
import { images } from "../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { useStores } from "../../models"

interface Props {
  index: number
}

const type = {
  loan: 'loan',
  insurances: 'insurances'
}

const CommissionList = React.memo(({ index }: Props) => {
  const { commissionStore } = useStores()
  const [commission, setCommission] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getListCommission()
  }, [index])

  const getListCommission = useCallback(()=> {
    setLoading(true)
    commissionStore.getCommission(index === 0 ? type.insurances : type.loan).then(res => {
      setCommission(res)
      setLoading(false)
    }).catch(res=>setLoading(false))
  }, [index])

  const renderItem = useCallback(({item}) => {
    return <CommissionItem item={item} />
  }, [])

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.empty}>
        <EmptyList emptyIcon={<FastImage source={images.commission_empty} style={styles.icon}/>} />
      </View>
    )
  }, [])

  const onLoadMore = useCallback(()=> {
    commissionStore.loadMoreCommission(index === 0 ? type.insurances : type.loan).then(res => {
      setCommission([...commission, res])
    })
  },[])

  return (
    <View style={styles.container}>
      <CommissionCash metadata={commission?.metadata}/>
      <FlatList
        key={index}
        data={commission?.data || []}
        ListEmptyComponent={renderEmpty}
        keyExtractor={(e, i) => `${index}${i.toString()}`}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getListCommission}
            colors={[color.primary]}
            tintColor={color.primary}
          />
        }
        // onEndReached={onLoadMore}
        // onEndReachedThreshold={0.2}
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
