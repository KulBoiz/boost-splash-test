import React from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import { Asset, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScaledSheet } from 'react-native-size-matters';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import { FONT_MEDIUM_14 } from "../../styles/common-style"
interface ImagePickerProps {
  visible: boolean;
  onCancel: () => void;
  onSelectImage?: (res: ImagePickerResponse | Asset[]) => void;
}
const FileSize = 10 * 1024 * 1024;
const message = 'Maximum image size should not exceed 10MB';
const ImagePickerModal: React.FC<ImagePickerProps> = React.memo(({ visible = false, onCancel, onSelectImage }) => {
  const _checkPermission = async () => {
    try {
      const checkCamera = await check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA);
      if (checkCamera !== RESULTS.GRANTED) {
        await request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA);
      }
      await Promise.resolve();
    } catch (error) {
      await Promise.reject(error);
    }
  };
  const _selectFile = () => {
    launchImageLibrary(
      {
        // includeBase64: true,
        quality: 0.7,
        mediaType: 'photo',
      },
      async (res) => {
        if (res && !res.didCancel && res.assets) {
          const size = res.assets[0]?.fileSize ?? 0;
          const type = res.assets[0].type ?? '';

          if (size > FileSize) {
              // error
          return;
          }

          if (!type.includes('/jpg') && !type.includes('/jpeg') && !type.includes('/png')) {
            // error
            return;
          }
          // @ts-ignore
          onSelectImage(res);
          onCancel();
        }
      },
    );
  };

  const _selectCamera = async () => {
    await _checkPermission();
    launchCamera(
      {
        // includeBase64: true,
        quality: 0.6,
        mediaType: 'photo',
      },
      async (res) => {
        if (res && !res.didCancel && res.assets) {
          const size = res.assets[0]?.fileSize ?? 0;
          const type = res.assets[0].type ?? '';
          if (size > FileSize) {
            // error
            return;
          }

          if (!type.includes('/jpg') && !type.includes('/jpeg') && !type.includes('/png')) {
            // error
            return;
          }
          // @ts-ignore
          onSelectImage(res);
          onCancel();
          // }
        }
      },
    );
  };

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.container}>
        <Pressable onPress={_selectCamera} style={styles.btn}>
          <AppText color={color.palette.blue} style={FONT_MEDIUM_14}>Chụp ảnh</AppText>
        </Pressable>
        <Pressable onPress={_selectFile} style={[styles.btn, { marginBottom: 8 }]}>
          <AppText color={color.palette.blue} style={FONT_MEDIUM_14}>Thư viện ảnh</AppText>
        </Pressable>
        <Pressable onPress={() => onCancel()} style={styles.btn}>
          <AppText style={FONT_MEDIUM_14}>Huỷ</AppText>
        </Pressable>
      </View>
    </Modal>
  );
});

export default ImagePickerModal;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: '16@ms',
    paddingVertical: '24@s',
    height: '100%',
    width: '100%',
  },
  btn: {
    backgroundColor: color.text,
    borderRadius: '8@s',
    paddingVertical: '15@s',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
});
