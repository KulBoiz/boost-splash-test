import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { images } from '../../assets/images';
import { ScaledSheet, s } from 'react-native-size-matters';
import { Color } from '../../helpers/colors';
import { AppText } from '../AppText/AppText';
import ImagePicker from './ImagePicker';
import type { ImagePickerResponse } from 'react-native-image-picker';
import { useUploadBase64ImageMutation } from '../../graphql/mutations/uploadBase64Image.generated';
import { randomId } from 'src/helpers/utils';
import { useFileUpload } from '../../hooks/useFileUpload';
import { useTranslation } from 'react-i18next';

interface Props {
  containerStyle?: any | ViewStyle;
  maxImage: number;
  setMediaIds: (e: string[]) => void;
  mediaIds: string[];
}

interface ImagePickerObject extends ImagePickerResponse {
  id: string;
}

const UploadImage = React.memo(({ containerStyle, maxImage, setMediaIds, mediaIds }: Props) => {
  const [selectedImages, setSelectedImages] = useState<ImagePickerObject[]>([]);

  const [isUpload, setIsUpload] = useState(false);

  const _checkUpload = () => {
    return selectedImages.length === maxImage;
  };

  const _handleDelete = (id: string, imageId?: string) => {
    setSelectedImages((images) => images.filter((item) => item.id !== id));
    setMediaIds(mediaIds.filter((item) => item !== imageId));
  };

  const { t } = useTranslation();

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
        value={t('upload_image')}
        fontFamily={'Montserrat-SemiBold'}
        fontSize={s(11)}
      />
      <View style={styles.wrapImage}>
        <TouchableOpacity disabled={_checkUpload()} style={styles.wrapUpload} onPress={() => setIsUpload(true)}>
          <FastImage source={images.camera} style={styles.icon} />
          <AppText value={`(${selectedImages.length}/${maxImage})`} color={Color.GRAY} />
        </TouchableOpacity>

        {selectedImages.map((image, index) => (
          <UploadImageViewer
            image={image}
            key={image.id}
            containerStyle={index === 2 || index === 5 || index === 8 ? null : { marginLeft: s(10) }}
            onUploaded={(id) => setMediaIds([...mediaIds, id])}
            onDelete={(imageId) => _handleDelete(image.id, imageId)}
          />
        ))}
      </View>
    </View>
  );
});

interface UploadImageViewerProps {
  containerStyle?: any;
  onUploaded: (id: string) => void;
  image: ImagePickerResponse;
  onDelete: (id?: string) => void;
}

const UploadImageViewer = ({ containerStyle, onUploaded, image, onDelete }: UploadImageViewerProps) => {
  const [uploadImage, { data, loading, error }] = useUploadBase64ImageMutation({
    onCompleted: (res) => {
      onUploaded(res.uploadBase64Image.id);
    },
    onError: (err) => {
      console.log(JSON.parse(JSON.stringify(err)));
    },
  });

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
      setUploading(true);
      upload(imgInfo)
        .then((res) => {
          onUploaded(res.data.id);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          setErrUploading(true);
          console.log(JSON.parse(JSON.stringify(err)));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <View style={containerStyle}>
      {uploading || loading ? (
        <View style={[styles.image, styles.wrapUpload]}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <FastImage source={{ uri: image?.assets?.[0]?.uri }} style={styles.image} />
          {errUploading ||
            (error && (
              <View style={[styles.image, styles.error]}>
                <AppText>Upload Error</AppText>
              </View>
            ))}
          <TouchableOpacity onPress={() => onDelete(data?.uploadBase64Image.id)} style={styles.position}>
            <FastImage source={images.icon_clear} style={[styles.icon]} tintColor={Color.PRIMARY} />
          </TouchableOpacity>
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
  },
  wrapUpload: {
    width: '96@s',
    height: '96@s',
    borderWidth: 1,
    borderRadius: '4@s',
    borderColor: Color.GRAY_2,
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
    backgroundColor: Color.WHITE,
  },
  position: {
    position: 'absolute',
    right: 0,
    top: '-10@vs',
  },
  image: {
    width: '96@s',
    height: '96@s',
    borderRadius: '4@s',
    marginBottom: '20@vs',
  },
});
