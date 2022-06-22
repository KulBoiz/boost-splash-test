import React, { useState } from "react"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { FastImage } from "../fast-image/fast-image"
import { Box, Button, Modal, Pressable, Row } from "native-base"
import { Text } from "../text/text"
import AppHeader from "../app-header/AppHeader"
import { width } from "../../constants/variable"

interface ImageViewerProps {
  imageUri?: string
  onDelete?: () => void
  onUpload?: () => void
  title?: string
}

const ImageViewer = ({ title, imageUri, onDelete, onUpload }: ImageViewerProps) => {
  const [showImageDetail, setShowImageDetail] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const lightBlack05 = "rgba(21, 25, 64, 0.5)"

  const deleteImage = () => {
    setShowConfirmDelete(false)
    setShowImageDetail(false)
    onDelete?.()
  }
  const uploadImage = () => {}

  return (
    <Pressable onPress={() => setShowImageDetail(true)} mr={s(8)}>
      <FastImage source={{ uri: imageUri }} style={styles.image} fallback bg="gray" />
      <Modal isOpen={showImageDetail} onClose={setShowImageDetail} size="full">
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="white">
          <FastImage
            source={{ uri: imageUri }}
            position="absolute"
            width="full"
            height="full"
            bg="gray"
          />
          <AppHeader
            onLeftPress={() => setShowImageDetail(false)}
            isBlue
            style={{ backgroundColor: lightBlack05 }}
            headerText={title}
          />
          <Box flex="1" justifyContent="flex-end"></Box>
          <Row p="4" pb="6" bg={lightBlack05}>
            <Button
              flex="1"
              mr="4"
              bg="white"
              shadow={1}
              _text={{ color: "primary" }}
              onPress={() => setShowConfirmDelete(true)}
            >
              Xóa ảnh
            </Button>
            <Button flex="1" shadow={1} onPress={uploadImage}>
              Upload ảnh mới
            </Button>
          </Row>
        </Box>
      </Modal>
      <Modal isOpen={showConfirmDelete} onClose={setShowConfirmDelete}>
        <Modal.Content>
          <Modal.Body>
            <Text size="medium16" color="lightBlack" text="Bạn có chắc muốn xoá ảnh?" />
            <Row mt="8">
              <Button
                flex="1"
                mr="4"
                bg="lightBlue"
                _text={{ color: "primary" }}
                onPress={() => setShowConfirmDelete(false)}
                variant="outline"
                borderColor="primary"
              >
                Không
              </Button>
              <Button flex="1" onPress={deleteImage}>
                Chắc chắn
              </Button>
            </Row>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Pressable>
  )
}

export default ImageViewer

const styles = ScaledSheet.create({
  wrapUpload: {
    width: (width - s(74)) / 2,
    height: "120@ms",
    borderWidth: 0.1,
    borderColor: color.palette.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: (width - s(74)) / 2,
    height: "120@ms",
    marginBottom: "8@s",
  },
})
