import React, { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, View } from "react-native"
import PropertyInfo from "./components/property-info"
import PropertyItem from "./components/property-item"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../../models"
import { color } from "../../../theme"
import { Modalize } from "react-native-modalize"
import PropertyModalize from "./components/property-modalize"
import EmptyList from "../../../components/empty-list"

interface Props {
}

const PropertyTab = React.memo((props: Props) => {
  const { assetStore } = useStores()
  const [asset, setAsset] = useState([])
  const [itemData, setItemData] = useState({})
  const modalizeSuccessRef = useRef<Modalize>(null)

  const onOpenSuccess = React.useCallback((item) => {
    setItemData(item)
    modalizeSuccessRef.current?.open()
  }, [])

  const onCloseSuccess = React.useCallback(() => {
    modalizeSuccessRef.current?.close()
  }, [])

  useEffect(() => {
    assetStore.getUserAsset().then(res => {
      if (res.error || res?.kind === 'server') return
      setAsset(res)
    })
  }, [])

  const renderItem = useCallback(({ item }) => {
    return <PropertyItem item={item} onOpenSuccess={onOpenSuccess}/>
  }, [])

  if (!asset.length) return <EmptyList />

  return (
    <View style={styles.container}>
      <PropertyInfo asset={asset} />
      <View style={styles.body}>
        <FlatList keyExtractor={(e, i) => i.toString()} data={asset} renderItem={renderItem}
                  contentContainerStyle={styles.flatList} />
      </View>
      <PropertyModalize modalizeRef={modalizeSuccessRef} closeModal={onCloseSuccess} item={itemData} />

    </View>
  )
})


export default PropertyTab

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  body: {
    flex:1,
    backgroundColor: color.background,
    borderTopRightRadius: '20@s',
    borderTopLeftRadius: '20@s',
  },
  flatList: {
    paddingVertical: "12@s",
    paddingHorizontal: "16@s",
  },
})
