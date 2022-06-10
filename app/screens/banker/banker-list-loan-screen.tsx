/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useEffect } from "react"
import { StyleSheet } from "react-native"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { ScreenNames } from "../../navigators/screen-names"
import { HeaderBgSvg, SearchNormalSvg, FilterSvg } from "../../assets/svgs"
import { Box, HStack, Input, Pressable, SectionList } from "native-base"
import { s, vs } from "react-native-size-matters"
import { translate } from "../../i18n"
import { Text } from "../../components"

interface Props {}

const BankerListLoanScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { bankerStore } = useStores()

  useEffect(() => {
    bankerStore.getSurveyResults({}, { page: 1, limit: 20 })
  }, [])

  const showDetail = useCallback(
    (data) => navigation.navigate(ScreenNames.BANKER_LOAN_DETAIL_SCREEN, { data }),
    [],
  )

  const renderSectionHeader = useCallback(({ section: { title } }) => {
    return (
      <HStack
        alignItems="center"
        justifyContent="space-between"
        bg="lightBlue"
        px={s(16)}
        py={vs(6)}
      >
        <Text fontWeight="600" fontSize="14" color="grayChateau" text={"YCTV mới (05/ 2022)"} />
        <Text>
          <Text color="grayChateau" fontWeight="500" fontSize="12" text="Hồ sơ còn lại: " />
          <Text fontWeight="500" fontSize="12" color="primary" text="20" />
        </Text>
      </HStack>
    )
  }, [])
  const renderItem = useCallback(({ item, index }) => {
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
        <Box ml={vs(16)} alignItems="center" justifyContent="center">
          <Text fontSize={10} fontWeight="500" color="ebony" text="HSV - 12345" />
          <Text fontSize={10} fontWeight="500" mt="0.5" color="grayChateau" text="Đã tiếp nhận" />
        </Box>
        <Box height={vs(77)} borderLeftWidth={1} mx={s(21)} borderLeftColor="iron" />
        <Box>
          <Text
            textTransform="uppercase"
            fontSize={12}
            fontWeight="700"
            color="black"
            lineHeight={17}
            text="Vay tín chấp cT tài chính"
          />
          <Text
            mt="1"
            fontSize={12}
            fontWeight="400"
            color="ebony"
            lineHeight={17}
            text="Dieu nguyen trong nguyen"
          />
          <Text
            mt="1"
            fontSize={12}
            fontWeight="700"
            color="primary"
            lineHeight={17}
            text="2.000.000.000vnđ"
          />
          <Text
            mt="1"
            fontSize={10}
            fontWeight="400"
            color="grayChateau"
            lineHeight={14}
            text="15:35 - 30/05/2022"
          />
        </Box>
      </Pressable>
    )
  }, [])

  const DATA = [
    {
      title: "Main dishes",
      data: ["Pizza", "Burger", "Risotto"],
    },
    {
      title: "Sides",
      data: ["French Fries", "Onion Rings", "Fried Shrimps"],
    },
    {
      title: "Drinks",
      data: ["Water", "Coke", "Beer"],
    },
    {
      title: "Desserts",
      data: ["Cheese Cake", "Ice Cream"],
    },
  ]

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
              placeholder={translate("banker.searchPleacholder")}
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
        sections={DATA}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled
      />
    </Box>
  )
})

export default BankerListLoanScreen

const styles = StyleSheet.create({
  header: { backgroundColor: "transparent", borderBottomWidth: 0 },
})
