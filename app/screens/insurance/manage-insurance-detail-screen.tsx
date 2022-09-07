/* eslint-disable react-native/no-color-literals */
import { observer } from "mobx-react-lite"
import moment from "moment"
import {
  Box,
  Button,
  HStack,
  Row,
  ScrollView
} from "native-base"
import React, { FC, useCallback, useEffect, useState } from "react"
import { vs } from "react-native-size-matters"
import {
  FileDocSvg, ListHospitalSvg,
} from "../../assets/svgs"
import { Text } from "../../components"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { navigate } from "../../navigators"
import { ScreenNames } from "../../navigators/screen-names"
import { BORDER_BOTTOM_0 } from "../../styles/common-style"
import ManageInsuranceHelp from "./components/manage-insurance-help"
import PopupHospitalList from "./components/popup-hospital-list"
import ValidityCheck from "./components/validity-check"
import { formatDate, getFullName, numberWithCommas } from "../../constants/variable"

interface Props {}

const ManageInsuranceDetailScreen: FC<Props> = observer((props: any) => {
  const {insuranceStore} = useStores()
  const index = props?.route?.params?.index
  const isListBuy = props?.route?.params?.isListBuy

  const data = isListBuy ? insuranceStore.listBuy[index] : insuranceStore.listClaim[index]
  useEffect(()=> {
    insuranceStore.getListHospital(data?.product?.id)
  },[])

  const startDate = data?.meta?.time?.startTime
  const endDate = data?.meta?.time?.endTime

  const [collapsed, setCollapsed] = useState(true)
  const [popupHospitalListVisible, setPopupHospitalListVisible] = useState(false)

  const showPopupHospital = useCallback(() => setPopupHospitalListVisible(true), [])
  const hidePopupHospital = useCallback(() => setPopupHospitalListVisible(false), [])

  const onRequest = useCallback(() => {
    navigate(ScreenNames.CLAIM_INSURANCE, {productId: data?.productId, index})
  }, [])

  const renderItem = useCallback(({ item, index }: { item: any; index: any }) => {
    return (
      <HStack mt={index ? vs(12) : 0} key={index.toString()}>
        <Text color="lighterGray" size="medium12" text={item.label} />
        <Text color="lighterGray" size="medium12" text=":" />
        <Text color="ebony" size="medium12" text={item.value} flex="1" textAlign="right" />
      </HStack>
    )
  }, [])

  const getUser = (fullName) => {
    return data?.transaction?.customers?.find(item => item?.fullName?.toLowerCase() === fullName?.toLowerCase())
  }
  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader
        style={BORDER_BOTTOM_0}
        headerText={data?.product?.name ?? ''}
        renderRightIcon={<ManageInsuranceHelp />}
      />
      <ScrollView>
        <ValidityCheck
          endDate={data?.meta?.time?.endTime ?? new Date()}
          startDate={data?.meta?.time?.startTime ?? new Date()}
          config={data?.product?.insuranceConfig}
        />
        <Box
          // mt="6"
          px="4">
          {/* <Row alignItems="center"> */}
          {/*  <FileDocSvg /> */}
          {/*  <Text mx="1" fontSize="12" fontWeight="500" flex="1" text="Xem / tải giấy chứng nhận" /> */}
          {/*  <Text */}
          {/*    onPress={showPopupHospital} */}
          {/*    suppressHighlighting */}
          {/*    fontSize="12" */}
          {/*    fontWeight="500" */}
          {/*    color="primary" */}
          {/*    text="Bệnh viện bảo lãnh" */}
          {/*    mr="1" */}
          {/*  /> */}
          {/*  <ListHospitalSvg /> */}
          {/* </Row> */}

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
                value: data?.product?.name ?? '',
              },
              index: 0,
            })}
            {renderItem({
              item: {
                label: "Nhà bảo hiểm",
                value: data?.product?.isFina ? "FINA" : data?.product?.org?.name ?? '_',
              },
              index: 1,
            })}
            {renderItem({
              item: {
                label: "Thời hạn hợp đồng",
                value: `${formatDate(startDate)} - ${formatDate(endDate)}`,
              },
              index: 2,
            })}
            {renderItem({
              item: {
                label: "Gói bảo hiểm",
                value: data?.meta?.label ?? '_',
              },
              index: 3,
            })}
            {renderItem({
              item: {
                label: "Số tiền bảo hiểm",
                value: `${numberWithCommas(data?.meta?.amount) ?? '0'} vnđ`,
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
               value: getFullName(data?.user),
             },
             index: 0,
           })}
           {renderItem({
             item: {
               label: "Ngày sinh",
               value: data?.user?.yearOfBirth || (getUser(data?.user?.fullName)?.dateOfBirth ? moment(getUser(data?.user?.fullName)?.dateOfBirth).format('DD/MM/YYYY') : '_'),
             },
             index: 1,
           })}
           {renderItem({
             item: {
               label: "CMND/ CCCD",
               value: data?.user?.idNumber || (getUser(data?.user?.fullName)?.idNumber || '_'),
             },
             index: 2,
           })}
           {renderItem({
             item: {
               label: "Email",
               value: data?.user?.emails?.[0]?.email || '_',
             },
             index: 3,
           })}
          {renderItem({
             item: {
               label: "Phone",
               value: data?.user?.tels?.[0]?.tel,
             },
             index: 4,
           })}
          </Box>
          {
            (moment(data?.meta?.time?.startTime) <= moment(new Date())) &&
            ((Number(moment(data?.meta?.time?.endTime).format('x')) - +moment(new Date()).format('x')) > 0) &&
            <Button my="6" onPress={onRequest}>
              Yêu cầu bồi thường bảo hiểm
            </Button>
          }
        </Box>
      </ScrollView>
      <PopupHospitalList visible={popupHospitalListVisible} onClose={hidePopupHospital} />
    </Box>
  )
})

export default ManageInsuranceDetailScreen
