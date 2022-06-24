import React, { useState } from "react"
import ImagePicker from "./image-picker"
import { Box, Pressable, Progress, Skeleton, Spinner } from "native-base"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { s, vs } from "react-native-size-matters"
import { Text } from "../text/text"
import { useInterval } from "../../hooks/useInterval"

interface Props {
  onUploadFile?: (file) => void
  documentId?: string
  size: number
}

const UploadImage = observer(({ onUploadFile, documentId, size = 100 }: Props) => {
  const { loanStore } = useStores()

  const [showUploadPicker, setShowUploadPicker] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(1)

  useInterval(() => {
    if (isUploading) {
      if (progress >= 100) {
        setProgress(2)
      } else {
        setProgress(progress + 2)
      }
    }
  }, 50)

  const onSelectImage = async (res) => {
    const image: any = res.assets[0]

    if (image) {
      const imgInfo: any = {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      }
      setIsUploading(true)
      const objectId = loanStore?.loanDetail?.id
      const formData = new FormData()
      formData.append("file", imgInfo)

      formData.append("objectId", objectId)
      formData.append("objectType", "deal_loan")
      formData.append("objectSubType", "")
      const response = await loanStore.uploadDocumentTemplateFile(
        loanStore?.loanDetail?.documentTemplateId,
        formData,
      )
      setIsUploading(false)
      __DEV__ && console.log(response)
      if (response.kind === "ok") {
        const file = response.data[0]
        await loanStore.updateLoanDetailFile(file.templateDocumentFileId, documentId, objectId)
        onUploadFile?.(file)
      }
    }
  }

  const renderButtonUpload = () => {
    if (isUploading) {
      return (
        <Box p="1" borderRadius="4" mx={s(16)} bg="#EBE9FE">
          <Box
            borderWidth="1"
            height={52}
            borderColor="#7A5AF8"
            borderRadius="4"
            borderStyle="dotted"
            p="2"
            flexDirection="row"
            alignItems="center"
            bg="white"
          >
            <Box
              borderWidth={1}
              borderColor="primary"
              h="36px"
              flexDirection="row"
              alignItems="center"
              borderRadius={4}
              px="4"
              bg="primary"
              w={135}
            >
              <Box w={135} h="36px" ml="-1px" position="absolute">
                <Progress
                  _filledTrack={{
                    bg: "primary",
                    borderRadius: 4,
                  }}
                  bg="#EBE9FE"
                  height="36px"
                  borderRadius="4"
                  value={progress}
                />
              </Box>
              <Box width="15px" height="15px" bg="white" borderRadius="3" opacity={0.2} />
              <Text ml="3" color="white" fontSize={12} fontWeight="500" text="Đang tải ảnh" />
            </Box>

            <Text
              ml="3"
              flex="1"
              color="#667085"
              fontSize={12}
              fontWeight="400"
              text="Vui lòng chờ..."
            />
          </Box>
        </Box>
      )
    }
    return (
      <Pressable
        disabled={isUploading}
        onPress={() => setShowUploadPicker(true)}
        borderWidth="1"
        height={52}
        mx={s(16)}
        borderColor="#D0D5DD"
        borderRadius="4"
        borderStyle="dotted"
        p="2"
        flexDirection="row"
        alignItems="center"
      >
        <Box
          borderWidth={1}
          borderColor="#D0D5DD"
          shadow={1}
          h="36px"
          flexDirection="row"
          alignItems="center"
          borderRadius={4}
          px="4"
          bg="white"
          w={135}
        >
          <Box width="15px" height="15px" bg="#667085" borderRadius="3" opacity={0.2} />
          <Text ml="3" color="#667085" fontSize={12} fontWeight="500" text="Cập nhật ảnh" />
        </Box>

        <Text
          ml="3"
          flex="1"
          color="#667085"
          fontSize={12}
          fontWeight="400"
          text="Giúp duyệt nhanh hơn"
        />
      </Pressable>
    )
  }

  return (
    <Box>
      {renderButtonUpload()}
      <ImagePicker
        visible={showUploadPicker}
        onCancel={() => {
          setShowUploadPicker(false)
        }}
        onSelectImage={onSelectImage}
        // onSelectImage={(res: any) =>
        //   !res.didCancel && setSelectedImages((images) => [...images, { ...res, id: randomId() }])
        // }
      />
    </Box>
  )
})

export default UploadImage
