import React from 'react';
import { View, TouchableOpacity, TextInput } from "react-native"
import { SearchNormalSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  onPress(): void
}

const SearchBar = React.memo(({ onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <SearchNormalSvg />
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder={'Bạn đang tìm gì?'}/>
    </View>
  )
});

export default SearchBar;

const styles = ScaledSheet.create({
    container: {
      borderRadius: '16@s',
      flexDirection: 'row',
      backgroundColor: color.background,
      padding: '8@ms'
    },
  input:{
      flex: 1,
    marginLeft: '16@ms'
  }
});
