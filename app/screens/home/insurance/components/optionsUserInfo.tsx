import React from 'react'
import { Pressable, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { BellSvg, LogoSvg, PhoneHomeSvg } from '../../../../assets/svgs'
import { CENTER_ELEMENTS, ROW } from '../../../../styles/common-style'
import { color } from '../../../../theme'
import { navigate } from "../../../../navigators"
import { ScreenNames } from "../../../../navigators/screen-names"

const OptionsUserInfo = () => {
	const isNotification = true
	return (
		<View style={ROW}>
			{/* <Pressable style={styles.buttonOption}> */}
			{/*	<LogoSvg /> */}
			{/* </Pressable> */}
			<Pressable style={styles.buttonOption} onPress={()=> navigate(ScreenNames.NOTICE)}>
				<View>
					<BellSvg />
				{
					isNotification && 	<View  style={styles.dot}/>
				}
				</View>
			</Pressable>
			{/* <Pressable style={styles.buttonOption}> */}
			{/*	<PhoneHomeSvg /> */}
			{/* </Pressable> */}
		</View>
	)
}
export default OptionsUserInfo

const styles = ScaledSheet.create({
	buttonOption: {
		backgroundColor: "rgba(255,255,255,0.1)",
		width: "34@s",
		height: "34@s",
		borderRadius: "17@s",
		marginLeft: "8@s",
		...CENTER_ELEMENTS
	},
	dot: {
		position: "absolute",
		top: "2@s",
		right: "5@s",
		width: "4@s",
		height: "4@s",
		borderRadius: "2@s",
		backgroundColor: color.palette.angry
	}
})
