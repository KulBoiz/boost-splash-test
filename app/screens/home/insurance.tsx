import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ms, ScaledSheet } from "react-native-size-matters"
import { images } from "../../assets/images"
import { LoadingComponent } from "../../components/loading"
import { width } from "../../constants/variable"
import { useStores } from "../../models"
import { color } from "../../theme"
import MenuFilter from "../loan/components/finance-filter"
import InsuranceItem from "./components/insurance-item"

const widthHeight = width - ms(32)

interface Props { }

const Insurance = observer((props: Props) => {
  const [select, setSelect] = useState<any>()
  // @ts-ignore
  const { menuFilterStore, productStore } = useStores();
  const { categories } = menuFilterStore;
  const { records } = productStore;
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    menuFilterStore.get()
    productStore.get().then(() => {
      setLoading(false)
    });
  }, [])

  const filter = (value) => {
    setLoading(true)

    if (value?.key === select?.key) {
      return;
    }
    setSelect(value);

    if (value?.key !== 'all') {
      productStore.get({ categoryId: value?.key }).then(() => {
        setLoading(false)
      });
    } else {
      productStore.get().then(() => {
        setLoading(false)
      });
    }
  }

  return (
    <View style={styles.container}>
      <MenuFilter
        currentSelected={select}
        setCurrentSelected={(value) => { filter(value) }}
        filterData={[{
          key: 'all',
          icon: images.cube,
          title: 'tất cả'
        }].concat(categories)}
        style={styles.filter} />
      
      {!loading ? <View style={styles.body}>
        {records.map((val, index) => {
          return <InsuranceItem key={index.toString()} item={val} />
        })}
      </View> : <LoadingComponent />}
    </View>
  )
});

export default Insurance;

const styles = ScaledSheet.create({
  container: {
    borderRadius: '8@s',
    width: widthHeight,
    backgroundColor: color.background
  },
  filter: {
    borderRadius: '8@s',
    backgroundColor: color.background,
    paddingTop: '30@s'

  },
  body: {
    padding: '16@ms',

  }

});
