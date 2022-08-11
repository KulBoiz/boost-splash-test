import React, { useEffect, useState } from "react"
import { View } from "react-native"
import Accordion from "react-native-collapsible/Accordion"
import FastImage from "react-native-fast-image"
import { images } from "../../../assets/images"
import { ms, s, ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import { width } from "../../../constants/variable"
import { Box, Row } from "native-base"
import { ImageDocumentSvg, ImageDocumentBadgeSvg } from "../../../assets/svgs"
import { Text } from "../../../components"
import { observer } from "mobx-react-lite"
import { filter } from "../../../utils/lodash-utils"
import DocumentItem from "../../loan-profile/components/document-item"
import UploadImage from "../../../components/upload-document/upload-image"

interface Props {
  onDataChange?(e: any): void
  data: any
  canEdit?:boolean
}

const CollapsibleClaimUpload = observer(({ data, onDataChange, canEdit = true }: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([])
  const [files, setFiles] = useState<any>([])

  useEffect(() => {
    setFiles(data || [])
  }, [])

  // const title = useMemo(() => truncateString(data?.document?.name, 20), [data?.document?.name])
  const title = "Tải lên giấy tờ"

  const _onUploadFile = (file: any) => {
    setFiles([file, ...(files || [])])
    if (onDataChange) {
      onDataChange([file, ...(files || [])])
    }
  }

  const onDeleteDocument = async (file) => {
    setFiles(filter(files, (f) => f.id !== file?.id))
    if (onDataChange) {
      onDataChange(filter(files, (f) => f.id !== file?.id))
    }
  }

  const _handleSections = (index: number[]) => {
    setActiveSections(index)
  }
  const renderHeader = (item, index: number) => {
    const isOpen = activeSections?.includes(index)
    return (
      <Box style={[styles.headerBody, {borderWidth: isOpen ? 0 : 1}]}>
        <Text text={title} color={isOpen ? "primary" : "gray"} fontSize={ms(14)} />
        <View style={[ROW, ALIGN_CENTER]}>
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
        {canEdit && <UploadImage onUploadSuccess={_onUploadFile} />}
        <Box pb={s(16)} mx={s(16)}>
          {files?.length > 0
            ? files.map((item, index) => {
                return <DocumentItem key={index} file={item} onDelete={onDeleteDocument} canEdit={canEdit}/>
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

export default CollapsibleClaimUpload

const styles = ScaledSheet.create({
  container: {
    marginVertical: "8@s",
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: "4@s",
    borderColor: color.palette.blue,
  },
  headerText: {
    fontSize: "14@ms",
    fontFamily: fontFamily.regular,
    color: color.palette.lightGray,
    fontWeight: "500",
  },
  headerBody: {
    borderRadius: '4@s',
    borderColor: color.palette.grayDarker,
    paddingHorizontal: "12@ms",
    paddingVertical: "15@ms",
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
