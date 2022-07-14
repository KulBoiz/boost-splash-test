import React, { useEffect, useState } from "react"
import { View } from 'react-native';
import { s, ScaledSheet } from "react-native-size-matters";
import { AppText } from "../../../components/app-text/AppText"
import { ALIGN_CENTER, ROW } from "../../../styles/common-style"
import { fontFamily } from "../../../constants/font-family"
import { color } from "../../../theme";

interface Props{
  totalTime: any
  callback?(): void
}

const RenderTime = ({time, label}: {time: string, label :string}) => {
  return (
    <View style={ALIGN_CENTER}>
      <View style={styles.timeContainer}>
        <AppText  value={time} style={styles.timeText}/>
      </View>
      <AppText value={label} fontSize={s(10)}/>
    </View>
  )
}
const SeparateTime = () => {
  return (
    <View style={{marginHorizontal: 5, paddingTop: 10}}>
      <AppText value={':'}/>
    </View>
  )
}
const Countdown = React.memo(({ totalTime, callback }: Props) => {
  const [time, setTime] = useState(totalTime);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount <= 1 ? 0 : lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTime(totalTime);
  }, [totalTime]);

  useEffect(() => {
    if (time === 0) {
      if (callback) {
        callback()
      }
    }
  }, [time]);

  const getTimeLeft = () => {
    return {
      seconds: String(time % 60).padStart(2, '0'),
      minutes: String(parseInt(String(time / 60), 10) % 60).padStart(2, '0'),
      hours: String(parseInt(String((time % (3600 * 24)) / 3600), 10)).padStart(2, '0'),
      days: String(parseInt(String(time / (3600 * 24)), 10)).padStart(2, '0'),
    };
  };

  const renderDate = () => {
    const { seconds, minutes, hours, days } = getTimeLeft();
    return(
      <View style={ROW}>
        <RenderTime time={days} label={'Ngày'} />
        <SeparateTime />
        <RenderTime time={hours} label={'Giờ'} />
        <SeparateTime />
        <RenderTime time={minutes} label={'Phút'} />
        <SeparateTime />
        <RenderTime time={seconds} label={'Giây'} />

      </View>
    )
  }
  return (
    <View style={styles.container}>
      {renderDate()}
    </View>
  )
});

export default Countdown;

const styles = ScaledSheet.create({
    container: {},
  timeContainer: {
    width: '32@s',
    height: '32@s',
    backgroundColor: color.background,
    borderRadius: '4@s',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: '4@s'
  },
  timeText: {
      fontSize: '14@s',
    fontFamily: fontFamily.bold
  }
});
