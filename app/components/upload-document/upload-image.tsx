import React, { useState } from "react"
import ImagePicker from "./image-picker"
import { Box, Pressable, Progress, IBoxProps, Row } from "native-base"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { s } from "react-native-size-matters"
import { Text } from "../text/text"
import { useInterval } from "../../hooks/useInterval"
import DocumentItem from "../../screens/loan-profile/components/document-item"
import { filter, map, unionBy } from "../../utils/lodash-utils"

type Props = IBoxProps & {
  onUploadSuccess?: (file) => void
}

const UploadImage = observer(({ onUploadSuccess, ...rest }: Props) => {
  const { uploadStore } = useStores()

  const [showUploadPicker, setShowUploadPicker] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(1)
  const [filesUploadError, setFilesUploadError] = useState<any>([])

  useInterval(() => {
    if (isUploading) {
      if (progress >= 100) {
        setProgress(2)
      } else {
        setProgress(progress + 2)
      }
    }
  }, 50)

  const onDeleteFile = (file) => {
    setFilesUploadError(filter(filesUploadError, (f) => f.uri !== file?.uri))
  }

  const onUpload = async (fileUpload) => {
    if (fileUpload) {
      const imgInfo: any = {
        uri: fileUpload?.uri,
        type: fileUpload?.type,
        name: fileUpload?.fileName,
      }
      setIsUploading(true)
      const formData = new FormData()
      formData.append("file", imgInfo)
      const response = await uploadStore.uploadImage(
        formData,
      )
      setIsUploading(false)
      __DEV__ && console.log(response)
      if (response.kind === "ok") {
        const file = response?.data[0]
        onUploadSuccess?.(file)
      } else {
        setFilesUploadError(
          unionBy(
            filesUploadError,
            [
              {
                ...fileUpload,
                url: fileUpload?.uri,
                name: fileUpload?.fileName,
                size: fileUpload?.fileSize,
              },
            ],
            "uri",
          ),
        )
      }
    }
  }

  const renderButtonUpload = () => {
    if (isUploading) {
      return (
        <Box p="1" borderRadius="4" mx={s(16)} bg="#EBE9FE" mb={s(8)}>
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
              <Text ml="3" color="white" fontSize={12} fontWeight="500" text="??ang t???i ???nh" />
            </Box>

            <Text
              ml="3"
              flex="1"
              color="#667085"
              fontSize={12}
              fontWeight="400"
              text="Vui l??ng ch???..."
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
        mb={s(8)}
      >
        <Row
          borderWidth={1}
          borderColor="#D0D5DD"
          shadow={1}
          h="36px"
          alignItems="center"
          borderRadius={4}
          px="4"
          bg="white"
          w={135}
        >
          <Box width="15px" height="15px" bg="#667085" borderRadius="3" opacity={0.2} />
          <Text
            ml="3"
            color="#667085"
            fontSize={12}
            lineHeight="17"
            fontWeight="500"
            text="C???p nh???t ???nh"
          />
        </Row>

        <Text
          ml="3"
          flex="1"
          color="#667085"
          fontSize={12}
          lineHeight="17"
          fontWeight="400"
          text="Gi??p duy???t nhanh h??n"
        />
      </Pressable>
    )
  }

  return (
    <Box {...rest}>
      {renderButtonUpload()}
      {map(filesUploadError, (file, index) => (
        <DocumentItem
          key={index}
          file={file}
          mx={s(16)}
          uploadError
          onReUpload={() => onUpload(file)}
          onDelete={() => onDeleteFile(file)}
        />
      ))}
      <ImagePicker
        visible={showUploadPicker}
        onCancel={() => {
          setShowUploadPicker(false)
        }}
        onSelectImage={(res: any) => onUpload(res)}
      />
    </Box>
  )
})

export default UploadImage
