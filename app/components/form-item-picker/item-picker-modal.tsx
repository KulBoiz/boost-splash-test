import React from "react"
import { FlatList, Pressable, View } from "react-native"
import FastImage from "react-native-fast-image"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { images } from "../../assets/images"
import {
  CONTAINER_PADDING,
  FONT_MEDIUM_14,
  FONT_SEMI_BOLD_14,
  MARGIN_BOTTOM_16, MARGIN_BOTTOM_24, ROW, TEXT_CENTER
} from "../../styles/common-style"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import SearchBar from "../search-bar"

interface DataProps {
  label: string
  value: string
}
interface Props {
  title: string
  label: string
  visible: boolean
  closeModal(): void
  data: Array<DataProps>
  onPress(item: any): void
  onChangeSearchText: any
}

const ItemPickerModal = React.memo((props: Props) => {
  const { title, label, visible, closeModal, data = [{ label: '', value: '' }], onPress, onChangeSearchText } = props

  const renderItem = ({ item, index }) => {
    const check = title === item.label
    return (
      <Pressable style={[styles.item,
      { borderWidth: check ? 1 : 0, borderColor: check ? color.palette.blue : color.palette.BABABA, borderBottomWidth:  data?.length-1 !== index ? 1 : 0, },
      check && { backgroundColor: 'rgba(6, 77, 214, 0.05)' }
      ]}
        onPress={() => onPress(item)}
      >
        <AppText value={item.label} />
        {check && <FastImage source={images.check} style={styles.iconCheck} tintColor={color.palette.blue} />}
      </Pressable>
    )
  }

  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={closeModal}
    >
      <View style={styles.body}>
        <Pressable onPress={closeModal} style={[ROW, styles.title]}>
          <AppText value={'Quay lại'} style={[MARGIN_BOTTOM_24, FONT_MEDIUM_14]} />
        </Pressable>

        <AppText value={label} style={[FONT_SEMI_BOLD_14, MARGIN_BOTTOM_24, TEXT_CENTER]} />
        {onChangeSearchText && <View style={[CONTAINER_PADDING, MARGIN_BOTTOM_16]}><SearchBar onChangeSearchText={onChangeSearchText} /></View>}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[CONTAINER_PADDING]}
        />
      </View>
    </Modal>
  )
});

export default ItemPickerModal;

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  title: {
    position: 'absolute',
    top: '20@s',
    left: '20@s',
    zIndex: 1,
  },
  iconCheck: {
    width: '10@s',
    height: '7@s'
  },
  body: {
    paddingTop: '20@s',
    flex: 0.6,
    backgroundColor: color.background,
    borderRadius: '8@s',
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: '10@ms',
    paddingVertical: '12@vs',
    borderRadius: '8@s'
  }
});
