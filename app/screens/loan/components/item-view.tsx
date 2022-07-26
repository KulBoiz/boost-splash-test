import React from 'react';
import { TextStyle, View, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import i18n from "i18n-js"

interface Props {
  style?: ViewStyle | any
  title: string
  content: string | JSX.Element
  titleStyle?: TextStyle | any
  contentStyle?: TextStyle | any
}

const ItemView = React.memo((props: Props) => {
  const { title, content, style, titleStyle, contentStyle } = props
  const isString = (typeof content === 'string' || 'number')
  const checkTranslation = i18n.t(title).includes('missing')
  return (
    <View style={[styles.container, style]}>
      <AppText value={checkTranslation ? title : i18n.t(title)} style={[styles.title, titleStyle]} />
      {isString ?
        <AppText style={[styles.content, contentStyle]}>
          {content}
        </AppText>
        :
        content
      }
    </View>
  )
});

export default ItemView;
ItemView.displayName = 'ItemView'

const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: '12@ms',
    color: '#AAADB7'
  },
  content: {
    color: '#000',
    fontSize: '12@ms',
  }
});
