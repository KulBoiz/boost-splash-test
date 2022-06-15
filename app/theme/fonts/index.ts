import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    // Montserrat: require("./Montserrat-Regular.ttf"),
    "SF-Pro-Display-Bold": require('./SF-Pro-Display-Bold.otf'),
    "SF-Pro-Display-Light": require('./SF-Pro-Display-Light.otf'),
    "SF-Pro-Display-Medium": require('./SF-Pro-Display-Medium.otf'),
    "SF-Pro-Display-Regular": require('./SF-Pro-Display-Regular.otf'),
    "SF-Pro-Display-Thin": require('./SF-Pro-Display-Thin.otf'),
    "SF-Pro-Display-SemiBold": require('./SF-Pro-Display-Semibold.otf'),
    "Mulish-Bold": require('./Mulish-Bold.otf'),
  })
}
