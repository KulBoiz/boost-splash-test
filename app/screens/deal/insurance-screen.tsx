import { groupBy, map } from "lodash";
import moment from "moment";
import { Box, HStack, Spinner } from "native-base";
import React, { useCallback, useMemo, useState } from "react";
import { RefreshControl, SectionList } from 'react-native';
import { s, ScaledSheet, vs } from "react-native-size-matters";
import { Text } from "../../components";
import SettingAuthScreen from "../../components/app-view-no-auth";
import { useStores } from "../../models";
import { navigate } from "../../navigators";
import { ScreenNames } from "../../navigators/screen-names";
import { color } from "../../theme";
import ManageInsuranceItem from "../insurance/components/manage-insurance-item";
import ManageInsuranceTab from "../insurance/components/manage-insurance-tab";
import { INSURANCE_TABS } from "../insurance/constants";

interface Props { }

const InsuranceScreen = (props: Props) => {
  const { insuranceStore, authStoreModel } = useStores()
  const [tabSelect, setTabSelect] = useState("1")

  const isListBuy = tabSelect === INSURANCE_TABS[0].key
  const isLoggedIn = authStoreModel.isLoggedIn

  const showDetail = useCallback((index) => {
    if (isListBuy) {
      navigate(ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN, { index, isListBuy })
    }
    else navigate(ScreenNames.INSURANCE_CLAIM_DETAIL, { index })
  }, [tabSelect])

  const data = useMemo(() => {
    const dataGroup = groupBy(
      map(isListBuy ? insuranceStore.listBuy : insuranceStore.listClaim, (item) => ({
        ...item,
        dateGroup: isListBuy ? (item?.transaction?.subType) : moment(item.createdAt).format("MM/YYYY"),
      })),
      "dateGroup",
    )
    const sections = Object.keys(dataGroup).map((key) => ({
      data: dataGroup[key],
      title: isListBuy ? `${key}` : `Tháng ${key}`,
    }))

    return sections
  }, [insuranceStore.listBuy, insuranceStore.listClaim, tabSelect])

  const _onRefresh = useCallback(() => {
    isListBuy ?
      insuranceStore.getListBuyInsurance({}, { page: 1, limit: 20 }, true)
      : insuranceStore.getListClaimInsurance({}, { page: 1, limit: 20 }, true)
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
        )
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
        )
      }
    }
  }, [insuranceStore.isLoadingMore, insuranceStore.listBuy, insuranceStore.listClaim])

  const onChangeTab = useCallback((key) => {
    setTabSelect(key)

    isListBuy ?
      insuranceStore.getListBuyInsurance({}, { page: 1, limit: 20 })
      : insuranceStore.getListClaimInsurance({}, { page: 1, limit: 20 })

  }, [tabSelect])

  const renderSectionHeader = useCallback(({ section: { title, data } }) => {
    return (
      <HStack alignItems="center" bg="white" px={s(16)} py={vs(6)}>
        <Text fontWeight="600" fontSize="14" color="ebony" text={title} />
        <Text fontWeight="500" fontSize="12" color="primary" text={` (${data?.length || 0})`} />
      </HStack>
    )
  }, [])

  const renderItem = useCallback(({ item, index }) => {
    return <ManageInsuranceItem item={item} index={index} onPress={() => showDetail(index)} />
  }, [tabSelect])

  const ListFooterComponent = useCallback(() => {
    if (insuranceStore.isLoadingMore) {
      return <Spinner color="primary" m="4" />
    }
    return <Box m="4" />
  }, [insuranceStore.isLoadingMore])

  return (
    <>
      {isLoggedIn ?
        <Box flex="1" bg="lightBlue">

          <ManageInsuranceTab onChangeTab={onChangeTab} tabSelect={tabSelect} />
          <Box flex={1} bg="white" pt='1'>

            <SectionList
              sections={data}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              stickySectionHeadersEnabled
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
});
