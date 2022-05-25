import React from 'react';
import { View, TouchableOpacity, TextInput } from "react-native"
import { SearchNormalSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { ScaledSheet } from "react-native-size-matters"

interface Props{
  onPress?(): void
  onChangeText(e: string): void
  placeholder?: string
}

const SearchBar = React.memo(({ onChangeText, onPress, placeholder = 'Bạn đang tìm gì' }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <SearchNormalSvg />
      </TouchableOpacity>
      <TextInput onChangeText={onChangeText} style={styles.input} placeholder={placeholder}/>
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
