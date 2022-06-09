import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import { ScaledSheet, ms } from 'react-native-size-matters';
import type { ImagePickerResponse } from 'react-native-image-picker';
import { useFileUpload } from '../../hooks/useFileUpload';
import { color } from "../../theme"
import ImagePicker from "./image-picker"
import { AppText } from "../app-text/AppText"
import { randomId } from "../../constants/variable"

interface Props {
  containerStyle?: any | ViewStyle;
}

interface ImagePickerObject extends ImagePickerResponse {
  id: string;
}

const UploadImage = React.memo(({ containerStyle }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerObject[]>([]);

  const [isUpload, setIsUpload] = useState(false);

  const _handleDelete = (id: string) => {
    setSelectedImages((images) => images.filter((item) => item.id !== id));
  };


  return (
    <View style={[styles.container, containerStyle]}>
      <ImagePicker
        visible={isUpload}
        onCancel={() => {
          setIsUpload(false);
        }}
        onSelectImage={(res: any) =>
          !res.didCancel && setSelectedImages((images) => [...images, { ...res, id: randomId() }])
        }
      />
      <AppText
        style={{ textTransform: 'uppercase' }}
        value={'Tải lên'}
        fontSize={ms(11)}
      />
      <View style={styles.wrapImage}>
        <TouchableOpacity style={styles.wrapUpload} onPress={() => setIsUpload(true)}>
          <FastImage source={images.defaultUpload} style={styles.wrapUpload} />
        </TouchableOpacity>
        {selectedImages.map((image, index) => (
          <UploadImageViewer
            image={image}
            key={image.id}
            onDelete={(imageId) => _handleDelete(image.id)}
          />
        ))}
      </View>
    </View>
  );
});

interface UploadImageViewerProps {
  containerStyle?: any;
  image: ImagePickerResponse;
  onDelete: (id?: string) => void;
}

const UploadImageViewer = ({ containerStyle, image, onDelete }: UploadImageViewerProps) => {
  const [uploading, setUploading] = useState(false);
  const [errUploading, setErrUploading] = useState(false);

  const [upload] = useFileUpload();
  useEffect(() => {
    if (image) {
      const imgInfo = {
        uri: image?.assets?.[0]?.uri!,
        type: image?.assets?.[0]?.type!,
        name: image?.assets?.[0]?.fileName!,
      };
      // setUploading(true);
      // upload(imgInfo)
      //   .then((res) => {
      //     onUploaded(res.data.id);
      //     setUploading(false);
      //   })
      //   .catch((err) => {
      //     setUploading(false);
      //     setErrUploading(true);
      //     console.log(JSON.parse(JSON.stringify(err)));
      //   });
    }
  }, [image]);

  return (
    <View style={containerStyle}>
      {uploading ? (
        <View style={[styles.image, styles.wrapUpload]}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FastImage source={{ uri: image?.assets?.[0]?.uri }} style={styles.image} />
          {errUploading && (
              <View style={[styles.image, styles.error]}>
                <AppText>Upload Error</AppText>
              </View>
            )}
          {/*<TouchableOpacity onPress={() => onDelete('')} style={styles.position}>*/}
          {/*  <FastImage source={images.icon_x} style={styles.icon} tintColor={color.lightBlack} />*/}
          {/*</TouchableOpacity>*/}
        </>
      )}
    </View>
  );
};

export default UploadImage;

const styles = ScaledSheet.create({
  flex1: {
    flex: 1,
  },
  container: {},
  wrapImage: {
    marginTop: '12@vs',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  wrapUpload: {
    width: '145@ms',
    height: '120@ms',
    borderWidth: 1,
    borderColor: color.palette.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '24@s',
    height: '24@s',
    marginBottom: '4@vs',
    borderRadius: '12@s',
    backgroundColor: color.text,
  },
  position: {
    position: 'absolute',
    right: 0,
    top: '-10@vs',
  },
  image: {
    width: '145@ms',
    height: '120@ms',
    marginBottom: '20@vs',
  },
});
