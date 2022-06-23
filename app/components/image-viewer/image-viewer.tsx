import React, { useState } from "react"
import { s } from "react-native-size-matters"
import { FastImage } from "../fast-image/fast-image"
import { Box, Button, Modal, Pressable, Row } from "native-base"
import { Text } from "../text/text"
import AppHeader from "../app-header/AppHeader"
import ZoomableImage from "./zoomable-image"
import { height, width } from "../../constants/variable"

interface ImageViewerProps {
  size: number
  imageUri?: string
  onDelete?: () => void
  onUpload?: () => void
  title?: string
}

const ImageViewer = ({ title, imageUri, onDelete, onUpload, size = 100 }: ImageViewerProps) => {
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
    <Pressable onPress={() => setShowImageDetail(true)} mr={s(8)} mb={s(8)}>
      <FastImage source={{ uri: imageUri }} width={size} height={size} fallback bg="gray" />
      <Modal isOpen={showImageDetail} onClose={setShowImageDetail} size="full">
        <Box position="absolute" top="0" left="0" right="0" bottom="0" bg="white">
          {/* <FastImage
            source={{ uri: imageUri }}
            position="absolute"
            width="full"
            height="full"
            bg="gray"
          /> */}
          <ZoomableImage
            uri={{ uri: imageUri }}
            width={width}
            height={250}
            cropWidth={width}
            cropHeight={height}
          />
          <Box position="absolute" top="0" left="0" right="0">
            <AppHeader
              onLeftPress={() => setShowImageDetail(false)}
              isBlue
              style={{ backgroundColor: lightBlack05, borderBottomWidth: 0 }}
              headerText={title}
            />
          </Box>
          <Box flex="1" justifyContent="flex-end"></Box>
          <Row position="absolute" bottom="0" left="0" right="0" p="4" pb="6" bg={lightBlack05}>
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
