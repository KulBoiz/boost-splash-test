import React, { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { s, ScaledSheet } from "react-native-size-matters"
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_REGULAR_14, ROW } from "../../../styles/common-style"
import UploadImage from "../../../components/image-upload/upload-image"
import { truncateString, width } from "../../../constants/variable"
import ImageViewer from "../../../components/image-viewer/image-viewer"
import { Box, Row } from "native-base"
import { ImageDocumentSvg, ImageDocumentBadgeSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
interface Props {
  data: any
  onUploadFile?: (fileId, documentId) => void
}

const CollapsibleInfoUpload = React.memo(({ data, onUploadFile }: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const [imageUrls, setImageUrls] = useState<any>([])

  const title = useMemo(() => truncateString(data?.document?.name, 20), [data?.document?.name])

  useEffect(() => {
    setImageUrls(data.images)
  }, [data.images])

  const _onUploadFile = (file: any) => {
    setImageUrls([file.url, ...imageUrls])
  }

  const _handleSections = (index: number[]) => {
    setActiveSections(index)
  }
  const renderHeader = (item, index: number) => {
    const isOpen = activeSections?.includes(index)
    return (
      <Box style={styles.headerBody}>
        <AppText value={title} style={styles.headerText} />
        <View style={[ROW, ALIGN_CENTER]}>
          {imageUrls?.length ? (
            <Row alignItems="center">
              <Text
                size="regular14"
                fontWeight="500"
                color="lightGray"
                mr="1"
                text={imageUrls?.length}
              />
              {isOpen ? (
                <ImageDocumentSvg width={18} height={18} />
              ) : (
                <ImageDocumentBadgeSvg width={18} height={18} />
              )}
            </Row>
          ) : (
            <AppText value={"Chưa cập nhật"} style={FONT_REGULAR_14} />
          )}

          <FastImage
            source={isOpen ? images.arrow_up : images.arrow_down}
            style={styles.icon}
            tintColor={isOpen ? color.palette.blue : color.palette.lightGray}
          />
        </View>
      </Box>
    )
  }

  const renderContent = () => {
    const imageSize = (width - s(80)) / 3
    return (
      <Row flexWrap="wrap" pb={s(16)} ml={s(16)}>
        {imageUrls?.length > 0
          ? imageUrls.map((item, index) => (
              <ImageViewer key={index} title={title} size={imageSize} imageUri={item as any} />
            ))
          : null}
        <UploadImage
          size={imageSize}
          onUploadFile={_onUploadFile}
          documentId={data?.document?.id}
        />
      </Row>
    )
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
    width: (width - 72) / 2,
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
    paddingLeft: "16@s",
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
