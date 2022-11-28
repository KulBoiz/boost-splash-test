import React, { Ref } from "react"
import { Pressable, View } from "react-native"
import { Modalize } from "react-native-modalize"
import { ms, ScaledSheet } from "react-native-size-matters"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"
import { AppText } from "../../../../components/app-text/AppText"
import { color } from "../../../../theme"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"
import PropertyDetailItem from "./property-detail-item"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { mappingLabelTypeOfFund } from "../../../invest/market/constants"
import PropertyHistoryItem from "./property-history-item"
import { checkVolatility } from "../../../../constants/variable"


interface Props {
  modalizeRef: Ref<any>
  item: any

  closeModal(): void
}

interface ButtonProps {
  title: string
  backgroundColor: string

  onPress?(): void
}

const Button = React.memo(({ title, onPress, backgroundColor }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.btn, { backgroundColor }]}>
      <AppText value={title} color={color.text} fontFamily={fontFamily.semiBold} />
    </Pressable>
  )
})


const PropertyModalize = React.memo((props: Props) => {
  const { modalizeRef, closeModal, item } = props

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modal}
      handlePosition={"inside"}
      adjustToContentHeight
      withReactModal
      scrollViewProps={{ showsVerticalScrollIndicator: false }}
    >
      <View style={styles.body}>
        <View style={[ROW, ALIGN_CENTER, SPACE_BETWEEN, styles.headerContainer]}>
          <View style={[ROW, ALIGN_CENTER]}>
            <FastImage source={images.vinacapital} style={styles.icon} />
            <View>
              <AppText value={item?.code} fontFamily={fontFamily.semiBold} fontSize={ms(16)} color={color.primary} />
              <AppText value={item?.name} fontSize={ms(9)} color={color.textColor.title} style={{width: '100%'}} numberOfLines={2}/>
            </View>
          </View>
          <AppText value={mappingLabelTypeOfFund(item?.info?.typeOfFund)} color={color.primary} style={{marginLeft: ms(16)}}/>
        </View>
        <PropertyDetailItem item={item} />
        <PropertyHistoryItem productId={item?.id}/>
      </View>
      <View style={styles.wrapBtn}>
        <Button title={"Mua"} backgroundColor={color.palette.blue} />
        <Button title={"Bán"} backgroundColor={color.green.green_02}
                onPress={() => navigate(ScreenNames.SALE_BONDS)} />
        <Button title={"Chuyển đổi"} backgroundColor={color.palette.orange} />
      </View>
    </Modalize>
  )
})

export default PropertyModalize

const styles = ScaledSheet.create({
  modal: {
    paddingVertical: "24@s",
  },
  body: {
    paddingHorizontal: "16@s",
  },
  headerContainer: {
    padding: '5@s',
    backgroundColor: color.palette.lightBlue,
    borderRadius: '4@s',
    paddingRight: '12@s',
    marginBottom: '12@s'
  },
  icon: {
    width: "24@s",
    height: "24@s",
    marginRight: "8@s",
  },
  btn: {
    flex: 1,
    paddingVertical: "11@s",
    alignItems: "center",
    borderRadius: "8@s",
    marginHorizontal: "4@s",
    marginVertical: "12@s",
  },
  wrapBtn: {
    flexDirection: "row",
    paddingBottom: "24@s",
    borderTopWidth: 1,
    borderTopColor: color.palette.D9D9D9,
    marginTop: '20@s',
    paddingHorizontal: "12@s",
  },

})
