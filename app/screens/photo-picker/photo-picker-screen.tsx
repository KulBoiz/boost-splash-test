import React, { FC, useCallback, useState } from "react"
import {
  ActionSheetIOS,
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { ScreenNames } from "../../navigators/screen-names"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import AppHeader from "../../components/app-header/AppHeader"
import { useStores } from "../../models"
import { translate } from "../../i18n"
import { openLimitedPhotoLibraryPicker, openSettings } from "react-native-permissions"
import { AppText } from "../../components/app-text/AppText"
import FastImage from "react-native-fast-image"
import { width } from "../../constants/variable"
import { SelectedPhotoSvg } from "../../assets/svgs"
import AppButton from "../../components/app-button/AppButton"
import { fontFamily } from "../../constants/font-family"

export const PhotoPickerScreen: FC<
  StackScreenProps<NavigatorParamList, ScreenNames.PHOTO_PICKER>
> = observer(({ navigation, route }) => {
  const { mediaStore } = useStores()
  const onConfirm = route.params.onConfirm
  const [loadingPhotos, setLoadingPhotos] = useState<boolean>(true)
  const [photoSelected, setPhotoSelected] = useState<string>("")

  const getMedias = useCallback(async (options) => {
    setLoadingPhotos(true)
    await mediaStore.getMedias({ options })
    setLoadingPhotos(false)
  }, [])

  React.useEffect(() => {
    getMedias({})
  }, [])

  const loadMore = useCallback(() => {
    if (mediaStore.photoPagingParams.hasNextPage) {
      getMedias({ after: mediaStore.photoPagingParams.endCursor })
    }
  }, [mediaStore.photoPagingParams, getMedias])

  const [seconds, setSeconds] = React.useState(mediaStore.permission === "limited" ? 60 : 0)
  const [loadPhotosLimited, setLoadPhotosLimited] = React.useState(false)
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0 && loadPhotosLimited) {
        setSeconds((seconds) => seconds - 1)
        getMedias({})
      } else {
        setSeconds(60)
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds, loadPhotosLimited])

  const changeLimitedPhoto = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: translate("common.selectMorePhotosOrGoToSettingsToAllowAccessToAllPhotos"),
          options: [
            translate("common.cancel"),
            translate("common.selectMorePhotos"),
            translate("common.allowAccessToAllPhotos"),
          ],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            // cancel action
          } else if (buttonIndex === 1) {
            openLimitedPhotoLibraryPicker()
            setLoadPhotosLimited(true)
            setSeconds(60)
          } else if (buttonIndex === 2) {
            openSettings()
          }
        },
      )
    }
  }

  const onSelectPhoto = useCallback(
    (photo) => () => {
      setPhotoSelected(photo)
    },
    [],
  )

  const onUpload = useCallback(() => {
    onConfirm && onConfirm(photoSelected)
    navigation.goBack()
  }, [navigation, photoSelected])

  const renderMedia = useCallback(
    ({ item: media }) => {
      const selected = photoSelected === media.uri
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onSelectPhoto(media.uri)}
          style={styles.photoWrap}
        >
          <FastImage
            style={styles.photo}
            source={{
              uri: media.uri,
            }}
            fallback
          />
          {selected ? (
            <View style={styles.selectedWrap}>
              <SelectedPhotoSvg style={styles.selectedIcons} />
            </View>
          ) : (
            <View style={styles.unselectedIcons} />
          )}
        </TouchableOpacity>
      )
    },
    [onSelectPhoto, photoSelected],
  )

  return (
    <View testID="PhotoPickerScreen" style={styles.container}>
      <AppHeader isBlue headerText={"Thư viện ảnh"} />
      {mediaStore.permission === "limited" ? (
        <View style={styles.permissionWrap}>
          <AppText
            style={styles.limitedMessage}
            color={color.palette.black}
            tx="common.youVeAllowedAccessToSelectPhotosYouCanAddMoreOrAllowAccessToAllPhotos"
          />
          <AppText
            fontFamily={fontFamily.semiBold}
            onPress={changeLimitedPhoto}
            color={color.primary}
            tx="common.manage"
          />
        </View>
      ) : null}
      <FlatList
        data={mediaStore.medias}
        keyExtractor={(item: any, index: number) => String(index)}
        numColumns={3}
        ListFooterComponent={
          loadingPhotos && !seconds ? (
            <ActivityIndicator color={color.primary} style={styles.activityIndicator} />
          ) : null
        }
        renderItem={renderMedia}
        onEndReachedThreshold={0.4}
        onEndReached={loadMore}
      />
      <View style={styles.footer}>
        <AppButton
          title={"Tải lên"}
          onPress={onUpload}
          disabled={!photoSelected}
          colorBtn={photoSelected ? color.primary : color.palette.BABABA}
        />
      </View>
    </View>
  )
})

const photoWidth = (width - 4) / 3
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
  },
  permissionWrap: {
    flexDirection: "row",
    alignItems: "center",
    padding: "12@s",
    backgroundColor: color.palette.lightGrey,
  },
  buttonManage: {
    color: color.primary,
  },
  limitedMessage: {
    flex: 1,
    marginRight: "12@s",
  },
  activityIndicator: {
    margin: "16@s",
  },
  photoWrap: {
    height: photoWidth,
    marginBottom: 1,
    marginLeft: 1,
    width: photoWidth,
  },
  photo: {
    height: photoWidth,
    width: photoWidth,
  },
  selectedWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: color.primary,
    backgroundColor: "rgba(161, 180, 217, 0.6)",
  },
  selectedIcons: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  unselectedIcons: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "white",
    position: "absolute",
    top: 8,
    right: 8,
  },
  footer: {
    height: 94,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 5,
    padding: "16@s",
  },
})
