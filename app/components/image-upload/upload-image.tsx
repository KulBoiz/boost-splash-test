import React, { useState } from "react"
import { images } from "../../assets/images"
import ImagePicker from "./image-picker"
import { Box, Pressable, Spinner } from "native-base"
import { FastImage } from "../fast-image/fast-image"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"

interface Props {
  onUploadFile?: (file) => void
  documentId?: string
  size: number
}

const UploadImage = observer(({ onUploadFile, documentId, size = 100 }: Props) => {
  const { loanStore } = useStores()

  const [showUploadPicker, setShowUploadPicker] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const _handleDelete = (id: string) => {}

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

  return (
    <Box width={size} h={size}>
      <Pressable disabled={isUploading} onPress={() => setShowUploadPicker(true)}>
        <FastImage source={images.defaultUpload} width="full" height="full" />
        {!!isUploading && (
          <Box
            position="absolute"
            width="full"
            height="full"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner color="white" />
          </Box>
        )}
      </Pressable>
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
