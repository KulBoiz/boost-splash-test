import React from 'react';
import { View, TouchableOpacity, TextInput } from "react-native"
import { SearchNormalSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"
import { debounce } from "lodash"

interface Props{
  onPress?(): void
  placeholder?: string
}

const SearchBar = React.memo(({ onChangeText, onPress, placeholder = 'Tìm kiếm' }: Props) => {
  const _handleChangeText = (value) => {
    console.log(value)
  };

  const _search = debounce(_handleChangeText, 500);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <SearchNormalSvg />
      </TouchableOpacity>
      <TextInput onChangeText={_search} style={styles.input} placeholder={placeholder} onSubmitEditing={onPress}/>
    </View>
  )
});

export default SearchBar;

const styles = ScaledSheet.create({
    container: {
      borderRadius: '16@s',
      flexDirection: 'row',
      backgroundColor: 'rgba(186, 186, 186, 0.1)',
      paddingVertical: '8@ms',
      paddingHorizontal: '16@ms',
      borderWidth: 1,
      borderColor: color.palette.BABABA
    },
  input:{
      flex: 1,
    marginLeft: '16@ms'
  }
});
