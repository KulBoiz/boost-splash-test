/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect, useMemo, useState } from "react"
import { RefreshControl, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { HeaderBgSvg, SearchNormalSvg } from "../../assets/svgs"
import { Box, HStack, Input, SectionList, Spinner } from "native-base"
import { s, vs } from "react-native-size-matters"
import { translate } from "../../i18n"
import { Text } from "../../components"
import { color } from "../../theme"
import { debounce, groupBy, map } from "../../utils/lodash-utils"
import moment from "moment"
import BankerLoanItem from "./components/banker-loan-item"
import BankerTab from "./components/banker-tab"
import { LOAN_STATUS_DATA } from "./constants"

interface Props {}

const BankerListLoanScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { bankerStore } = useStores()

  const [searchStr, setSearchStr] = useState("")
  const [tab, setTab] = useState(undefined)

  useEffect(() => {
    bankerStore.getListLoan({status: tab}, { page: 1, limit: 20 })
  }, [])

  const showDetail = useCallback(
    (tab, index) => navigation.navigate(ScreenNames.BANKER_LOAN_DETAIL_SCREEN, { tab, index }),
    [tab],
  )
  const data = useMemo(() => {
    const dataGroup = groupBy(
      map(bankerStore.listLoan, (item) => ({
        ...item,
        dateGroup: moment(item.createdAt).format("MM/YYYY"),
      })),
      "dateGroup",
    )
    const sections = Object.keys(dataGroup).map((key) => ({
      data: dataGroup[key],
      title: `Tháng ${key}`,
    }))
    return sections
  }, [bankerStore.listLoan])

  const _onRefresh = useCallback(() => {
    bankerStore.getListLoan({ search: searchStr, status: tab }, { page: 1, limit: 20 }, true)
  }, [searchStr, tab])

  const _onLoadMore = useCallback(() => {
    if (
      bankerStore.listLoan?.length < bankerStore.listLoanTotal &&
      !bankerStore.isLoadingMoreListLoan
    ) {
      bankerStore.getListLoan(
        { search: searchStr, status: tab },
        { page: bankerStore?.pagingParamsListLoan?.page + 1, limit: 20 },
        false,
      )
    }
  }, [
    bankerStore.listLoan,
    bankerStore.listLoanTotal,
    bankerStore?.pagingParamsListLoan?.page,
    bankerStore.isLoadingMoreListLoan,
    searchStr,
    tab
  ])

  const onDebouncedSearch = React.useCallback(
    debounce((value) => {
      bankerStore.getListLoan({ search: value, status: tab}, { page: 1, limit: 20 })
    }, 500),
    [tab],
  )

  const onChangeTab = useCallback((key) => {
    setTab(key)
    bankerStore.getListLoan({ search: searchStr, status: key }, { page: 1, limit: 20 })
  }, [searchStr])

  const renderSectionHeader = useCallback(({ section: { title, data } }) => {
    return (
      <HStack alignItems="center" bg="lightBlue" px={s(16)} py={vs(6)}>
        <Text fontWeight="600" fontSize="14" color="grayChateau" text={title} />
        <Text fontWeight="500" fontSize="12" color="primary" text={` (${data?.length || 0})`} />
      </HStack>
    )
  }, [])
  const renderItem = useCallback(({ item, index }) => {
    return <BankerLoanItem item={item} index={index} onPress={() => showDetail(tab, index)} />
  }, [])

  const ListFooterComponent = useCallback(() => {
    if (bankerStore.isLoadingMoreListLoan) {
      return <Spinner color="primary" m="4" />
    }
    return <Box m="4" />
  }, [bankerStore.isLoadingMoreListLoan])

  return (
    <Box flex="1" bg="lightBlue">
      <Box bg="primary" borderBottomLeftRadius={8} borderBottomRightRadius={8}>
        <Box position="absolute" left="0" right="0" bottom="0">
          <HeaderBgSvg />
        </Box>
        <AppHeader isBlue style={styles.header} headerTx={"header.bankerListLoan"} />
        <HStack alignItems="center" px={s(16)}>
          <HStack
            flex="1"
            height={vs(40)}
            bg="white"
            borderRadius="8"
            mb={s(16)}
            alignItems="center"
            px={s(8)}
          >
            <SearchNormalSvg />
            <Input
              variant="outline"
              borderWidth={0}
              flex="1"
              placeholder={translate("banker.searchPlaceholder")}
              placeholderTextColor="lighterGray"
              fontWeight="400"
              px="0"
              mx={s(16)}
              color="black"
              selectionColor="primary"
              bg="white"
              _focus={{ bg: "white" }}
              value={searchStr}
              onChangeText={(value) => {
                setSearchStr(value)
                onDebouncedSearch(value)
              }}
            />
          </HStack>
          {/* <Box height={vs(40)} px={s(16)}>
            <FilterSvg />
          </Box> */}
        </HStack>
      </Box>
      <Box mt={vs(16)} mb={vs(8)}>
        <BankerTab data={LOAN_STATUS_DATA} onChangeTab={onChangeTab} />
      </Box>
      <SectionList
        sections={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        refreshControl={
          <RefreshControl
            refreshing={bankerStore.isRefreshingListLoan}
            onRefresh={_onRefresh}
            colors={[color.primary]}
            tintColor={color.primary}
          />
        }
        onEndReachedThreshold={0.4}
        onEndReached={_onLoadMore}
        ListFooterComponent={ListFooterComponent}
      />
    </Box>
  )
})

export default BankerListLoanScreen

const styles = StyleSheet.create({
  header: { backgroundColor: "transparent", borderBottomWidth: 0 },
})
