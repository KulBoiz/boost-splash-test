import React, { useState } from "react"
import { s } from "react-native-size-matters"
import { Box, Pressable, Row, IPressableProps, Modal, Button } from "native-base"
import { DeleteDocumentSvg, DocumentReloadSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import { formatSize, openFile, replaceAll } from "../../../utils/file"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import * as FileSystem from "expo-file-system"
import { Platform } from "react-native"
import { find } from "../../../utils/lodash-utils"
import { animations } from "../../../assets/animations"
import AnimatedLottieView from "lottie-react-native"
import { isEmpty } from "validate.js"

type Props = IPressableProps & {
  file: any
  onDelete?: (file) => void
  onReUpload?: () => void
  uploadError?: boolean
  viewOnly?: boolean
  canEdit?: boolean
}

const DocumentItem = observer(
  ({ file = {}, onDelete, onReUpload, uploadError, viewOnly, canEdit = true, ...rest }: Props) => {
    const { appStore } = useStores()
    const [downloading, setDownloading] = React.useState<boolean>(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const deleteImage = () => {
      setShowConfirmDelete(false)
      onDelete?.(file)
    }

    const viewFile = async () => {
      if (file?.uri) {
        let uri = file.uri
        if (Platform.OS === "android") {
          uri = uri.replace("file://", "")
        }
        openFile(uri)
      } else {
        const localPath = FileSystem.cacheDirectory + "/" + replaceAll(file?.name, "/", "")
        const fileExists = find(appStore?.filesDownloaded, (f) => f === localPath)
        if (fileExists) {
          openFile(fileExists)
        } else {
          setDownloading(true)
          FileSystem.downloadAsync(file?.url, localPath)
            .then(({ uri }) => {
              appStore?.addFileDownloaded(localPath)
              setDownloading(false)
              openFile(uri)
            })
            .catch((error) => {
              __DEV__ && console.log(error)
              setDownloading(false)
            })
        }
      }
    }

    if (isEmpty(file)) {
      return null
    }

    return (
      <Pressable disabled={downloading} flexDirection="row" mt={s(8)} {...rest} onPress={viewFile}>
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
            text={`Size - ${formatSize(file?.size)}`}
            mt="1"
          />
          {!!uploadError && (
            <Text
              fontSize={12}
              fontWeight={400}
              color="#F04438"
              lineHeight={18}
              text={`Tải lên không thành công`}
              mt="3px"
            />
          )}
        </Box>
        {downloading ? (
          <Box size={25}>
            <AnimatedLottieView
              source={animations.downloading}
              style={{ width: 25, height: 25 }}
              autoPlay
              loop
            />
          </Box>
        ) : viewOnly ? null : (
          <Row>
            {onReUpload ? (
              <Pressable onPress={onReUpload} mr="2">
                <DocumentReloadSvg />
              </Pressable>
            ) : null}
            {canEdit &&
              <Pressable onPress={() => setShowConfirmDelete(true)} pt="1px">
              <DeleteDocumentSvg />
            </Pressable>
            }
          </Row>
        )}

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
  },
)

export default DocumentItem
