import React, { useState } from "react"
import { View } from 'react-native';
import {ScaledSheet} from 'react-native-size-matters'
import { AppText } from "../../components/AppText/AppText"
import { color } from "../../theme"
import AppButton from "../../components/AppButton/AppButton"
import { FourthSvg } from "../../assets/svgs"
import WelcomeButton from "./components/WelcomeButton"
import { width } from "../../constants/variable"

interface Props{}

const CHOOSE = [
  {value: 'Vay Vốn'},
  {value: 'Bảo Hiểm'},
  {value: 'Bất Động Sản'},
]

const FourthScreen = React.memo((props: Props) => {
  const [selected, setSelected] = useState<Array<number>>([])

  const _handleSelect = (id) => {
        const index = selected?.findIndex((e) => e === id);
        if (index === -1) {
          setSelected([...selected, id]);
        } else {
          const num = [...selected];
          num.splice(index, 1);
          setSelected([...num]);
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.wrapChoose}>
        <AppText value={'Chọn ít nhất 1 trong 3 lựa chọn'}/>
        <AppText value={` ${selected.length}/3`}/>
      </View>
      <AppText value={'Bạn quan tâm đến...'} style={styles.textBold}/>
      {CHOOSE.map((e, index) => (
        <WelcomeButton key={index} isSelect={selected.includes(index)} title={e.value} onPress={()=> _handleSelect(index)} style={styles.btn}/>
        ))}
      <FourthSvg width={width}/>
    </View>
  )
});

export default FourthScreen;

FourthScreen.displayName = 'FourthScreen';


const styles = ScaledSheet.create({
  container: {flex:1, alignItems: "center", justifyContent: 'center'},
  wrapChoose: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: color.palette.lightGrey,
    paddingBottom: '12@s'},
  textBold: {
    fontSize: '24@s',
    fontWeight: '700',
    marginBottom: '40@s',
    marginTop: '12@s'
  },
  btn: {marginBottom: '26@s'}
});
