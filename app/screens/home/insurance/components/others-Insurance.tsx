import { View } from 'react-native'
import React, { FC, } from 'react'
import { images } from '../../../../assets/images'
import { ScaledSheet } from 'react-native-size-matters'
import { AppText } from '../../../../components/app-text/AppText'
import { color } from '../../../../theme'
import { fontFamily } from '../../../../constants/font-family'
import { ROW, MARGIN_TOP_16, MARGIN_BOTTOM_8, CENTER_ELEMENTS } from '../../../../styles/common-style'
import { FastImage } from '../../../../components/fast-image/fast-image'

const OthersInsurance: FC = () => {
	const othersInsurance = [
		{
			name: "hot selling",
			onPress: () => { },
			icon: images.home_hotSell,
			label: "Bán chạy",
			percent: "7%"
		},
		{
			name: "hot selling",
			onPress: () => { },
			icon: images.home_health,
			label: "Mát cắp",
			percent: "7%"
		}, {
			name: "hot selling",
			label: "",
			onPress: () => { },
			icon: images.home_thieves,
			percent: "7%"
		}, {
			name: "hot selling",
			onPress: () => { },
			icon: images.home_realEstate,
			percent: "7%"
		}, {
			name: "hot selling",
			onPress: () => { },
			icon: images.home_hotSell,
			percent: "7%"
		},
	]
	return (
		<>
			<AppText value={"Bảo hiểm khác"} style={styles.title} />
			<View style={[ROW, styles.container]}>
				{othersInsurance.map((insurance, index) => {
					const label = insurance.label || insurance.name
					return (
						<View key={index.toString()} style={[MARGIN_TOP_16, MARGIN_BOTTOM_8, CENTER_ELEMENTS, {width: "20%" }]}>
							<FastImage source={insurance.icon} style={styles.icon} />
							<AppText value={label} style={styles.nameText} />
							<AppText value={insurance.percent} style={styles.percentText} />
						</View>
					)
				})}
			</View>
		</>
	)
}

export default OthersInsurance

const styles = ScaledSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: color.background
	},
	icon: {
		width: "18@s",
		height: "18@s",
		marginBottom: "9@s"
	},
	nameText: {
		marginBottom: "4@s",
	},
	percentText: {
		color: color.palette.blue,
		fontFamily: fontFamily.semiBold
	},
	title: {
		marginTop: "16@s",
		marginBottom: "12@s",
		marginLeft: "16@s",
		fontFamily: fontFamily.semiBold,
		fontSize: "14@ms"
	}
})
