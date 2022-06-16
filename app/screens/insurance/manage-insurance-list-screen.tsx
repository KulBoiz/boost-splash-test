/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useMemo, useState } from "react"
import { RefreshControl, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { SearchNormalSvg, FilterInsuranceSvg } from "../../assets/svgs"
import { Box, HStack, Input, Pressable, SectionList, Spinner } from "native-base"
import { s, vs } from "react-native-size-matters"
import { Text } from "../../components"
import { color } from "../../theme"
import { debounce, groupBy, map } from "../../utils/lodash-utils"
import ManageInsuranceItem from "./components/manage-insurance-item"
import ManageInsuranceTab from "./components/manage-insurance-tab"
import { INSURANCE_TABS } from "./constants"
import ManageInsuranceHelp from "./components/manage-insurance-help"

interface Props {}

const ManageInsuranceListScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { bankerStore } = useStores()

  const [tabSelect, setTabSelect] = useState(INSURANCE_TABS[0].key)

  const showDetail = useCallback((data) => {
    navigation.navigate(ScreenNames.MANAGE_INSURANCE_DETAIL_SCREEN, { data })
  }, [])
  const showFilter = useCallback((data) => {
    navigation.navigate(ScreenNames.MANAGE_INSURANCE_FILTER)
  }, [])

  const data = useMemo(() => {
    const sections =
      tabSelect === INSURANCE_TABS[0].key
        ? [
            { data: Array(3).fill(""), title: `Bảo hiểm sức khoẻ` },
            { data: Array(3).fill(""), title: `Bảo hiểm du lịch` },
          ]
        : [
            { data: [{ status: "1" }], title: `Bảo hiểm sức khoẻ` },
            { data: Array(3).fill(""), title: `Bảo hiểm du lịch` },
          ]
    return sections
  }, [tabSelect])

  const _onRefresh = useCallback(() => {
    bankerStore.getListLoan({}, { page: 1, limit: 20 }, true)
  }, [])
  const _onLoadMore = useCallback(() => {
    if (bankerStore.listLoan?.length < bankerStore.listLoanTotal) {
      // bankerStore.getListLoan(
      //   {},
      //   { page: bankerStore?.pagingParamsListLoan?.page + 1, limit: 20 },
      //   false,
      // )
    }
  }, [bankerStore])

  const onDebouncedSearch = React.useCallback(
    debounce((value) => {
      bankerStore.getListLoan({ search: value }, { page: 1, limit: 20 })
    }, 500),
    [],
  )
  const onChangeTab = useCallback((key) => {
    setTabSelect(key)
    // bankerStore.getListLoan({}, { page: 1, limit: 20 })
  }, [])

  const renderSectionHeader = useCallback(({ section: { title, data } }) => {
    return (
      <HStack alignItems="center" bg="white" px={s(16)} py={vs(6)}>
        <Text fontWeight="600" fontSize="14" color="ebony" text={title} />
        <Text fontWeight="500" fontSize="12" color="primary" text={` (${data?.length || 0})`} />
      </HStack>
    )
  }, [])
  const renderItem = useCallback(({ item, index }) => {
    return <ManageInsuranceItem item={item} index={index} onPress={() => showDetail(item)} />
  }, [])

  const ListFooterComponent = useCallback(() => {
    if (bankerStore.isLoadingMoreListLoan) {
      return <Spinner color="primary" m="4" />
    }
    return <Box m="4" />
  }, [bankerStore.isLoadingMoreListLoan])

  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader
        style={styles.header}
        headerTx={"header.manageInsuranceList"}
        renderRightIcon={<ManageInsuranceHelp />}
      />
      <ManageInsuranceTab onChangeTab={onChangeTab} tabSelect={tabSelect} />
      <Box flex={1} bg="white">
        <HStack alignItems="center" mt="4" mb="4">
          <HStack
            flex="1"
            height={s(40)}
            bg="#F3F6FD"
            borderRadius="16"
            ml={s(16)}
            alignItems="center"
            px={s(8)}
          >
            <SearchNormalSvg />
            <Input
              variant="outline"
              borderWidth={0}
              flex="1"
              placeholder="Hợp đồng bảo hiểm / số hợp đồng"
              placeholderTextColor="lighterGray"
              fontWeight="400"
              px="0"
              mx={s(16)}
              color="black"
              selectionColor="primary"
              _focus={{ bg: "white" }}
              onChangeText={onDebouncedSearch}
            />
          </HStack>
          <Pressable
            onPress={showFilter}
            height={s(40)}
            width={s(40)}
            alignItems="center"
            justifyContent="center"
            bg="#F1F5F9"
            mr="4"
            ml="2"
            borderRadius={8}
          >
            <FilterInsuranceSvg />
          </Pressable>
        </HStack>
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
    </Box>
  )
})

export default ManageInsuranceListScreen

const styles = StyleSheet.create({
  header: { backgroundColor: "white", borderBottomWidth: 0 },
})