import React, { useCallback, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"
import { AppText } from "../../../components/app-text/AppText"
import { ScaledSheet } from "react-native-size-matters"
import { color } from "../../../theme"

interface Props{
  totalTime: number
  style?: ViewStyle | any
}

const MarketCountdown = React.memo(({ totalTime, style }: Props) => {
  const [time, setTime] = useState(totalTime);
  useEffect(() => {
    if(!totalTime) return
    const interval = setInterval(() => {
      setTime((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount <= 1 ? 0 : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [totalTime]);

  useEffect(() => {
    setTime(totalTime);
  }, [totalTime]);

  const getTimeLeft = useCallback(() => {
    return {
      seconds: String(time % 60).padStart(2, '0'),
      minutes: String(parseInt(String(time / 60), 10) % 60).padStart(2, '0'),
      hours: String(parseInt((time / 3600).toString(), 10)).padStart(2, '0'),
    };
  }, [time])

  const { seconds, minutes, hours } = getTimeLeft();

  return (
    <View style={[styles.container, style]}>
      <AppText value={`${hours} giờ : ${minutes} phút : ${seconds} giây`}/>
    </View>
  )
});

export default MarketCountdown;

const styles = ScaledSheet.create({
    container: {
      paddingVertical: '8@s',
      paddingHorizontal: '12@s',
      backgroundColor: color.palette.lighterGrey,
      borderRadius: '8@s',
    },
});
