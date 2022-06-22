import React, { useState } from "react"
import { View } from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_REGULAR_14, ROW } from "../../../styles/common-style"
import UploadImage from "../../../components/image-upload/upload-image"
import { truncateString } from "../../../constants/variable"
import { get } from "lodash"
interface Props {
  data: any
}

const CollapsibleInfoUpload = React.memo(({ data }: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const imageUrls: string[] = get(data, "images")

  const _handleSections = (index: number[]) => {
    setActiveSections(index)
  }
  const renderHeader = (item, index: number) => {
    const isOpen = activeSections?.includes(index)
    return (
      <View style={styles.headerBody}>
        <AppText value={truncateString(data?.document?.name, 20)} style={styles.headerText} />
        <View style={[ROW, ALIGN_CENTER]}>
          <AppText
            value={imageUrls?.length === 0 || !imageUrls ? "Chưa cập nhật" : "Đã cập nhập"}
            style={FONT_REGULAR_14}
          />
          <FastImage
            source={isOpen ? images.arrow_up : images.arrow_down}
            style={styles.icon}
            tintColor={isOpen ? color.palette.blue : color.palette.lightGray}
          />
        </View>
      </View>
    )
  }

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {imageUrls?.length > 0 &&
          imageUrls?.map((el, index) => (
            <FastImage key={index.toString()} source={{ uri: el }} style={styles.image} />
          ))}
        <UploadImage />
      </View>
    )
    // return (
    //   <View style={styles.contentContainer}>
    //     <UploadImage setMediaIds={setMediaIds} mediaIds={mediaIds} />
    //   </View>
    // );
  }
  return (
    <View style={styles.container}>
      <Accordion
        containerStyle={[
          styles.collapsibleContainer,
          { borderWidth: activeSections.length > 0 ? 1 : 0 },
        ]}
        sections={[0]}
        activeSections={activeSections}
        renderHeader={(content, index) => renderHeader(content, index)}
        renderContent={renderContent}
        onChange={(indexes) => _handleSections(indexes)}
        keyExtractor={(v, i) => i.toString()}
        underlayColor={"transparent"}
      />
    </View>
  )
})

export default CollapsibleInfoUpload

const styles = ScaledSheet.create({
  container: {
    marginVertical: "8@s",
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: "8@s",
    borderColor: color.palette.blue,
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.regular,
    color: color.palette.lightGray,
    fontWeight: "500",
  },
  headerBody: {
    padding: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "12@ms",
    color: color.palette.blue,
    marginBottom: "8@s",
  },
  image: {
    width: "145@ms",
    height: "120@ms",
  },
  icon: {
    width: "16@s",
    height: "16@s",
    marginLeft: "4@s",
  },
  text: {
    fontSize: "12@ms",
    lineHeight: "19@s",
  },
  contentContainer: {
    marginTop: "-12@s",
    paddingHorizontal: "16@s",
    paddingBottom: "16@s",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  wrapContent: {
    marginTop: "16@s",
  },
  wrapContentItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: "3@s",
    height: "3@s",
    borderRadius: "1.5@s",
    backgroundColor: color.palette.black,
    marginRight: "5@s",
  },
  content: {
    fontFamily: fontFamily.regular,
    fontSize: "12@ms",
  },
})
