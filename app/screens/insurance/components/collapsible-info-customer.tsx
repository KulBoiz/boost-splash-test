import React, { useState } from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { images } from '../../../assets/images';
import { ScaledSheet } from 'react-native-size-matters';
import { AppText } from "../../../components/app-text/AppText"
import { color } from "../../../theme"
import { fontFamily } from "../../../constants/font-family"
import ItemView from "../../loan/components/item-view"
import { MARGIN_TOP_16 } from "../../../styles/common-style"
import moment from "moment"
import { useStores } from '../../../models';
interface Props {
  infoCustomer: any
  infoBuyInsurance: any
}

const CollapsibleInfoCustomer = React.memo(({ infoCustomer, infoBuyInsurance }: Props) => {
  const { authStoreModel } = useStores()

  const accordionItem = (content) => {
    const [activeSections, setActiveSections]: any = useState([]);
    const _handleSections = (index) => {
      setActiveSections(index);
    };

    const renderHeader = (index: number, title: string) => {
      const isOpen = activeSections[0] === index
      return (
        <>
          <View
            style={styles.headerBody}>
            <AppText
              value={title}
              style={styles.headerText}
            />
            <FastImage source={activeSections?.includes(index) ? images.arrow_up : images.arrow_down} style={styles.icon} />
          </View>
          {isOpen && <View style={styles.line} />}
        </>
      );
    };

    const renderContent = (info: any) => {
      return (
        <View style={styles.contentContainer}>
          <ItemView title={'Họ và tên:'} content={info?.fullName} style={MARGIN_TOP_16} />
          <ItemView title={'Ngày sinh:'} content={`${moment(info?.dateOfBirth).format('DD/MM/YYYY')}`} style={MARGIN_TOP_16} />
          <ItemView title={'CMND/ CCCD:'} content={info?.citizenIdentification} style={MARGIN_TOP_16} />
          <ItemView title={'Email'} content={info?.email} style={MARGIN_TOP_16} />
        </View>
      );
    };

    return <Accordion
      containerStyle={[styles.collapsibleContainer, { borderWidth: activeSections.length > 0 ? 1 : 0 }]}
      sections={[0]}
      activeSections={activeSections}
      renderHeader={(content, index) => renderHeader(index, 'Thông tin người hưởng bảo hiểm')}
      renderContent={() => renderContent(content)}
      onChange={(indexes) => {
        _handleSections(indexes)
      }}
      keyExtractor={(v, i) => i.toString()}
      underlayColor={'transparent'}
    />
  }

  return (
    <View style={styles.container}>
      {accordionItem(authStoreModel?.user)}
      {accordionItem({
        fullName: infoCustomer?.fullNameCustomer,
        dateOfBirth: infoCustomer?.dateOfBirthCustomer,
        citizenIdentification: infoCustomer?.citizenIdentificationCustomer,
        email: infoCustomer?.emailCustomer,
      })}
    </View>
  );
});

export default CollapsibleInfoCustomer;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: color.palette.lightBlue,
    paddingHorizontal: '16@s',
  },
  collapsibleContainer: {
    backgroundColor: color.background,
    borderRadius: '8@s',
    borderColor: color.palette.blue,
    marginTop: '16@s'
  },
  headerText: {
    fontSize: '14@ms',
    fontFamily: fontFamily.medium,
    fontWeight: '500'
  },
  headerBody: {
    padding: '16@s',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '12@ms',
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
    paddingHorizontal: '16@s',
    paddingBottom: '16@s'
  },
  wrapContent: {
    marginTop: '16@s'
  },
  wrapContentItem: {
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
  },
  line: {
    height: 1,
    backgroundColor: color.palette.F0F0F0,
    marginHorizontal: '16@ms'
  }
});
