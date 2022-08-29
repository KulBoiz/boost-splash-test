import { Box, Spinner } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from 'react-native';
import { ScaledSheet } from "react-native-size-matters";
import SettingAuthScreen from "../../components/app-view-no-auth";
import EmptyList from "../../components/empty-list";
import { useStores } from "../../models";
import { navigate } from "../../navigators";
import { ScreenNames } from "../../navigators/screen-names";
import { color } from "../../theme";
import ManageInsuranceItem from "../insurance/components/manage-insurance-item";
import ManageInsuranceTab from "../insurance/components/manage-insurance-tab";
import { INSURANCE_TABS } from "../insurance/constants";
import BottomView from "../../components/bottom-view"

interface Props { }

const InsuranceScreen = (props: Props) => {
  const { insuranceStore, authStoreModel } = useStores()
  const [tabSelect, setTabSelect] = useState("1")
  const [loading, showLoading] = useState(false)

  const isListBuy = tabSelect === INSURANCE_TABS[0].key
  const isLoggedIn = authStoreModel.isLoggedIn

  useEffect(() => {
    fetchList()
  }, [])

  const fetchList = () => {
    showLoading(true)
    isListBuy ? insuranceStore.getListBuyInsurance({}, { page: 1, limit: 20 }).then(res => {
      showLoading(false)
    })
      : insuranceStore.getListClaimInsurance({}, { page: 1, limit: 20 }).then(res => {
        showLoading(false)
      })
  }

  const showDetail = useCallback((index) => {
    if (isListBuy) {
      navigate(ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN, { index, isListBuy })
    }
    else navigate(ScreenNames.INSURANCE_CLAIM_DETAIL, { index })
  }, [tabSelect])

  const _onRefresh = useCallback(() => {
    showLoading(true)
    isListBuy ?
      insuranceStore.getListBuyInsurance({}, { page: 1, limit: 20 }, true).then(res => {
        showLoading(false)
      })
      : insuranceStore.getListClaimInsurance({}, { page: 1, limit: 20 }, true).then(res => {
        showLoading(false)
      })
  }, [isListBuy])

  const _onLoadMore = useCallback(() => {
    if (isListBuy) {
      if (insuranceStore.listBuy?.length < insuranceStore.listBuyTotal
        && !insuranceStore.isLoadingMore
      ) {
        insuranceStore.getListBuyInsurance(
          {},
          { page: insuranceStore?.pagingListBuy?.page + 1, limit: 20 },
          false
        ).then(res => {
          showLoading(false)
        })
      }
    }
    else {
      if (insuranceStore.listClaim?.length < insuranceStore.listClaimTotal
        && !insuranceStore.isLoadingMore
      ) {
        insuranceStore.getListClaimInsurance(
          {},
          { page: insuranceStore?.pagingListClaim?.page + 1, limit: 20 },
          false
        ).then(res => {
          showLoading(false)
        })
      }
    }
  }, [insuranceStore.isLoadingMore, insuranceStore.listBuy, insuranceStore.listClaim])

  const onChangeTab = useCallback((key) => {
    setTabSelect(key)
    fetchList()
  }, [tabSelect])

  const renderItem = useCallback(({ item, index }) => {
    return <ManageInsuranceItem item={item} index={index} onPress={() => showDetail(index)} />
  }, [tabSelect])

  const ListFooterComponent = useCallback(() => {
    if (loading) {
      return <Spinner color="primary" m="4" />
    }
    return <BottomView height={100} />
  }, [loading])

  return (
    <>
      {isLoggedIn ?
        <Box flex="1" bg="lightBlue">
          <ManageInsuranceTab onChangeTab={onChangeTab} tabSelect={tabSelect} />
          <Box flex={1} bg="white" pt='1'>
            <FlatList
              data={isListBuy ? insuranceStore.listBuy : insuranceStore.listClaim}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              refreshControl={
                <RefreshControl
                  refreshing={insuranceStore.isRefreshing}
                  onRefresh={_onRefresh}
                  colors={[color.primary]}
                  tintColor={color.primary}
                />
              }
              onEndReachedThreshold={0.2}
              onEndReached={_onLoadMore}
              ListFooterComponent={ListFooterComponent}
              contentContainerStyle={styles.list}
              ListEmptyComponent={!loading ? EmptyList : <></>}
            />
          </Box>
        </Box> :
        <SettingAuthScreen />
      }
    </>
  )
}

export default InsuranceScreen;

const styles = ScaledSheet.create({
  container: { backgroundColor: color.palette.white, flex: 1 },
  header: { backgroundColor: "white", borderBottomWidth: 0 },
  list: {
    paddingVertical: '16@s'
  }
});
