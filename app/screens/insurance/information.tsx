import React from "react"
import { View, FlatList } from "react-native"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { useStores } from "../../models"
import FastImage from "react-native-fast-image"
import { AppText } from "../../components/app-text/AppText"
import RenderHtml from "react-native-render-html"
import { width } from "../../constants/variable"
import BottomView from "../../components/bottom-view"
import { FONT_MEDIUM_12 } from "../../styles/common-style"
import EmptyList from "../../components/empty-list"

interface Props{}

const InformationItem = ({ item, isLastItem } : any) => {
  // const [itemHeight, setItemHeight] = useState<number>(0)

  return(
    <View style={styles.itemContainer}
    //       onLayout={useCallback((event) => {
    //   const { height } = event.nativeEvent.layout;
    //   setItemHeight(height)
    // }, [])}
    >
      <FastImage source={{uri: item?.icon?.url}} style={styles.icon}/>
      {/* {isLastItem && */}
      {/*  <DashedLine axis='vertical' dashLength={4} dashThickness={1} dashGap={5} dashColor='gray' style={[styles.dashLine, { height: itemHeight }]} /> */}
      {/* } */}
      <View style={styles.wrapContent}>
        <AppText value={item?.title} style={FONT_MEDIUM_12}/>
        <RenderHtml source={{ html: item?.content}} contentWidth={width}/>
      </View>
    </View>
  )
}


const Information = React.memo((props: Props) => {
  const { productStore } = useStores()
  const { productDetail } = productStore
  const content = productDetail?.productContent

  const renderItem = ({item, index}) => {
    const isLastItem = content.lenght === index
    return <InformationItem item={item} isLastItem={isLastItem}/>
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
  wrapContent: {
    width: '85%',
    marginTop: '2@s'
  },
  icon: {
    width :'18@s',
    height: '18@s',
    borderRadius: '4@s',
    marginRight: '20@s',
    marginLeft: '10@s'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: "flex-start",
    marginBottom: '10@s'
  },
  dashLine: {
    top: '10@s',
    left: '25@s',
    position: 'absolute',
    zIndex: -1
  },
});
