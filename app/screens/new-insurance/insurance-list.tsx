import React, { useEffect, useState } from 'react';
import { FlatList, View } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import AppHeader from '../../components/app-header/AppHeader';
import BottomView from '../../components/bottom-view';
import EmptyList from '../../components/empty-list';
import { LoadingComponent } from '../../components/loading';
import { useStores } from '../../models';
import { color } from '../../theme/color';
import MenuFilter from '../loan/components/finance-filter';
import InsuranceItem from "./insurance-item";

interface Props { }

const InsuranceList = React.memo((props: any) => {
  const [select, setSelect] = useState<any>()
  const [menu, setMenus] = useState([])
  const [loading, setLoading] = useState<boolean>(true)
  const [insurances, setInsurances] = useState([])
  const { insuranceStore, productStore } = useStores()
  const key = props?.route?.params?.key
  const name = props?.route?.params?.name

  const paramsFilter = {
    categoryId: key
  }

  useEffect(() => {
    insuranceStore.getOrgInsurance().then((res) => {
      setMenus(res?.data ? res?.data?.map(el => ({ key: el?.id, title: el?.code })) : [])
      setLoading(false)
    });

    productStore.get(paramsFilter).then((res) => {
      setInsurances(res?.data)
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
      productStore.get({ ...paramsFilter, orgId: value?.key }).then((res) => {
        setInsurances(res?.data)
        setLoading(false)
      });
    } else {
      productStore.get(paramsFilter).then((res) => {
        setInsurances(res?.data)
        setLoading(false)
      });
    }
  }

  const renderItem = React.useCallback(({ item }) => {
    return <InsuranceItem item={item} />
  }, [])

  return (
    <View style={styles.container}>
      <AppHeader headerText={name} isBlue />

      <MenuFilter
        filterData={[{
          title: 'tất cả'
        }, ...menu]}
        currentSelected={select}
        setCurrentSelected={(value) => { filter(value) }}
        notShowIcon={true}
        backgroundColor={color.palette.F0F0F0}
      />

      {!loading ?
        <View style={styles.body}>
          {insurances?.length === 0 ? <EmptyList style={styles.nodata} /> :
            <FlatList
              data={insurances}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.contentStyle}
              ListFooterComponent={<BottomView height={50} />}
            />}
        </View> :
        <LoadingComponent />}
    </View>
  )
});

export default InsuranceList;

const styles = ScaledSheet.create({
  body: {
    flex:1
  },
  container: {
    flex: 1,
  },
  contentStyle: {
    marginVertical: '24@s',
    paddingHorizontal: '16@s',
},
  nodata: {
    backgroundColor: color.palette.white,
  }
});
