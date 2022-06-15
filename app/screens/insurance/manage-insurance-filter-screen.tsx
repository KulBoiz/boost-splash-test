/* eslint-disable react-native/no-color-literals */
import React, { FC, useCallback, useState } from "react"
import { observer } from "mobx-react-lite"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { useNavigation } from "@react-navigation/native"
import { Box, Button, Pressable, Radio, Row } from "native-base"
import { BORDER_BOTTOM_0 } from "../../styles/common-style"
import { INSURANCE_CATEGORIES, INSURANCE_STATUS } from "./constants"
import { Text } from "../../components"
import { width } from "../../constants/variable"
import { isEmpty } from "validate.js"
import PopupAlert from "../../components/popup-alert/popup-alert"
import { find } from "../../utils/lodash-utils"
import { CheckBoxEmptySvg, CheckBoxSvg } from "../../assets/svgs"

interface Props {}

const ManageInsuranceFilerScreen: FC<Props> = observer((props: Props) => {
  const navigation = useNavigation()
  const { insuranceStore } = useStores()

  const [filter, setFilter] = useState<any>({
    categories: [],
    status: "",
  })
  const [alert, setAlert] = useState<any>({
    visible: false,
    data: {},
    type: "reject",
    message: "",
  })

  const onChangeFilter = useCallback(
    (newProperties) => {
      setFilter({ ...filter, ...newProperties })
    },
    [filter],
  )
  const onClear = useCallback(() => {
    setFilter({})
  }, [])
  const onFilter = useCallback(() => {
    setAlert({
      visible: true,
      message: "Bạn có muốn lưu bộ lọc này trước khi quay về?",
      confirmText: "Lưu bộ lọc",
      rejectText: "Không lưu",
    })
  }, [])

  const onAlertConfirm = useCallback(async () => {
    setAlert({ visible: false })
    navigation.goBack()
  }, [alert, navigation])

  const clearDisabled = isEmpty(filter.categories) && isEmpty(filter.status)

  return (
    <Box flex="1" bg="lightBlue">
      <AppHeader style={BORDER_BOTTOM_0} headerTx={"header.filter"} />
      <Box flex={1}>
        <Box bg="white" mt="6" p="4">
          <Text size="semiBold14" color="ebony" text="Danh mục" />
          <Row flexWrap="wrap">
            {INSURANCE_CATEGORIES.map((item) => {
              const selected = find(filter.categories, (c) => c === item.value)
              return (
                <Pressable
                  onPress={() => onChangeFilter({ categories: [...filter.categories, item.value] })}
                  key={item.value}
                  flexDirection="row"
                  alignItems="center"
                  width={(width - 32) / 2}
                  mt="4"
                >
                  {selected ? <CheckBoxSvg /> : <CheckBoxEmptySvg />}
                  <Text size="regular12" color="ebony" ml="1" text={item.title} />
                </Pressable>
              )
            })}
          </Row>
        </Box>
        <Box bg="white" mt="2" py="4">
          <Text mx="4" size="semiBold14" color="ebony" text="Trạng thái" />
          <Radio.Group
            value={filter.status}
            onChange={(value) => onChangeFilter({ status: value })}
            name="status"
            accessibilityLabel="status"
            px="3"
          >
            {INSURANCE_STATUS.map((item) => {
              return (
                <Radio
                  key={item.value}
                  value={item.value}
                  _text={{ flex: 1, left: "0", position: "absolute" }}
                  _stack={{ width: "100%", justifyContent: "flex-end", mt: "3" }}
                >
                  {item.title}
                </Radio>
              )
            })}
          </Radio.Group>
        </Box>
      </Box>
      <Row safeArea mx="4">
        <Button
          onPress={onClear}
          bg="white"
          borderWidth={1}
          borderColor={clearDisabled ? "grayChateau" : "primary"}
          flex="1"
          mr="4"
          _text={{ color: clearDisabled ? "grayChateau" : "primary" }}
        >
          Xóa bộ lọc
        </Button>
        <Button
          disabled={clearDisabled}
          onPress={onFilter}
          bg={!clearDisabled ? "primary" : "grayChateau"}
          flex="1"
        >
          Áp dụng
        </Button>
      </Row>
      <PopupAlert
        visible={alert.visible}
        type={alert.type}
        message={alert.message}
        confirmText={alert.confirmText}
        rejectText={alert.rejectText}
        onClose={() => setAlert({ visible: false })}
        onConfirm={onAlertConfirm}
      />
    </Box>
  )
})

export default ManageInsuranceFilerScreen
