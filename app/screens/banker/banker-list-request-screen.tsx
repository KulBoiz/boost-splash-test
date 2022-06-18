/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect, useMemo } from "react"
import { RefreshControl, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { HeaderBgSvg, SearchNormalSvg, FilterSvg } from "../../assets/svgs"
import { Box, HStack, Input, SectionList, Spinner } from "native-base"
import { s, vs } from "react-native-size-matters"
import { translate } from "../../i18n"
import { Text } from "../../components"
import { color } from "../../theme"
import { debounce, groupBy, map } from "../../utils/lodash-utils"
import moment from "moment"
import BankerRequestItem from "./components/banker-request-item"

interface Props {}

const BankerListRequestScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { bankerStore } = useStores()

  useEffect(() => {
    bankerStore.getListRequest({}, { page: 1, limit: 20 })
  }, [])

  const showDetail = useCallback(
    (data) => navigation.navigate(ScreenNames.BANKER_REQUEST_DETAIL_SCREEN, { data }),
    [],
  )

  const getData = useMemo(() => {
    const dataGroup = groupBy(
      map(bankerStore.listRequest, (item) => ({
        ...item,
        dateGroup: moment(item.sharedAt).format("MM/YYYY"),
      })),
      "dateGroup",
    )
    const sections = Object.keys(dataGroup).map((key) => ({
      data: dataGroup[key],
      title: `YCTV mới (${key})`,
    }))
    return sections
  }, [bankerStore.listRequest])

  const _onRefresh = useCallback(() => {
    bankerStore.getListRequest({}, { page: 1, limit: 20 }, true)
  }, [])
  const _onLoadMore = useCallback(() => {
    if (
      bankerStore.listRequest?.length < bankerStore.listRequestTotal &&
      !bankerStore.isLoadingMoreListRequest
    ) {
      bankerStore.getListRequest(
        {},
        { page: bankerStore?.pagingParamsListRequest?.page + 1, limit: 20 },
        false,
      )
    }
  }, [
    bankerStore.listRequest,
    bankerStore?.pagingParamsListRequest?.page,
    bankerStore.listRequestTotal,
    bankerStore.isLoadingMoreListRequest,
  ])

  const onDebouncedSearch = React.useCallback(
    debounce((value) => {
      bankerStore.getListRequest({ search: value }, { page: 1, limit: 20 })
    }, 500),
    [],
  )

  const renderSectionHeader = useCallback(({ section: { title, data } }) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        bg="lightBlue"
        px={s(16)}
        py={vs(6)}
      >
        <Text fontWeight="600" fontSize="14" color="grayChateau" text={title} />
        <Text>
          {/* <Text color="grayChateau" fontWeight="500" fontSize="12" text="Hồ sơ còn lại: " />
          <Text fontWeight="500" fontSize="12" color="primary" text={data?.length || 0} /> */}
        </Text>
      </HStack>
    )
  }, [])
  const renderItem = useCallback(({ item, index }) => {
    return <BankerRequestItem item={item} index={index} onPress={() => showDetail(item)} />
  }, [])

  const ListFooterComponent = useCallback(() => {
    if (bankerStore.isLoadingMoreListRequest) {
      return <Spinner color="primary" m="4" />
    }
    return <Box m="4" />
  }, [bankerStore.isLoadingMoreListRequest])

  return (
    <Box flex="1" bg="lightBlue">
      <Box bg="primary" borderBottomLeftRadius={8} borderBottomRightRadius={8}>
        <Box position="absolute" left="0" right="0" bottom="0">
          <HeaderBgSvg />
        </Box>
        <AppHeader isBlue style={styles.header} headerTx={"header.bankerListRequest"} />
        <HStack alignItems="center">
          <HStack
            flex="1"
            height={vs(40)}
            bg="white"
            borderRadius="8"
            ml={s(16)}
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
              onChangeText={onDebouncedSearch}
            />
          </HStack>
          <Box height={vs(40)} px={s(16)}>
            <FilterSvg />
          </Box>
        </HStack>
      </Box>
      <SectionList
        contentContainerStyle={{ paddingTop: vs(18) }}
        sections={getData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
        refreshControl={
          <RefreshControl
            refreshing={bankerStore.isRefreshingListRequest}
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

export default BankerListRequestScreen

const styles = StyleSheet.create({
  header: { backgroundColor: "transparent", borderBottomWidth: 0 },
})
