import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { unionBy, filter, omitFn, orderBy } from "../../utils/lodash-utils"
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions"
import { Alert, Platform } from "react-native"
import { translate } from "../../i18n"
import { withRootStore } from "../extensions/with-root-store"
import * as MediaLibrary from "expo-media-library"
/**
 * Model description here for TypeScript hints.
 */
export const MediaStoreModel = types
  .model("MediaStore")
  .props({
    albums: types.optional(types.array(types.frozen()), []),
    photoPagingParams: types.optional(types.frozen(), {}),
    medias: types.optional(types.array(types.frozen()), []),
    permission: types.optional(types.string, "none"),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getMediaPermission: flow(function* getMediaPermission() {
      if (Platform.OS === "android") {
        const result = yield MediaLibrary.requestPermissionsAsync()
        return result.granted
      } else {
        const KEY: any = Platform.select({
          ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          android: PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
        })
        const result = yield request(KEY)
        self.permission = result
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          return true
        } else {
          const permission = yield check(KEY)
          self.permission = result
          __DEV__ && console.log(permission)
          if (permission === RESULTS.GRANTED || permission === RESULTS.LIMITED) {
            return true
          } else {
            Alert.alert(
              // @ts-ignore
              translate("common.pleaseAllowAccess"),
              translate("common.photoPermissionsMessage"),
              [
                { text: translate("common.donTAllow") },
                { text: translate("common.openSettings"), onPress: openSettings },
              ],
            )
            return false
          }
        }
      }
    }),
    getCameraPermission: flow(function* getCameraPermission() {
      const KEY: any = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      })
      const result = yield request(KEY)
      if (result === RESULTS.GRANTED) {
        return true
      } else {
        const permission = yield check(KEY)
        __DEV__ && console.log(permission)
        if (permission === RESULTS.GRANTED) {
          return true
        } else {
          Alert.alert(
            // @ts-ignore
            translate("common.pleaseAllowAccess"),
            translate("common.cameraPermissionsMessage"),
            [
              { text: translate("common.donTAllow") },
              { text: translate("common.openSettings"), onPress: openSettings },
            ],
          )
          return false
        }
      }
    }),
    setMedias: (medias) => {
      self.medias = medias
    },
  }))
  .actions((self) => ({
    getAlbums: flow(function* getAlbums() {
      const permissionAllow = yield self.getMediaPermission()
      if (permissionAllow) {
        const albums: any = []
        const albumData = yield MediaLibrary.getAlbumsAsync({ includeSmartAlbums: true })
        for (const album of filter(albumData, (a) => a.assetCount)) {
          const asset = yield MediaLibrary.getAssetsAsync({
            album: album.id,
            first: 1,
            mediaType: "photo",
          })
          if (
            asset?.totalCount &&
            !["Recently Deleted", "Recently Added", "Hidden"]?.includes(album.title)
          ) {
            albums.push({ ...album, thumbnail: asset.assets?.[0] })
          }
        }
        self.albums = orderBy(albums, "assetCount", "desc") as any
        return albums
      } else {
        self.albums = [] as any
        return undefined
      }
    }),
    getMedias: flow(function* getMedias({ options }: { options: any }) {
      const permissionAllow = yield self.getMediaPermission()
      if (permissionAllow) {
        const data = yield MediaLibrary.getAssetsAsync({
          first: 60,
          mediaType: "photo",
          ...options,
        })
        if (data?.assets?.length) {
          self.photoPagingParams = {
            hasNextPage: data.hasNextPage,
            endCursor: data.endCursor,
          }
          const mediasResult = data.assets
          if (options.after) {
            self.medias = unionBy(self.medias, mediasResult, "uri") as any
          } else {
            self.medias = mediasResult as any
          }
        } else {
          self.medias = [] as any
        }
      } else {
        return undefined
      }
    }),
  }))
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(omitFn([""]))

type MediaStoreType = Instance<typeof MediaStoreModel>
export type MediaStore = MediaStoreType
type MediaStoreSnapshotType = SnapshotOut<typeof MediaStoreModel>
export type MediaStoreSnapshot = MediaStoreSnapshotType
