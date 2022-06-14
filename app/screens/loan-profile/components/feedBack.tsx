import React, { useState } from "react"
import { FlatList, Pressable, View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { useStores } from "../../../models"
import { navigate } from "../../../navigators"
import { ScreenNames } from "../../../navigators/screen-names"
import { color } from "../../../theme"
import FeedBackItem from "./feedBackItem"

const FeedBack = React.memo((props) => {
  const { loanStore } = useStores()
  const data = loanStore?.feedback?.data
  const [itemActive, setItemActive] = useState([])
  const [idsCreateLoan, setIdsCreateLoan] = useState([])

  const addId = (ids) => {
    setIdsCreateLoan(ids)
  }

  const createLoan = () => {
    loanStore.createLoan({
      bankFeedbacksSelected: idsCreateLoan,
      taskId: loanStore?.task?.id
    }).then(() => {
      navigate(ScreenNames.HOME)
    }).catch(() => {
      alert('Hệ thống gặp sự cố. Chúng rôi sẽ khắc phục')
    })
  }

  const renderItem = ({ item }) => {
    return <FeedBackItem
      item={item}
      itemActive={itemActive}
      setItemActive={setItemActive}
      addId={addId}
      idsCreateLoan={idsCreateLoan}
    />
  }

  return (
    <View>
      {idsCreateLoan?.length > 0 &&
        <Pressable style={styles.create} onPress={() => {
          createLoan()
        }}>
          <AppText value={'Tạo hồ sơ vay'} style={styles.textCreate} />
        </Pressable>
      }
      <FlatList
        keyExtractor={item => item.code}
        data={data}
        renderItem={renderItem}
        style={styles.container}
      />
    </View>)
});

export default FeedBack;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@ms'
  },
  flatList: {
    padding: '16@s',
    backgroundColor: color.background,
    borderRadius: '8@s'
  },
  create: {
    height: '50@s',
    backgroundColor: color.palette.blue,
    marginBottom: '16@s',
    borderRadius: '8@s',
    justifyContent: 'center',
    marginHorizontal: '20@s'
  },
  textCreate: {
    color: color.palette.white,
    textAlign: 'center',

  }
});
