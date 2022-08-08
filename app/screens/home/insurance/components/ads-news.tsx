import Carousel from 'react-native-snap-carousel';
import React, { useState } from 'react'
import { View } from 'react-native'
import { ms, s, ScaledSheet } from 'react-native-size-matters'
import { AppText } from '../../../../components/app-text/AppText'
import { FastImage } from '../../../../components/fast-image/fast-image'
import { fontFamily } from '../../../../constants/font-family'
import { FONT_MEDIUM_12 } from '../../../../styles/common-style'
import { width } from '../../../../constants/variable';

const data = [
	{
		title: "FINA ra mắt tính năng mới trên ứng dụng Appstore",
		image: "https://storage.googleapis.com/crm-example/upload/beta-fina/Post_6_1652848908692.jpg"
	}, {
		title: "FINA ra mắt tính năng mới trên ứng dụng Appstore",
		image: "https://storage.googleapis.com/crm-example/upload/beta-fina/Post_6_1652848908692.jpg"
	}, {
		title: "FINA ra mắt tính năng mới trên ứng dụng Appstore",
		image: "https://storage.googleapis.com/crm-example/upload/beta-fina/Post_6_1652848908692.jpg"
	}, {
		title: "FINA ra mắt tính năng mới trên ứng dụng Appstore",
		image: "https://storage.googleapis.com/crm-example/upload/beta-fina/Post_6_1652848908692.jpg"
	}, {
		title: "FINA ra mắt tính năng mới trên ứng dụng Appstore",
		image: "https://storage.googleapis.com/crm-example/upload/beta-fina/Post_6_1652848908692.jpg"
	},
]
const _renderItem = ({ item }) => {
	console.log(item)
	return (
		<View style={styles.item}>
			<FastImage source={{ uri: item.image }} style={styles.image} />
			<AppText value={item.title} style={[FONT_MEDIUM_12, { lineHeight: 14 }]} />
		</View>
	)
}
const AdsNews = () => {
	const [activeItem, setActiveItem]= useState()
	return (
		<View style={styles.container}>
			<AppText value={"Tin tức, Khuyến mãi"} style={styles.title} />
			<Carousel
				key={(e, i)=> i.toString()}
				horizontal
				data={data}
        sliderWidth={width}
        itemWidth={width - ms(215)}
        inactiveSlideScale={2}
        activeSlideAlignment={"start"}
				showsHorizontalScrollIndicator={false}
				renderItem={_renderItem}
				snapToItem={setActiveItem}
				style={styles.scrollView}>
			</Carousel>
		</View>
	)
}

export default AdsNews

const styles = ScaledSheet.create({
	container: {
		marginHorizontal: "16@s",
	},
	title: {
		marginTop: "16@s",
		marginBottom: "12@s",
		fontFamily: fontFamily.bold,
		fontSize: "14@ms"
	},
	scrollView: {
	},
	image: {
		height: "80@s",
		borderRadius: "8@s",
		marginBottom: "12@s",
	},
	item: {
		width: "144@s",
	}
})
