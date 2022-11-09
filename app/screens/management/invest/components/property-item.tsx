import React, { useCallback, useState } from "react"
import { TextStyle, View } from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import { AppText } from "../../../../components/app-text/AppText"
import { FastImage } from "../../../../components/fast-image/fast-image"
import { images } from "../../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../../theme"
import { fontFamily } from "../../../../constants/font-family"
import { ALIGN_CENTER, FONT_REGULAR_14, FONT_SEMI_BOLD_14, ROW, SPACE_BETWEEN } from "../../../../styles/common-style"
import { hexToRgbA, numberWithCommas } from "../../../../constants/variable"
import { Pressable } from "native-base"
import { ScreenNames } from "../../../../navigators/screen-names"
import { navigate } from "../../../../navigators"

interface Props {
  item?: any
}

interface ItemProps {
  title: any
  titleColor?: string
  contentColor?: string
  content: any
  titleStyle?: TextStyle | any
  contentStyle?: TextStyle | any
}

interface ButtonProps {
  title: string
  color: string

  onPress?(): void
}

const Button = React.memo(({ title, onPress, color }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.btn, { backgroundColor: hexToRgbA(color, 0.1) }]}>
      <AppText value={title} color={color} />
    </Pressable>
  )
})

const Item = React.memo(({ title, content, titleStyle, contentStyle, titleColor, contentColor }: ItemProps) => {
  return (
    <View style={[ROW, SPACE_BETWEEN]}>
      <AppText value={title} style={titleStyle} color={titleColor ?? color.palette.BABABA} />
      <AppText value={content} style={contentStyle} color={contentColor ?? color.palette.BABABA} />
    </View>
  )
})

const PropertyItem = React.memo((props: Props) => {
  const { item } = props
  const [activeSections, setActiveSections] = useState<number[]>([])

  const _handleSections = (index: number[]) => {
    setActiveSections(index)
  }

  const renderHeader = useCallback((index: number) => {
    const isOpen = index === activeSections[0]
    console.log('index', index)
    console.log('active', activeSections[0])
    return (
      <View style={styles.headerContainer}>
        <View style={[ROW, ALIGN_CENTER]}>
          <FastImage source={images.fina_logo}
                     style={styles.image} />
          <View style={styles.header}>
            <Item title={"TVPF"} content={"Giá trị tương ứng (VNĐ)"} titleStyle={FONT_SEMI_BOLD_14}
                  titleColor={color.primary} contentStyle={FONT_REGULAR_14} />
            <Item title={"Quỹ mở"} content={numberWithCommas(40000)} titleColor={color.palette.green}
                  contentStyle={{ fontFamily: fontFamily.bold }} contentColor={color.palette.black} />
          </View>
        </View>

        <View>
          <Item title={'Chương trình'} content={'Lời/Lỗ'} />
          <Item title={'Linh hoạt'} content={`(2) 2%`} titleColor={color.palette.black} contentColor={color.palette.green}/>
        </View>
        {isOpen && <FastImage source={images.arrow_up} style={styles.iconArrow} />}
      </View>
    )
  }, [])

  const renderContent = useCallback(() => {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.wrapContent}>

        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText value={"Số lượng CCQ"}  color={color.palette.BABABA} />
          <AppText value={"Giá mua"}  color={color.palette.BABABA} />
          <AppText value={"Giá gần nhất"}  color={color.palette.BABABA} />
        </View>
        <View style={[ROW, SPACE_BETWEEN]}>
          <AppText value={numberWithCommas(111)}  />
          <AppText value={numberWithCommas(11123)} />
          <AppText value={numberWithCommas(11121)}  />
        </View>

        </View>

        <View style={styles.wrapBtn}>
          <Button title={"Mua"} color={color.palette.blue} />
          <Button title={"Bán"} color={"#646464"} onPress={()=> navigate(ScreenNames.SALE_BONDS)}/>
          <Button title={"Chuyển đổi"} color={color.palette.orange} />
        </View>
      </View>
    )
  }, [])

  return (
    <View style={styles.container}>
      <Accordion
        containerStyle={styles.collapsibleContainer}
        sections={[0]}
        activeSections={activeSections}
        renderHeader={(content, index) => renderHeader(index)}
        renderContent={renderContent}
        onChange={(indexes) => _handleSections(indexes)}
        keyExtractor={(v, i) => i.toString()}
        underlayColor={"transparent"}
      />
    </View>
  )
})

export default PropertyItem

const styles = ScaledSheet.create({
  container: {
    marginBottom: "12@s",
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    borderWidth: 1,
    borderColor: color.palette.lightGrey,
  },
  iconArrow: {
    width: '16@s',
    height: '16@s',
    alignSelf: 'center',
    transform: [{rotate: '180deg'}]
  },
  header: {
    flex:1,
    marginBottom: '12@s'
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.regular,
    fontWeight: "500",
  },
  headerContainer: {
    padding: "16@s",
  },
  contentContainer: {
    flex:1
  },
  wrapContent:{
    paddingHorizontal: '16@s'
  },
  icon: {
    width: "34@s",
    height: "34@s",
  },
  image: {
    width: "34@s",
    height: "34@s",
    borderRadius: "4@s",
    marginRight: '8@s'
  },
  wrapBtn:{
    flexDirection: "row",
    paddingHorizontal: '8@s'
  },
  btn: {
    flex: 1,
    paddingVertical: "11@s",
  alignItems: 'center',
    borderRadius: '8@s',
    marginHorizontal: '4@s',
    marginVertical: '12@s'
  },
})
