import React, { useState } from "react"
import { s } from "react-native-size-matters"
import { Box, Pressable, Row, IPressableProps, Modal, Button } from "native-base"
import { DeleteDocumentSvg, DocumentReloadSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import { formatSize } from "../../../utils/file"

type Props = IPressableProps & {
  file: any
  onDelete?: () => void
  onReUpload?: () => void
}

const DocumentItem = React.memo(({ file = {}, onDelete, onReUpload, ...rest }: Props) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const deleteImage = () => {
    setShowConfirmDelete(false)
    onDelete?.()
  }
  return (
    <Pressable flexDirection="row" mt={s(8)} {...rest}>
      <Box flex={1} mr="3">
        <Text
          fontSize={14}
          fontWeight={600}
          color="#344054"
          lineHeight={20}
          numberOfLines={1}
          text={file?.name}
        />
        <Text
          fontSize={12}
          fontWeight={400}
          color="#667085"
          lineHeight={18}
          text={`Size - ${formatSize(file.size)}`}
          mt="1"
        />
      </Box>
      <Row>
        {onReUpload ? (
          <Pressable onPress={onReUpload} mr="2">
            <DocumentReloadSvg />
          </Pressable>
        ) : null}
        <Pressable onPress={() => setShowConfirmDelete(true)} pt="1px">
          <DeleteDocumentSvg />
        </Pressable>
      </Row>
      <Modal isOpen={showConfirmDelete} onClose={setShowConfirmDelete}>
        <Modal.Content>
          <Modal.Body>
            <Text size="medium16" color="lightBlack" text="Bạn có chắc muốn xoá?" />
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
})

export default DocumentItem
