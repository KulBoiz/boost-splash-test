import React, { useEffect, useMemo, useState } from "react"
import { View } from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, FONT_REGULAR_14, ROW } from "../../../styles/common-style"
import UploadDocument from "../../../components/upload-document/upload-document"
import { truncateString, width } from "../../../constants/variable"
import { Box, Row } from "native-base"
import { ImageDocumentSvg, ImageDocumentBadgeSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import DocumentItem from "./document-item"
import { observer } from "mobx-react-lite"
import { useStores } from "../../../models"
import { filter } from "../../../utils/lodash-utils"
interface Props {
  data: any
}

const CollapsibleInfoUpload = observer(({ data }: Props) => {
  const { loanStore } = useStores()

  const [activeSections, setActiveSections] = useState<number[]>([])
  const [files, setFiles] = useState<any>([])

  const title = useMemo(() => truncateString(data?.document?.name, 20), [data?.document?.name])

  useEffect(() => {
    setFiles(data?.files || [])
  }, [data.files])

  const _onUploadFile = (file: any) => {
    setFiles([file, ...(files || [])])
  }

  const onDeleteDocument = async (file) => {
    setFiles(filter(files, (f) => f.id !== file.id))
    await loanStore.updateLoanDocument(
      file.templateDocumentFileId,
      "unSelected",
      loanStore?.loanDetail?.id,
    )
  }

  const _handleSections = (index: number[]) => {
    setActiveSections(index)
  }
  const renderHeader = (item, index: number) => {
    const isOpen = activeSections?.includes(index)
    return (
      <Box style={styles.headerBody}>
        <Text text={title} color={isOpen ? "primary" : "grayChateau"} size="regular12" />
        <View style={[ROW, ALIGN_CENTER]}>
          {files?.length ? (
            <Row alignItems="center">
              <Text
                size="regular14"
                fontWeight="500"
                color="lightGray"
                mr="1"
                text={files?.length}
              />
              {isOpen ? (
                <ImageDocumentSvg width={18} height={18} />
              ) : (
                <ImageDocumentBadgeSvg width={18} height={18} />
              )}
            </Row>
          ) : (
            // <Text text="đã cập nhật" color="grayChateau" size="regular12" />
            <Text text="chưa cập nhật" color="orange" size="regular12" />
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
    return (
      <Box>
        <UploadDocument onUploadSuccess={_onUploadFile} documentId={data?.document?.id} />
        <Box pb={s(16)} mx={s(16)}>
          {files?.length > 0
            ? files.map((item, index) => {
                return <DocumentItem key={index} file={item} onDelete={onDeleteDocument} />
              })
            : null}
        </Box>
      </Box>
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
