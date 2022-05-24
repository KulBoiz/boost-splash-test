import React from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { PERMISSIONS, check, RESULTS, request } from 'react-native-permissions';
import { AppText } from "../app-text/AppText"
import { color } from "../../theme"
import ImagePicker from 'react-native-image-crop-picker';

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
    ImagePicker.openPicker({
      cropping: true
    }).then(image => {
      console.log(image);
        // if (image) {
        //   const size = res.assets[0]?.fileSize ?? 0;
        //   const type = res.assets[0].type ?? '';
        //
        //   if (size > FileSize) {
        //     Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
        //     return;
        //   }
        //
        //   if (!type.includes('/jpg') && !type.includes('/jpeg') && !type.includes('/png')) {
        //     Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
        //     return;
        //   }
        //   // @ts-ignore
        //   onSelectImage(res);
        //   onCancel();
        // }
    });
  };

  const _selectCamera = async () => {
    await _checkPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
        // if (res && !res.didCancel && res.assets) {
        //   const size = res.assets[0]?.fileSize ?? 0;
        //   const type = res.assets[0].type ?? '';
        //   if (size > FileSize) {
        //     Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
        //     return;
        //   }
        //
        //   if (!type.includes('/jpg') && !type.includes('/jpeg') && !type.includes('/png')) {
        //     Toast.showWithGravity(message, Toast.LONG, Toast.BOTTOM);
        //     return;
        //   }
        //   // @ts-ignore
        //   onSelectImage(res);
        //   onCancel();
        //   }
  };

  return (
    <Modal animationType="fade" visible={visible} transparent={true}>
      <View style={styles.container}>
        <Pressable onPress={_selectCamera} style={styles.btn}>
          <AppText>Take a picture</AppText>
        </Pressable>
        <Pressable onPress={_selectFile} style={[styles.btn, { marginBottom: 30 }]}>
          <AppText>Choose from library</AppText>
        </Pressable>
        <Pressable onPress={() => onCancel()} style={styles.btn}>
          <AppText>CANCEL</AppText>
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
    paddingHorizontal: 50,
    paddingVertical: 24,
    height: '100%',
    width: '100%',
  },
  btn: {
    backgroundColor: color.background,
    borderRadius: '4@s',
    paddingVertical: '20@s',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
});
