/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect, useMemo } from "react"
import { RefreshControl, StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { HeaderBgSvg, SearchNormalSvg, FilterSvg } from "../../assets/svgs"
import { Box, HStack, Input, Pressable, SectionList, Spinner } from "native-base"
import { s, vs } from "react-native-size-matters"
import { translate } from "../../i18n"
import { Text } from "../../components"
import { color } from "../../theme"
import { find, groupBy, map } from "../../utils/lodash-utils"
import moment from "moment"
import numeral from "numeral"
import { getSurveyName, GET_TASK_STATUS_ASSIGNED } from "./constants"

interface Props {}

const BankerListRequestScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { bankerStore } = useStores()

  useEffect(() => {
    bankerStore.getSurveyResults({}, { page: 1, limit: 20 })
  }, [])

  const showDetail = useCallback(
    (data) => navigation.navigate(ScreenNames.BANKER_REQUEST_DETAIL_SCREEN, { data }),
    [],
  )

  const getData = useMemo(() => {
    const dataGroup = groupBy(
      map(bankerStore.surveyResults, (item) => ({
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
  }, [bankerStore.surveyResults])

  const _onRefresh = useCallback(() => {
    bankerStore.getSurveyResults({}, { page: 1, limit: 20 }, true)
  }, [])
  const _onLoadMore = useCallback(() => {
    if (bankerStore.surveyResults?.length < bankerStore.surveyResultsTotal) {
      bankerStore.getSurveyResults(
        {},
        { page: bankerStore?.pagingParams?.page + 1, limit: 20 },
        false,
      )
    }
  }, [bankerStore])

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
          <Text color="grayChateau" fontWeight="500" fontSize="12" text="Hồ sơ còn lại: " />
          <Text fontWeight="500" fontSize="12" color="primary" text={data?.length || 0} />
        </Text>
      </HStack>
    )
  }, [])
  const renderItem = useCallback(({ item, index }) => {
    const name = getSurveyName(item.surveyDetails)
    const loanDetail =
      find(item.surveyDetails, (i) => i.questionData?.code === "QUESTION_LPC_LOAN_DEMAND") ||
      find(item.surveyDetails, (i) => i.questionData?.type === "OPEN_ENDED_NUMBER")
    const loanPlan = find(
      item.surveyDetails,
      (i) => i.questionData?.code === "QUESTION_LPC_LOAN_PLAN",
    )
    return (
      <Pressable
        onPress={() => showDetail(item)}
        height={vs(110)}
        borderRadius={8}
        bg="white"
        mx={s(16)}
        mt={index ? vs(10) : 0}
        flexDirection="row"
        alignItems="center"
      >
        <Box alignItems="center" justifyContent="center" width={s(100)} px="4">
          <Text fontSize={10} fontWeight="500" color="ebony" text={`HSV - ${item._iid}`} />
          <Text
            fontSize={10}
            fontWeight="500"
            mt="0.5"
            color="grayChateau"
            textAlign="center"
            text={GET_TASK_STATUS_ASSIGNED[item.task?.statusAssign]}
          />
        </Box>
        <Box height={vs(77)} borderLeftWidth={1} mr={s(21)} borderLeftColor="iron" />
        <Box>
          <Text
            textTransform="uppercase"
            fontSize={12}
            fontWeight="700"
            color="black"
            lineHeight={17}
            text={loanPlan?.selectedOptions?.[0]?.content}
          />
          {!!name && (
            <Text mt="1" fontSize={12} fontWeight="400" color="ebony" lineHeight={17} text={name} />
          )}
          <Text
            mt="1"
            fontSize={12}
            fontWeight="700"
            color="primary"
            lineHeight={17}
            text={`${numeral(loanDetail?.content).format("0,0")}${
              loanDetail?.questionData?.suffix
            }`}
          />
          <Text
            mt="1"
            fontSize={10}
            fontWeight="400"
            color="grayChateau"
            lineHeight={14}
            text={moment(item.sharedAt).format("hh:mm - DD/MM/YYYY")}
          />
        </Box>
      </Pressable>
    )
  }, [])

  const ListFooterComponent = useCallback(() => {
    if (bankerStore.isLoadingMore) {
      return <Spinner color="primary" m="4" />
    }
    return <Box m="4" />
  }, [bankerStore])

  return (
    <Box flex="1" bg="lightBlue">
      <Box bg="primary" borderBottomLeftRadius={8} borderBottomRightRadius={8}>
        <Box position="absolute" left="0" right="0" bottom="0">
          <HeaderBgSvg />
        </Box>
        <AppHeader isBlue style={styles.header} headerTx={"header.bankerListLoan"} />
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
            refreshing={bankerStore.isRefreshing}
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
