import React, { FC } from "react"
import { View, TouchableOpacity } from "react-native"
import Modal from "react-native-modal";
import { s, ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { TxKeyPath } from "../../../i18n"
import { CancelSvg, TickSvg, TrashSvg } from "../../../assets/svgs"
import { color } from "../../../theme"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models";
import { STATUS } from "./NoticeItem";

interface Props {
  visible: boolean
  close?(): void
  item: any
}

const RenderItem = React.memo(({ svg, title, hideBorder, onPress }: { svg: JSX.Element, title: TxKeyPath, hideBorder?: boolean, onPress?: () => void }) => {
  return (
    <TouchableOpacity style={[styles.itemContainer, { borderBottomWidth: hideBorder ? 0 : 1 }]}
      onPress={onPress}
    >
      {svg}
      <AppText tx={title} style={{ marginLeft: s(16) }} />
    </TouchableOpacity>
  )
})

const NoticeModal = observer(({ visible, close, item }: Props) => {
  const { notificationModel } = useStores()

  const readNoti = () => {
    notificationModel.readNotifications(item)

    if (close) {
      close();
    }
  }

  return (
    <Modal isVisible={visible} style={styles.modalContainer} onBackdropPress={close}>
      <View style={styles.container}>
        {item?.status === STATUS.UNREAD && <RenderItem svg={<TickSvg />} title={'notice.tick'} onPress={readNoti} />}
        <RenderItem svg={<TrashSvg />} title={'notice.deleteNotice'} hideBorder />
        {/* <RenderItem svg={<CancelSvg />} title={'notice.cancel'} hideBorder /> */}
      </View>
    </Modal>
  )
});

export default NoticeModal;

const styles = ScaledSheet.create({
  modalContainer: {
    margin: 0, justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: 'white',
    height: '170@s',
    borderTopRightRadius: '15@s',
    borderTopLeftRadius: '15@s',
    paddingTop: '30@s',
    paddingHorizontal: '20@s'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.line,
    paddingVertical: '13@s'
  }
});
