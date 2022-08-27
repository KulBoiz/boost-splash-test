import React, { useState } from 'react';
import { Modal, Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";
import RenderHtml from 'react-native-render-html';
import { ms, s, ScaledSheet } from "react-native-size-matters";
import { images } from "../../assets/images";
import { BlueTickSvg } from "../../assets/svgs";
import { AppText } from '../../components/app-text/AppText';
import { LoadingComponent } from '../../components/loading';
import { fontFamily } from "../../constants/font-family";
import { truncateString, width } from '../../constants/variable';
import { useStores } from '../../models';
import { navigate } from '../../navigators';
import { ScreenNames } from '../../navigators/screen-names';
import { ALIGN_CENTER, MARGIN_BOTTOM_8, ROW } from "../../styles/common-style";
import { color } from "../../theme";

interface InsuranceItemProps {
  item: any
}

const InsuranceItem = React.memo((props: InsuranceItemProps) => {
  const { item } = props
  const imageUrl = item?.info?.image?.url
  const { insuranceStore, productStore, authStoreModel } = useStores()
  const [loading, setLoading] = useState(false)

  const handlePress = () => {
    if (insuranceStore.isFirstTime) {
      navigate(ScreenNames.INTRODUCE_SCREEN)
    } else {
      setLoading(true)
      productStore.getDetail(item?.id).then((res) => {
        navigate(ScreenNames.INSURANCE_SCREEN)
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })

      if (authStoreModel?.user?.id) {
        productStore.getTransactionInsurance(item?.id)
      }
    }
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
    },
    ul: {
      margin: 3,
      padding: 0
    },
    li: {
      marginLeft: 5,
      padding: 0
    },
  };

  return (
    <Pressable
      style={[styles.container, styles.border]}
      onPress={handlePress}>
      <View style={styles.header}>
        <View style={[ROW, ALIGN_CENTER]} >
          <FastImage source={imageUrl ? { uri: imageUrl } : images.avatarDefault} style={styles.bankIcon} resizeMode={'contain'} />
          <View>
            <AppText value={'Bảo hiểm'} fontSize={ms(11)} style={{ opacity: 0.5 }} />
            <AppText value={truncateString(item?.name, 22)} fontSize={ms(14)} fontFamily={fontFamily.bold} color={color.primary} />
          </View>
        </View>
        <FastImage source={images.arrowLeft} style={styles.rightIcon} />
      </View>

      <View style={styles.body}>
        {
          item?.highlights && item?.highlights?.map((val, id) => {
            const isLastItem = item?.highlights?.length - 1 === id
            return (
              <View key={id.toString()} style={!isLastItem && MARGIN_BOTTOM_8}>
                <RenderHtml
                  contentWidth={width}
                  source={{ html: `${val?.highlightItem}` }}
                  tagsStyles={tagsStyles}
                />
              </View>
            )
          })
        }
      </View>

      {loading && <>
        <Modal
          visible={true}
        >
          <LoadingComponent />
        </Modal>
      </>}
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
    marginRight: '16@s',
    borderRadius: '4@s'
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
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
    paddingBottom: '10@s'
  },
  body: {
    paddingTop: '10@s',
    borderBottomLeftRadius: '8@s',
    borderBottomRightRadius: '8@s',
  },
});
