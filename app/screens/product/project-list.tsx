import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { ActivityIndicator, FlatList, ScrollView, View } from "react-native"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../components/app-text/AppText"
import BottomView from "../../components/bottom-view"
import { fontFamily } from "../../constants/font-family"
import { useStores } from "../../models"
import { MARGIN_BOTTOM_24, MARGIN_TOP_16 } from "../../styles/common-style"
import { color } from "../../theme"
import BankInfo from "../loan/components/bank-info"

const ProjectList = observer((props: any) => {
  const { data } = props
  const { productStore } = useStores()

  useEffect(() => {
    const params = {
      filter: {
        ids: data?.map(el => el?.id),
        limit: 50,
        skip: 0
      },
      page: 1
    }

    productStore.getProductByProject(params).then((res) => {
      console.log(res);
    })
  })

  const renderItem = ({ item }) => {
    return <BankInfo item={item} />
  }

  const loadMore = () => {
    //
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.filter} horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((el, index) => <View key={index.toString()} style={styles.textFilter}>
          <AppText
            value={`${el?.name} tháng`}
            fontSize={s(10)}
            fontFamily={fontFamily.medium}
            color={color.palette.BABABA}
          />
        </View>)}
      </ScrollView>

      {productStore?.isRefreshing ?
        <ActivityIndicator color={color.primary} style={MARGIN_TOP_16} /> :
        <>
          <FlatList
            data={data}
            keyExtractor={(e, i) => i.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.contentStyle}
            ListFooterComponent={<BottomView height={50} />}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}
          />
          {productStore?.isLoadMore && <ActivityIndicator color={color.primary} style={MARGIN_BOTTOM_24} />}
        </>
      }
    </View>
  )
});

export default ProjectList;

const styles = ScaledSheet.create({
  container: {},
  filter: {
    marginTop: '16@s',
    marginHorizontal: '16@s'
  },
  textFilter: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    borderRadius: '4@s',
    paddingHorizontal: '8@s',
    paddingVertical: '4@s',
  },
  contentStyle: {
    marginVertical: '24@s',
    paddingHorizontal: '16@s',
  }
});
