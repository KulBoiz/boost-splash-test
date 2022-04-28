import React, { FC } from "react"
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal";
import { s, ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { TxKeyPath } from "../../../i18n"
import { CancelSvg, TickSvg, TrashSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import { observer } from "mobx-react-lite"

interface Props{
  visible: boolean
  close?(): void
}

const NoticeModal= observer(({ visible,close }: Props) => {
  const RenderItem = ({svg,title,hideBorder}: {svg: JSX.Element, title: TxKeyPath, hideBorder?: boolean}) => {
    return (
      <TouchableOpacity style={[styles.itemContainer, {borderBottomWidth: hideBorder? 0: 1}]}>
        {svg}
        <AppText tx={title} style={{marginLeft: s(16)}}/>
      </TouchableOpacity>
    )
  }
  return (
    <Modal isVisible={visible} style={styles.modalContainer} onBackdropPress={close}>
      <View style={styles.container}>
        <RenderItem svg={<TickSvg />} title={'notice.tick'} />
        <RenderItem svg={<TrashSvg />} title={'notice.deleteNotice'} />
        <RenderItem svg={<CancelSvg />} title={'notice.cancel'} hideBorder/>
      </View>
    </Modal>
  )
});

export default NoticeModal;
NoticeModal.displayName = 'NoticeModal'

const styles = ScaledSheet.create({
  modalContainer: {
    margin: 0,justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: 'white',
    height: '230@s',
    borderTopRightRadius: '15@s',
    borderTopLeftRadius: '15@s',
    paddingTop: '30@s',
    paddingHorizontal: '20@s'
  },
  itemContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.line,
    paddingVertical: '13@s'
  }
});
