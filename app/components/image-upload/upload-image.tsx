import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ViewStyle, ActivityIndicator } from "react-native"
import { images } from "../../assets/images"
import { ScaledSheet, ms, s } from "react-native-size-matters"
import type { ImagePickerResponse } from "react-native-image-picker"
import { useFileUpload } from "../../hooks/useFileUpload"
import { color } from "../../theme"
import ImagePicker from "./image-picker"
import { AppText } from "../app-text/AppText"
import { randomId, width } from "../../constants/variable"
import { Text } from "../text/text"
import { Box, Spinner, ZStack } from "native-base"
import { FastImage } from "../fast-image/fast-image"
import ImageViewer from "../image-viewer/image-viewer"

interface Props {
  containerStyle?: any | ViewStyle
}

const UploadImage = React.memo(({ containerStyle }: Props) => {
  const [selectedImages, setSelectedImages] = useState<any>([])

  const [showUploadPicker, setShowUploadPicker] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const [upload] = useFileUpload()

  const _handleDelete = (id: string) => {
    setSelectedImages((images) => images.filter((item) => item.id !== id))
  }

  const onSelectImage = async (res) => {
    const image: any = res.assets[0]

    if (image) {
      const imgInfo = {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      }

      setIsUploading(true)
      const response = await upload(imgInfo)
      setIsUploading(false)
      __DEV__ && console.log(response)
      if (response.status === 200) {
        setSelectedImages((images) => [...images, response.data[0]])
      }
    }
  }

  return (
    <Box style={[styles.container, containerStyle]}>
      <View style={styles.wrapImage}>
        {selectedImages.map((image, index) => (
          <ImageViewer key={index} imageUri={image?.url} onDelete={() => _handleDelete(image.id)} />
        ))}
        <TouchableOpacity
          disabled={isUploading}
          style={styles.wrapUpload}
          onPress={() => setShowUploadPicker(true)}
        >
          <FastImage source={images.defaultUpload} style={styles.wrapUpload} />
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
        </TouchableOpacity>
      </View>
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

const styles = ScaledSheet.create({
  container: {},
  wrapImage: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapUpload: {
    width: "145@ms",
    height: "120@ms",
    borderWidth: 0.1,
    borderColor: color.palette.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: (width - s(74)) / 2,
    height: "120@ms",
    marginBottom: "8@s",
  },
})
