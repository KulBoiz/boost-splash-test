import React from "react"
import { View, FlatList } from "react-native"
import { color } from "../../theme"
import { s, ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../models"
import FastImage from "react-native-fast-image"
import { AppText } from "../../components/app-text/AppText"
import RenderHtml from "react-native-render-html"
import { width } from "../../constants/variable"
import BottomView from "../../components/bottom-view"
import { ALIGN_CENTER, FONT_MEDIUM_12, ROW } from "../../styles/common-style"
import EmptyList from "../../components/empty-list"

interface Props{}
const tagsStyles = {
  img: {
    width: '80%',
  },

}
const InformationItem = ({ item } : any) => {

  return(
    <View style={styles.itemContainer}>
      <View style={[ROW, ALIGN_CENTER]}>
        <FastImage source={{uri: item?.icon?.url}} style={styles.icon}/>
        <AppText value={item?.title} style={FONT_MEDIUM_12}/>
      </View>
        <RenderHtml
          source={{ html: item?.content}}
          contentWidth={width - s(32)}
          tagsStyles={tagsStyles}/>
    </View>
  )
}


const Information = React.memo((props: Props) => {
  const { productStore } = useStores()
  const { productDetail } = productStore
  const content = productDetail?.productContent

  const renderItem = ({item, index}) => {
    return <InformationItem item={item}/>
  }

  return (
    <FlatList
      style={styles.container}
      keyExtractor={(e, i)=> i.toString()}
      data={content}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<BottomView height={50}/>}
      ListEmptyComponent={<EmptyList />}
    />
  )
});

export default Information;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingHorizontal: '16@s',
    paddingVertical: '24@s'
  },
  icon: {
    width :'18@s',
    height: '18@s',
    borderRadius: '4@s',
    marginRight: '10@s',
  },
  itemContainer: {
    marginBottom: '10@s'
  },
  dashLine: {
    top: '10@s',
    left: '25@s',
    position: 'absolute',
    zIndex: -1
  },
});
