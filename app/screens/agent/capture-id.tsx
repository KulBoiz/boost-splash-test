import React, { useCallback, useRef, useState } from "react"
import { View } from 'react-native';
import { Camera, useCameraDevices, PhotoFile } from "react-native-vision-camera"
import AppHeader from "../../components/app-header/AppHeader"
import { ScaledSheet } from "react-native-size-matters"
import RenderStepAgent from "./components/render-step"
import ImageTutorialItem from "./components/image-tutorial-item"
import { images } from "../../assets/images"
import { AppText } from "../../components/app-text/AppText"
import AppButton from "../../components/app-button/AppButton"

interface Props{}

const CaptureId = React.memo((props: Props) => {
  const camera = useRef<Camera>(null)
  const [hasPermission, setHasPermission] = React.useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const devices = useCameraDevices()
  const device = devices.back

  React.useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'not-determined') {
        await Camera.requestCameraPermission();
      }
      setHasPermission(cameraPermission === 'authorized');
    })();
  }, []);

  const onFlashPressed = useCallback(async () => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);


  const takePhoto = useCallback(async ()=> {
    // @ts-ignore
      const data = await camera.current.takePhoto({
        enableAutoStabilization: true,
      });
      console.log(data);
  },[])

  return (
    <View style={styles.container}>
      <AppHeader isBlue headerText={'Chụp ảnh CMND / CCCD / HC'}/>
      <RenderStepAgent currentPosition={1} style={styles.stepContainer}/>
      <View style={styles.idContainer}>
        <ImageTutorialItem image={images.id_front} type={'big'} text={'Mặt trước'}/>
        <ImageTutorialItem image={images.id_back} type={'big'} text={'Mặt sau'}/>
      </View>

      {device != null &&
        hasPermission && (
          <Camera
            style={styles.camera}
            ref={camera}
            device={device}
            isActive={true}
            photo={true}
            torch={flash}
          />
        )}
      <View style={styles.wrapAction}>
        <AppText value={'Bật đèn flash'} onPress={onFlashPressed}/>
        <AppText value={'Thư viện ảnh'}/>
      </View>
      <View style={styles.btnContainer}>
        <AppButton title={'Chup'} onPress={takePhoto}/>

      </View>
    </View>
  )
});

export default CaptureId;

const styles = ScaledSheet.create({
    container: {
      flex:1,
      backgroundColor: 'transparent'
    },
  stepContainer: {
    backgroundColor: 'transparent'
  },
  camera :{
      flex: 1
  },
  idContainer: {
      flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: '16@ms'
  },
  wrapAction: {
      paddingVertical: '20@s',
      flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  btnContainer: {
      paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  }
});
