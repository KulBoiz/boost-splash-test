import millify from "millify"
import { Appearance, Platform, StatusBar } from "react-native"
import FileViewer from "react-native-file-viewer"

export const formatSize = (number: number) => {
  return millify(number, { units: ["B", "KB", "MB", "GB"], space: true })
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
