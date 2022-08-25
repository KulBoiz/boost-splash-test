/* eslint-disable react-native/split-platform-components */
import React, { useEffect } from "react"
import { Platform, ActionSheetIOS } from "react-native"
import {
  Asset,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker"
import { s, ms } from "react-native-size-matters"
import { PERMISSIONS, check, RESULTS, request } from "react-native-permissions"
import { Box, Modal, Pressable } from "native-base"
import { Text } from "../text/text"
import * as DocumentPicker from 'expo-document-picker';

interface ImagePickerProps {
  visible: boolean
  onCancel: () => void
  onSelectImage?: (res: ImagePickerResponse | Asset[]) => void
  hideUploadFile?: boolean
}
const FileSize = 10 * 1024 * 1024
const message = "Maximum image size should not exceed 10MB"
const ImagePickerModal: React.FC<ImagePickerProps> = React.memo(
  ({ visible = false, onCancel, onSelectImage, hideUploadFile = false }) => {
    const _checkPermission = async () => {
      try {
        const checkCamera = await check(
          Platform.OS === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
        )
        if (checkCamera !== RESULTS.GRANTED) {
          await request(
            Platform.OS === "android" ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA,
          )
        }
        await Promise.resolve()
      } catch (error) {
        await Promise.reject(error)
      }
    }

    const _pickDocument = () => {
      onCancel?.()
      DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
        if (response.type === 'success') {
          const { name, size, uri } = response;
          const nameParts = name.split('.');
          const fileType = nameParts[nameParts.length - 1];
          const fileToUpload = {
            name: name ?? response?.name,
            fileName: name ?? response?.name,
            size: size,
            uri: uri,
            type: fileType
          };
          if (fileToUpload){
            onSelectImage(fileToUpload);
          }
        }
      });
    }
    const _selectFile = () => {
      onCancel?.()
      setTimeout(() => {
        launchImageLibrary(
          {
            // includeBase64: true,
            quality: 0.7,
            mediaType: "photo",
          },
          async (res) => {
            if (res && !res.didCancel && res.assets) {
              const size = res.assets[0]?.fileSize ?? 0
              const type = res.assets[0].type ?? ""

              if (size > FileSize) {
                // error
                return
              }

              if (!type.includes("/jpg") && !type.includes("/jpeg") && !type.includes("/png")) {
                // error
                return
              }
              // @ts-ignore
              onSelectImage(res.assets[0])
            }
          },
        )
      }, 500)
    }

    const _selectCamera = async () => {
      onCancel?.()
      setTimeout(async () => {
        await _checkPermission()
        const res = await launchCamera({
          // includeBase64: true,
          quality: 0.6,
          mediaType: "photo",
        })
        if (res && !res.didCancel && res.assets) {
          const size = res.assets[0]?.fileSize ?? 0
          const type = res.assets[0].type ?? ""
          if (size > FileSize) {
            // error
            return
          }

          if (!type.includes("/jpg") && !type.includes("/jpeg") && !type.includes("/png")) {
            // error
            return
          }
          // @ts-ignore
          onSelectImage(res.assets[0])
          // }
        }
      }, 500)
    }

    const showActionSheetIos = () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: hideUploadFile ? ["Chụp ảnh", "Upload ảnh", "Hủy"]
            : ["Upload file", "Chụp ảnh", "Upload ảnh", "Hủy"],
          cancelButtonIndex: hideUploadFile ? 2 : 3,
          userInterfaceStyle: "light",
        },
        (index) => {
          onCancel?.()
          if (hideUploadFile){
            switch (index) {
              case 0:
                _selectCamera()
                break
              case 1:
                _selectFile()
                break
              default:
                break
            }
          }
          else {
            switch (index) {
            case 0:
              _pickDocument()
              break
            case 1:
              _selectCamera()
              break
            case 2:
              _selectFile()
              break
            default:
              break
          }}
        },
      )
    }

    useEffect(() => {
      if (visible && Platform.OS === "ios") {
        showActionSheetIos()
      }
    }, [visible, showActionSheetIos])

    if (Platform.OS === "ios") {
      return null
    }
    return (
      <Modal isOpen={visible}>
        <Box width="full" height="full" bg="transparent" p={s(12)} safeAreaBottom>
          <Pressable flex="1" onPress={onCancel} />
          <Box bg="white" borderRadius="8">
            {!hideUploadFile && <Pressable
              onPress={_pickDocument}
              borderBottomWidth={0.5}
              borderBottomColor="BABABA"
              height="55px"
              alignItems="center"
              justifyContent="center"
            >
              <Text text="Upload file" color="blue" fontWeight="500" fontSize={ms(15)} />
            </Pressable>}
            <Pressable
              onPress={_selectCamera}
              borderBottomWidth={0.5}
              borderBottomColor="BABABA"
              height="55px"
              alignItems="center"
              justifyContent="center"
            >
              <Text text="Chụp ảnh" color="blue" fontWeight="500" fontSize={ms(15)} />
            </Pressable>
            <Pressable
              onPress={_selectFile}
              borderBottomWidth={0.5}
              borderBottomColor="BABABA"
              height="55px"
              alignItems="center"
              justifyContent="center"
            >
              <Text text="Upload ảnh" color="blue" fontWeight="500" fontSize={ms(15)} />
            </Pressable>
            <Pressable
              onPress={() => onCancel()}
              height="55px"
              alignItems="center"
              justifyContent="center"
            >
              <Text text="Huỷ" color="blue" fontWeight="600" fontSize={ms(15)} />
            </Pressable>
          </Box>
        </Box>
      </Modal>
    )
  },
)

export default ImagePickerModal
