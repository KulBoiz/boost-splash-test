import React from 'react';
import { ImageBackground, Pressable, View } from "react-native";
import FastImage from "react-native-fast-image";
import { ScaledSheet } from "react-native-size-matters";
import { images } from "../../../assets/images";
import { AppText } from "../../../components/app-text/AppText";
import { fontFamily } from "../../../constants/font-family";
import { color } from "../../../theme";

interface Props {
  insuranceType: number
  setInsuranceType(e: any): void
  productDetail: any
}
interface ItemProps {
  id: number
  insuranceType: number
  setInsuranceType(e: number): void
  detail: any
}

const RenderCheckbox = React.memo(({ id, insuranceType }: { id: number, insuranceType: number }) => {
  return (
    <>
      {id === insuranceType ?
        <View style={[styles.circle, styles.select]}>
          <FastImage source={images.check} style={styles.iconCheck} />
        </View>
        :
        <View style={[styles.circle, styles.unselect]} />
      }
    </>
  )
})

const Item = ({ id, insuranceType, setInsuranceType, detail }: ItemProps) => {
  const isSelect = id === insuranceType

  return (
    <Pressable style={[styles.itemContainer, isSelect && styles.selectContainer]} onPress={() => setInsuranceType(id)}>
      <FastImage source={{ uri: detail?.image?.url }} resizeMode="cover" style={styles.imageBackground}>
        <RenderCheckbox {...{ id, insuranceType }} />
      </FastImage>
    </Pressable>
  )
}

const InsurancePicker = React.memo((props: Props) => {
  const { insuranceType, setInsuranceType, productDetail } = props

  return (
    <View style={styles.container}>
      <AppText value={'Chọn gói bảo hiểm'} style={styles.header} />

      {productDetail?.packages && productDetail?.packages?.map((el, id) => (
        <Item key={id.toString()} id={id} insuranceType={insuranceType} setInsuranceType={setInsuranceType} detail={el} />
      ))}
    </View>
  )
});

export default InsurancePicker;

const styles = ScaledSheet.create({
  container: {
    marginTop: '24@s',
    paddingHorizontal: '16@ms',
    paddingVertical: '24@ms',
    backgroundColor: color.background
  },
  header: {
    fontSize: '16@ms',
    fontFamily: fontFamily.semiBold,
    marginBottom: '8@s'
  },
  itemContainer: {
    marginTop: '16@s',
    borderRadius: '8@s',
    height: '170@ms',
    backgroundColor: color.background,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: color.palette.blue,
    backgroundColor: color.palette.lightBlue
  },
  viewDetail: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  circle: {
    width: '20@s',
    height: '20@s',
    borderRadius: '10@s',
    alignItems: "center",
    justifyContent: "center",
    marginTop: '16@s',
    marginRight: '16@s',
  },
  select: {
    backgroundColor: color.palette.blue,
  },
  unselect: {
    backgroundColor: color.background,
    borderWidth: 1,
  },
  iconCheck: {
    width: '9@s',
    height: '6@s',
  },
  imageBackground: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-end",
    borderRadius: '8@s',
  },
});
