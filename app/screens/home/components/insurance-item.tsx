import React from 'react';
import { Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";
import { s, ScaledSheet } from "react-native-size-matters";
import { SvgUri } from 'react-native-svg';
import { images } from '../../../assets/images';
import { AppText } from "../../../components/app-text/AppText";
import { useStores } from "../../../models";
import { navigate } from "../../../navigators";
import { ScreenNames } from "../../../navigators/screen-names";
import { FONT_MEDIUM_12, FONT_SEMI_BOLD_14 } from "../../../styles/common-style";
import { color } from "../../../theme";
interface Props {
  item: any
}

const TaqItem = ({ title }: { title: string }) => {
  return (
    <View style={styles.tagContainer}>
      <AppText value={title} style={styles.tagText} />
    </View>
  )
}

const InsuranceItem = React.memo((props: Props) => {
  // @ts-ignore
  const { insuranceStore, productStore } = useStores()
  const { item } = props
  const handlePress = () => {
    if (insuranceStore.isFirstTime) {
      navigate(ScreenNames.INTRODUCE_SCREEN)
    } else {
      productStore.getDetail(item?.id).then(() => {
        navigate(ScreenNames.INSURANCE_SCREEN)
      })
      productStore.getTransactionInsurance(item?.id)
    }
  }

  const renderSvg = () => {
    if (item?.info?.image?.url && item?.info?.image?.url.includes('.svg')) return <SvgUri
      width={s(98)}
      height={s(98)}
      uri={item?.info?.image?.url}
    />
    return <FastImage source={item?.info?.image?.url ? { uri: item?.info?.image?.url } : images.insurance_default} style={styles.image} />
  }

  const price = () => {
    if (item?.packages && item?.packages?.length > 0) {
      return Math.min(...item?.packages.map(el => el?.price)).toLocaleString()
    }

    return '_'
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.image}>
        {renderSvg()}
      </View>
      <View style={{ flexDirection: 'column' }}>
        <AppText value={item?.name} capitalize style={[FONT_MEDIUM_12, { width: 150 }]} numberOfLines={1} />

        <View style={styles.wrapTag}>
          {item?.tags?.map((value, index) => (
            <TaqItem title={value?.tag} key={index.toString()} />
          ))}
        </View>

        <View style={styles.amount}>
          <AppText value={`Từ ${price()}đ/ năm`} style={FONT_SEMI_BOLD_14} color={color.palette.blue} />
        </View>
      </View>
    </Pressable>
  )
});

export default InsuranceItem;

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    padding: '8@ms',
    borderWidth: 1,
    borderRadius: '8@s',
    borderColor: 'rgba(173, 173, 173, 0.5)',
    marginBottom: '16@s',
  },
  image: {
    width: '98@s',
    height: '98@s',
    borderRadius: '8@s',
    marginRight: '16@ms',
    borderColor: color.palette.BABABA,
    borderWidth: 0.5,
  },
  wrapTag: {
    flexDirection: 'row',
    flexWrap: "wrap",
    width: '170@s',
  },
  tagContainer: {
    margin: '3@ms',
    backgroundColor: color.palette.EEEEEE,
    borderRadius: '8@s',
    paddingHorizontal: '8@ms',
    paddingVertical: '4@s'
  },
  tagText: {
    fontSize: '8@ms'
  },
  amount: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});
