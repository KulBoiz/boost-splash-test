import React, { useState } from "react"
import { View } from 'react-native';
import {ScaledSheet} from 'react-native-size-matters'
import { AppText } from "../../components/app-text/AppText"
import { color } from "../../theme"
import { FourthSvg } from "../../assets/svgs"
import WelcomeButton from "./components/WelcomeButton"
import { width } from "../../constants/variable"
import { TxKeyPath } from "../../i18n"

interface Props{}

const CHOOSE = [
  {value: 'welcome.loan' as TxKeyPath} ,
  {value: 'welcome.insurance' as TxKeyPath},
  {value: 'welcome.realEstate' as TxKeyPath},
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
        <AppText tx={'welcome.selection'}/>
        <AppText value={` ${selected.length}/3`}/>
      </View>
      <AppText tx={'welcome.interested'} style={styles.textBold}/>
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
