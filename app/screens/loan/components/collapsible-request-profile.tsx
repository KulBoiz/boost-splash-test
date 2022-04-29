import React, { useState } from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { REQUEST_PROFILE } from "../constants"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
interface Props {}

const CollapsibleRequestProfile = React.memo((props: Props) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const _handleSections = (index: number[]) => {
    setActiveSections(index);
  };
  const renderHeader = (index: number) => {
    return (
      <View
        style={styles.headerBody}>
          <AppText
            tx={'loan.requestProfile'}
            style={styles.headerText}
          />
        <FastImage source={activeSections?.includes(index) ? images.arrow_up : images.arrow_down} style={styles.icon} />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {REQUEST_PROFILE.map((value, index)=> {
          return(
            <View key={index.toString()} style={styles.wrapContent}>
              <AppText value={value.title} style={styles.title} capitalize/>
              {value.content.map((content,id)=> (
                <View key={id.toString()} style={styles.wrapContentItem}>
                  <View style={styles.circle}/>
                  <AppText value={content} style={styles.content}/>
                </View>
              ))}
            </View>
          )
        })}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Accordion
        containerStyle={[styles.collapsibleContainer,  {borderWidth: activeSections.length > 0 ? 1: 0}]}
        sections={[0]}
        activeSections={activeSections}
        renderHeader={(content, index) => renderHeader(index)}
        renderContent={renderContent}
        onChange={(indexes) => _handleSections(indexes)}
        keyExtractor={(v, i) => i.toString()}
        underlayColor={'transparent'}
      />
    </View>
  );
});

export default CollapsibleRequestProfile;
CollapsibleRequestProfile.displayName = 'CollapsibleRequestProfile'

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
