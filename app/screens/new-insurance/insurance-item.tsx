import React from 'react';
import { Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";
import RenderHtml from 'react-native-render-html';
import { ms, ScaledSheet } from "react-native-size-matters";
import { images } from "../../assets/images";
import { BlueTickSvg } from "../../assets/svgs";
import { AppText } from '../../components/app-text/AppText';
import { fontFamily } from "../../constants/font-family";
import { width } from '../../constants/variable';
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../styles/common-style";
import { color } from "../../theme";

interface InsuranceItemProps {
  item: any
}

const InsuranceItem = React.memo((props: InsuranceItemProps) => {
  const { item } = props
  const imageUrl = item?.info?.image?.url
  const {item} = props

  const handlePress = () => {
    // navigate(ScreenNames.LOAN_DETAIL)
  }

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
    },
    a: {
      color: 'green'
    },
    p: {
      margin: 0,
      padding: 0
    }
  };

  return (
    <Pressable
      style={[styles.container, styles.border]}
      onPress={handlePress}>
      <View style={styles.header}>
        <View style={[ROW, ALIGN_CENTER]} >
          <FastImage source={imageUrl ? { uri: imageUrl } : images.avatarDefault} style={styles.bankIcon} resizeMode={'contain'} />
          <View>
            <AppText value={'Bảo hiểm'} fontSize={ms(11)} />
            <AppText value={item?.name} fontSize={ms(14)} fontFamily={fontFamily.bold} color={color.primary} />
          </View>
        </View>
        <FastImage source={images.arrowLeft} style={styles.rightIcon} />
      </View>

      <View style={styles.body}>
        {
          item?.highlights ? item?.highlights?.map((val, id) => {
            const isLastItem = item?.highlights?.length - 1 === id
            return (
              <View key={id.toString()} style={[ROW, ALIGN_CENTER, !isLastItem && MARGIN_BOTTOM_8]}>
                <BlueTickSvg style={{ marginRight: ms(5) }} />
                <RenderHtml
                  contentWidth={width}
                  source={{ html: `${val?.highlightItem}` }}
                  tagsStyles={tagsStyles}
                />
              </View>
            )
          }) :
            <AppText value={item?.advantages} />
        }
      </View>
    </Pressable>
  )
});

export default InsuranceItem;
InsuranceItem.displayName = 'InsuranceItem'

const styles = ScaledSheet.create({
  container: {
    padding: '20@s',
    borderRadius: '8@s',
    backgroundColor: color.palette.white,
    marginBottom: '12@s',
  },
  border: {
    borderWidth: 1,
    borderColor: color.palette.BABABA,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rightIcon: {
    width: '16@s',
    height: '16@s',
    transform: [{ rotate: '180deg' }]
  },
  bankIcon: {
    width: '64@s',
    height: '24@s',
    marginRight: '16@s'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  header: {
    borderTopRightRadius: '8@s',
    borderTopLeftRadius: '8@s',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.BABABA,
    paddingBottom: '20@s'
  },
  body: {
    paddingTop: '20@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
  },
});
