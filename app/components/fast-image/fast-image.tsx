import RNFastImage, { FastImageProps } from "react-native-fast-image"
import { Factory, IImageProps } from "native-base"
type CustomFastImageProps = FastImageProps | IImageProps

export const FastImage = Factory<CustomFastImageProps>(RNFastImage)
