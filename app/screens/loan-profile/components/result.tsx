import React from "react"
import { FlatList } from "react-native"
import { ScaledSheet } from "react-native-size-matters";
import ResultItem from './result-item';
import { useStores } from "../../../models"

interface Props {
}

const Result = React.memo((props: Props) => {
  // @ts-ignore
  const { loanStore, dealDetailStoreModel } = useStores()
  const data = loanStore?.loanDetail?.dealDetails

  const renderItem = ({ item }) => {
    return <ResultItem
      item={item}
      dealDetailStoreModel={dealDetailStoreModel}
      loanStore={loanStore}
    />
  }

  return (
    <FlatList
      keyExtractor={item => item.code}
      data={data}
      renderItem={renderItem}
      style={styles.container}
    />)
});

export default Result;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@ms',
    paddingBottom: '16@s',
  },

});
