import { observer } from "mobx-react-lite"
import { Box, Pressable, Row } from "native-base"
import React, { useCallback, useEffect, useState } from "react"
import Modal from "react-native-modal"
import { CloseSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import { FastImage } from "../../../components/fast-image/fast-image"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { width } from "../../../constants/variable"
import { useStores } from "../../../models"

interface Props {
  visible: boolean
  onClose?: () => void
}

const PopupHospitalList = observer(({ visible, onClose }: Props) => {
  const {insuranceStore} = useStores()
  const [activeIndex, setActiveIndex] = useState(0)
  const data = [1, 2, 3]

  const renderItem = useCallback(() => {
    return (
      <Row flexWrap="wrap" justifyContent={"center"}>
        {Array(9)
          .fill("")
          .map((item, index) => (
            <Box key={index} width="100.0" mb="6" alignItems="center" justifyContent="center">
              <FastImage
                source={{
                  uri:
                    "https://songkhoe.medplus.vn/wp-content/uploads/2020/03/B%E1%BB%87nh-vi%E1%BB%87n-%C4%91a-khoa-Th%C3%A0nh-ph%E1%BB%91-C%E1%BA%A7n-Th%C6%A1.png",
                }}
                width={60}
                height={60}
                rounded="full"
              />
              <Text
                mt="2"
                textAlign="center"
                fontSize="10"
                fontWeight="400"
                text={"Bệnh viên đa khoa\nTP. Cần Thơ"}
              />
            </Box>
          ))}
      </Row>
    )
  }, [])

  return (
    <Modal isVisible={visible}>
      <Box bg="white" borderRadius="8">
        <Row alignItems="center">
          <Pressable p="4" opacity={0}>
            <CloseSvg />
          </Pressable>
          <Text
            color="ebony"
            flex="1"
            fontSize="14"
            fontWeight="600"
            text="Danh sách bệnh viện bảo lãnh"
            textAlign="center"
          />
          <Pressable p="4" onPress={onClose}>
            <CloseSvg />
          </Pressable>
        </Row>
        <Carousel
          key={(_, i) => i.toString()}
          data={data}
          sliderWidth={width - 40}
          itemWidth={width - 40}
          renderItem={renderItem}
          inactiveSlideScale={1}
          onSnapToItem={setActiveIndex}
        />
        <Box mb="6">
          <Pagination
            containerStyle={{ height: 6, marginTop: 0, paddingVertical: 0 }}
            dotsLength={data.length}
            activeDotIndex={activeIndex}
            dotStyle={{
              width: 4,
              height: 4,
            }}
            inactiveDotStyle={{
              width: 4,
              height: 4,
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
            dotColor="#064DD6"
            inactiveDotColor="#D7DADC"
          />
        </Box>
      </Box>
    </Modal>
  )
})

export default PopupHospitalList
