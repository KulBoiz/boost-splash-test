import React from 'react';
import { View, TouchableOpacity, TextInput, ViewStyle } from "react-native"
import { SearchNormalSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { s, ScaledSheet } from "react-native-size-matters"
import { debounce } from "lodash"
import { isAndroid } from "../../constants/variable"

interface Props{
  onPress?(): void
  placeholder?: string
  onChangeSearchText?: any
  style?: ViewStyle | any
}

const SearchBar = React.memo(({ style, onPress, placeholder = 'Tìm kiếm', onChangeSearchText }: Props) => {
  const _handleChangeText = (value) => {
    onChangeSearchText(value)
  };

  const _search = debounce(_handleChangeText, 500);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={onPress}>
          <SearchNormalSvg width={s(18)} height={s(18)}/>
        </TouchableOpacity>
        <TextInput onChangeText={_search} style={styles.input} placeholder={placeholder} onSubmitEditing={onPress}/>
      </View>
    </View>
  )
});

export default SearchBar;

const styles = ScaledSheet.create({
  container: {
    paddingHorizontal: '16@s',
    paddingVertical: '8@s'
  },
  searchContainer: {
      flexDirection: 'row',
      backgroundColor: color.palette.lightBlue,
      paddingVertical: isAndroid ? '4@ms' :  '12@ms',
      paddingHorizontal: '16@ms',
      alignItems: "center",
      borderRadius: '8@s'
    },
  input:{
      flex: 1,
    marginLeft: '16@ms'
  }
});
