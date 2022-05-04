import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    // Montserrat: require("./Montserrat-Regular.ttf"),
    "Inter-Bold": require('./Inter-Bold.otf'),
    "Inter-Light": require('./Inter-Light.otf'),
    "Inter-Regular": require('./Inter-Regular.otf'),
    "Inter-SemiBold": require('./Inter-SemiBold.otf'),
    "Inter-Thin": require('./Inter-Thin.otf'),
    "Inter-Medium": require('./Inter-Medium.otf'),
    "Mulish-Bold": require('./Mulish-Bold.otf'),
  })
}
