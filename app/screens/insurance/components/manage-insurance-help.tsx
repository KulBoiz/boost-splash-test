import React from "react"
import { Box, Popover, Pressable } from "native-base"
import { QuestionLightSvg } from "../../../assets/svgs"
import { Text } from "../../../components"

const ManageInsuranceHelp = React.memo(() => {
  return (
    <Popover
      trigger={(triggerProps) => {
        return (
          <Pressable {...triggerProps} colorScheme="danger">
            <QuestionLightSvg />
          </Pressable>
        )
      }}
    >
      <Popover.Content accessibilityLabel="insurance_help" mx="4" bg="white">
        <Popover.Arrow bg="white" />
        <Box px="4" pt="5" pb="6">
          <Text
            textAlign="center"
            size="semiBold12"
            text="Hướng dẫn gửi yêu cầu bồi thường bảo hiểm"
          />
          <Text mt="6">
            <Text fontWeight="600" fontSize={12} color="ebony" text="Bước 1: " />
            <Text fontWeight="400" fontSize={12} color="grayChateau" text="Nhấp vào nút " />
            <Text
              fontWeight="600"
              fontSize={12}
              color="primary"
              text=' “Yêu cầu bồi thường bảo hiểm"'
            />
            <Text
              fontWeight="400"
              fontSize={12}
              color="grayChateau"
              text=" trong phần chi tiết bảo hiểm"
            />
          </Text>
          <Text mt="4">
            <Text fontWeight="600" fontSize={12} color="ebony" text="Bước 2:" />
            <Text fontWeight="400" fontSize={12} color="grayChateau" text=" Nhập đầy đủ" />
            <Text fontWeight="600" fontSize={12} color="primary" text=" thông tin" />
            <Text fontWeight="400" fontSize={12} color="grayChateau" text=" và " />
            <Text fontWeight="600" fontSize={12} color="primary" text="cung cấp ảnh giấy tờ " />
            <Text fontWeight="400" fontSize={12} color="grayChateau" text=" liên quan" />
          </Text>
          <Text mt="4">
            <Text fontWeight="600" fontSize={12} color="ebony" text="Bước 3: " />
            <Text fontWeight="400" fontSize={12} color="grayChateau" text="Nhấp vào nút " />
            <Text fontWeight="600" fontSize={12} color="primary" text=" Gửi yêu cầu " />
            <Text
              fontWeight="400"
              fontSize={12}
              color="grayChateau"
              text="và hoàn tất quá trình gửi yêu cầu bồi thường bảo hiểm"
            />
          </Text>
          <Box mt="6" bg="#F3F6FD" borderRadius="8" p="10.0">
            <Text
              fontWeight="300"
              fontSize="12"
              color="#0F172A"
              text="Nhân viên FINA sẽ nhận yêu cầu bồi thường bảo hiểm từ bạn và sẽ gọi điện tư vấn trong vòng 24 giờ làm việc"
            />
          </Box>
        </Box>
      </Popover.Content>
    </Popover>
  )
})

export default ManageInsuranceHelp
