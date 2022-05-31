import React, { useCallback } from "react"
import { FlatList, Pressable, TouchableOpacity, View, VirtualizedList } from "react-native"
import Modal from "react-native-modal"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../theme"
import { AppText } from "../app-text/AppText"
import { CONTAINER_PADDING, FONT_SEMI_BOLD_14, MARGIN_BOTTOM_16, TEXT_CENTER } from "../../styles/common-style"

interface DataProps {
  label: string
  value: string
}
interface Props{
  label: string
  visible: boolean
  closeModal(): void
  data: Array<DataProps>
  onPress(item: any): void
}

const ItemPickerModal = React.memo((props: Props) => {
  const {label, visible, closeModal, data = [{label: '', value: ''}], onPress} = props

  const renderItem = useCallback(({ item }) => {
    return(
      <Pressable style={styles.item} onPress={()=> onPress(item)}>
        <AppText value={item.label}/>
      </Pressable>
    )},[]);
  return (
    <Modal
      isVisible={visible}
      style={styles.container}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={closeModal}
    >
      <View style={styles.body}>
        <AppText value={label} style={[FONT_SEMI_BOLD_14, MARGIN_BOTTOM_16, TEXT_CENTER]}/>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={CONTAINER_PADDING}
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

  body: {
    paddingTop: '20@s',
    flex: 0.5,
    backgroundColor:color.background,
    borderRadius: '8@s',
  },
  item: {
    paddingVertical: '15@vs',
    borderBottomWidth: 1,borderColor: color.palette.BABABA
  }
});
