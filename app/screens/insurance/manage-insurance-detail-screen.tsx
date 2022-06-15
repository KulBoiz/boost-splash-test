/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import {
  Box,
  Button,
  HStack,
  Input,
  Popover,
  Pressable,
  Row,
  ScrollView,
  SectionList,
  Spinner,
} from "native-base"
import { s, vs } from "react-native-size-matters"
import ManageInsuranceHelp from "./components/manage-insurance-help"
import { BORDER_BOTTOM_0 } from "../../styles/common-style"
import {
  BenefitInsuranceSvg,
  ChevronDownPrimarySvg,
  ChevronDownSvg,
  FileDocSvg,
} from "../../assets/svgs"
import { Text } from "../../components"
import Collapsible from "react-native-collapsible"

import { Text as ReactNativeText } from "react-native"
import { ScreenNames } from "../../navigators/screen-names"

interface Props {}

const ManageInsuranceDetailScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const {} = useStores()

  const [collapsed, setCollapsed] = useState(true)

  const onRequest = useCallback(() => {
    navigation.navigate(ScreenNames.INSURANCE_REQUEST_CLAIM_SUCCESS_SCREEN)
  }, [])

  const renderItem = useCallback(({ item, index }: { item: any; index: any }) => {
    return (
      <HStack mt={index ? vs(12) : 0} key={index}>
        <Text color="lighterGray" size="medium12" text={item.label} />
        <Text color="lighterGray" size="medium12" text=":" />
        <Text color="ebony" size="medium12" text={item.value} flex="1" textAlign="right" />
      </HStack>
    )
  }, [])

  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader
        style={BORDER_BOTTOM_0}
        headerText={"An tâm mùa dịch"}
        renderRightIcon={<ManageInsuranceHelp />}
      />
      <ScrollView>
        <Box mt="6" px="4">
          <Row alignItems="center">
            <FileDocSvg />
            <Text mx="1" fontSize="12" fontWeight="500" flex="1" text="Xem / tải hợp đồng" />
            <Text
              fontSize="10"
              fontWeight="500"
              color="primary"
              text="Danh sách bệnh viên bảo lãnh"
            />
          </Row>

          <Box bg="white" borderRadius="8" py="3" px="4" mt="4">
            <Text
              color="ebony"
              fontSize={12}
              lineHeight={17}
              fontWeight="500"
              text="Thông tin bảo hiểm"
            />
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: {
                label: "Dịch vụ",
                value: "An tâm mùa dịch",
              },
              index: 0,
            })}
            {renderItem({
              item: {
                label: "Nhà bảo hiểm:",
                value: "BSH Care",
              },
              index: 1,
            })}
            {renderItem({
              item: {
                label: "Thời hạn hợp đồng:",
                value: "25/04/2022 - 25/04/2023",
              },
              index: 2,
            })}
            {renderItem({
              item: {
                label: "Tổng số người tham gia:",
                value: "1 người",
              },
              index: 3,
            })}
            {renderItem({
              item: {
                label: "Số tiền bảo hiểm:",
                value: "200.000vnđ",
              },
              index: 4,
            })}
          </Box>
          <Box bg="white" borderRadius="8" py="3" px="4" mt="4">
            <Text
              color="ebony"
              fontSize={12}
              lineHeight={17}
              fontWeight="500"
              text="Thông tin người được bảo hiểm"
            />
            <Box height="1.0" my="3" bg="iron" opacity={0.5} />
            {renderItem({
              item: {
                label: "Họ và tên",
                value: "điểu nguyễn trọng nguyên",
              },
              index: 0,
            })}
            {renderItem({
              item: {
                label: "Ngày sinh",
                value: "BSH Care",
              },
              index: 1,
            })}
            {renderItem({
              item: {
                label: "CMND/ CCCD",
                value: "123456789",
              },
              index: 2,
            })}
            {renderItem({
              item: {
                label: "Email:",
                value: "nguyendnt@gmail.com",
              },
              index: 3,
            })}
          </Box>

          <Box bg="white" borderRadius="8" mt="4">
            <Pressable
              flexDirection="row"
              py={vs(12)}
              px={s(12)}
              alignItems="center"
              onPress={() => setCollapsed(!collapsed)}
            >
              <Text
                fontWeight="500"
                color="primary"
                fontSize="12"
                lineHeight="17"
                flex="1"
                text={"Quyền lợi bảo hiểm"}
                mr="3"
                numberOfLines={1}
              />
              <Box style={!collapsed && { transform: [{ rotate: "180deg" }] }}>
                <ChevronDownPrimarySvg />
              </Box>
            </Pressable>
            <Collapsible collapsed={collapsed}>
              <Box px="4" pb="3">
                <Box height="1.0" bg="iron" mb="3" opacity={0.5} />
                <Text text="Số tiền bảo hiểm:" />
                <ReactNativeText>
                  <Text size="regular12" color="grayChateau" text="- Chương trình" />
                  <Text fontSize="12" fontWeight="700" color="orange" text=" Đồng: 25 triệu " />
                  <Text size="regular12" color="grayChateau" text="đồng/người" />
                </ReactNativeText>
                <ReactNativeText>
                  <Text size="regular12" color="grayChateau" text="- Chương trình" />
                  <Text fontSize="12" fontWeight="700" color="orange" text=" Bạc: 50 triệu  " />
                  <Text size="regular12" color="grayChateau" text="đồng/người" />
                </ReactNativeText>
                <ReactNativeText>
                  <Text size="regular12" color="grayChateau" text="- Chương trình" />
                  <Text fontSize="12" fontWeight="700" color="orange" text=" Vàng: 100 triệu  " />
                  <Text size="regular12" color="grayChateau" text="đồng/người" />
                </ReactNativeText>
                <ReactNativeText>
                  <Text size="regular12" color="grayChateau" text="- Chương trình" />
                  <Text
                    fontSize="12"
                    fontWeight="700"
                    color="orange"
                    text=" Bạch Kim: 200 triệu  "
                  />
                  <Text size="regular12" color="grayChateau" text="đồng/người" />
                </ReactNativeText>
                <Row>
                  <Box flex="1">
                    <ReactNativeText>
                      <Text size="regular12" color="grayChateau" text="- Chương trình" />
                      <Text
                        fontSize="12"
                        fontWeight="700"
                        color="orange"
                        text=" Kim Cương: 500 triệu "
                      />
                      <Text size="regular12" color="grayChateau" text="đồng/người" />
                    </ReactNativeText>
                  </Box>
                  <BenefitInsuranceSvg />
                </Row>
              </Box>
            </Collapsible>
          </Box>
          <Button my="6" onPress={onRequest}>
            Yêu cầu bồi thường bảo hiểm
          </Button>
        </Box>
      </ScrollView>
    </Box>
  )
})

export default ManageInsuranceDetailScreen
