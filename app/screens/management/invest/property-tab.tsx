import React, { useCallback, useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import PropertyInfo from "./components/property-info"
import PropertyItem from "./components/property-item"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"

interface Props {
}

const PropertyTab = React.memo((props: Props) => {
  const {assetStore} = useStores()
  const [asset, setAsset] = useState([])

  useEffect(()=> {
    assetStore.getUserAsset().then(res => {
      setAsset(res)
    })
  },[])

  const renderItem = useCallback(({ item }) => {
    return <PropertyItem item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <PropertyInfo asset={asset}/>
      <FlatList keyExtractor={(e, i) => i.toString()} data={asset} renderItem={renderItem}
                contentContainerStyle={styles.flatList} />
    </View>
  )
})


export default PropertyTab

const styles = ScaledSheet.create({
  container: {flex:1},
  flatList: {
    paddingVertical: "12@s",
  },
})
