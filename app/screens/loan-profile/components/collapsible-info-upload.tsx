import React, { useState } from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import { REQUEST_PROFILE } from "../../loan/constants"
import { ALIGN_CENTER, FONT_REGULAR_14, ROW } from "../../../styles/common-style"
import UploadImage from "../../../components/loan-upload/upload-image"
interface Props {
  data : any[]
}

const CollapsibleInfoUpload = React.memo(({ data }: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [mediaIds, setMediaIds] = useState<string[]>([])
  const _handleSections = (index: number[]) => {
    setActiveSections(index);
  };
  const renderHeader = (item, index: number) => {
    const isOpen = activeSections?.includes(index)
    return (
      <View
        style={styles.headerBody}>
          <AppText
            value={item?.name}
            style={styles.headerText}
          />
        <View style={[ROW, ALIGN_CENTER]}>
          {!isOpen && <AppText value={'chưa cập nhật'} style={FONT_REGULAR_14}/>}
          <FastImage
            source={isOpen ? images.arrow_up : images.arrow_down}
            style={styles.icon}
            tintColor={isOpen ? color.palette.blue : color.palette.lightGray}
          />
        </View>

      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
          <UploadImage setMediaIds={setMediaIds} mediaIds={mediaIds} />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Accordion
        containerStyle={[styles.collapsibleContainer,  {borderWidth: activeSections.length > 0 ? 1: 0}]}
        sections={[0]}
        activeSections={activeSections}
        renderHeader={(content, index) => renderHeader(content,index)}
        renderContent={renderContent}
        onChange={(indexes) => _handleSections(indexes)}
        keyExtractor={(v, i) => i.toString()}
        underlayColor={'transparent'}
      />
    </View>
  );
});

export default CollapsibleInfoUpload;

const styles = ScaledSheet.create({
  container: {
    marginVertical: '24@s',
  },
  collapsibleContainer:{
    backgroundColor: color.background,
    borderRadius: '8@s',
    borderColor: color.palette.blue
  },
  headerText:{
    fontSize: '14@ms',
    fontFamily: fontFamily.regular,
    color: color.palette.lightGray ,
    fontWeight: '500'
  },
  headerBody: {
    padding: '16@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize:'12@ms',
    color: color.palette.blue,
    marginBottom: '8@s'
  },

  icon: {
    width: '16@s',
    height: '16@s',
  },
  text: {
    fontSize: '12@ms',
    lineHeight: '19@s',
  },
  contentContainer: {
    marginTop: '-12@s',
    paddingHorizontal: '16@s',
    paddingBottom: '16@s'
  },
  wrapContent:{
    marginTop:'16@s'
  },
  wrapContentItem:{
    flexDirection: 'row',
    alignItems: "center"
  },
  circle: {
    width: '3@s',
    height: '3@s',
    borderRadius: '1.5@s',
    backgroundColor: color.palette.black,
    marginRight: '5@s'
  },
  content: {
    fontFamily: fontFamily.regular,
    fontSize: '12@ms'
  }
});
