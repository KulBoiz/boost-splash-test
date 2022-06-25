import millify from "millify"
import { Appearance, Platform, StatusBar } from "react-native"
import FileViewer from "react-native-file-viewer"
import { filter, flatten } from "./lodash-utils"

export function replaceAll(value: string, search: string, replacement: string) {
  const target = value
  return target?.replace?.(new RegExp(search, "g"), replacement)
}

export const formatSize = (number: number) => {
  return millify(number || 0, { units: ["B", "KB", "MB", "GB"], space: true })
}

export const openFile = (filePath) => {
  FileViewer.open(filePath, {
    showAppsSuggestions: true,
    showOpenWithDialog: true,
    onDismiss: () => {
      StatusBar.setBarStyle("light-content")
    },
  })
    .then(() => {
      const colorScheme = Appearance.getColorScheme()
      if (colorScheme === "light" && Platform.OS === "ios") {
        StatusBar.setBarStyle("dark-content")
      }
      __DEV__ && console.log("success")
    })
    .catch((error) => {
      __DEV__ && console.log(error)
    })
}
export const getDocumentFiles = (templates, files) => {
  return flatten(templates?.map((el) => el?.documentTemplateDetails)).map((el) => {
    if (!files) {
      return el
    } else {
      if (files[el.documentId]) {
        return {
          ...el,
          files: filter(files[el?.documentId], (d) => d?.file).map((d) => ({
            ...d?.file,
            templateDocumentFileId: d?.id,
          })),
        }
      }
      return el
    }
  })
}
