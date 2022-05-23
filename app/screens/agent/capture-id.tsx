import React, { useCallback, useRef, useState } from "react"
import { Platform, View } from "react-native"
import { Camera, useCameraDevices, PhotoFile } from "react-native-vision-camera"
import AppHeader from "../../components/app-header/AppHeader"
import { s, ScaledSheet, vs } from "react-native-size-matters"
import RenderStepAgent from "./components/render-step"
import ImageTutorialItem from "./components/image-tutorial-item"
import { images } from "../../assets/images"
import { AppText } from "../../components/app-text/AppText"
import AppButton from "../../components/app-button/AppButton"
import ActionItem from "./components/action-item"
import { CaptureFrameSvg, ThunderSvg } from "../../assets/svgs"
import { color } from "../../theme"
import { height, width } from "../../constants/variable"
import PreviewModal from "./components/preview-modal"

interface Props{}

const CaptureId = React.memo((props: Props) => {
  const camera = useRef<Camera>(null)
  const [preview, setPreview] = React.useState(false);
  const [front, setFront] = React.useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const devices = useCameraDevices()
  const device = devices.back

  // React.useEffect(() => {
  //   (async () => {
  //     const cameraPermission = await Camera.getCameraPermissionStatus();
  //     if (cameraPermission === 'not-determined') {
  //       await Camera.requestCameraPermission();
  //     }
  //     setHasPermission(cameraPermission === 'authorized');
  //   })();
  // }, []);
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const onFlashPressed = useCallback(async () => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);


  const takePhoto = useCallback(async ()=> {
    // @ts-ignore
      const data = await camera.current.takePhoto({
        skipMetadata: true
      });
    let filePath = data.path;
    if (Platform.OS === 'android') {
      filePath = `file://${filePath}`;
    }
      setFront(filePath)
      setPreview(true)
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
        hasPermission ? (
          <Camera
            style={styles.camera}
            ref={camera}
            device={device}
            isActive={true}
            photo={true}
            torch={flash}

          />)
        : <View style={styles.camera} />
        }
      <View style={styles.wrapFrame}>
        <CaptureFrameSvg width={width}/>
      </View>
      <View style={styles.wrapAction}>
        <ActionItem onPress={onFlashPressed} icon={<ThunderSvg />} text={'Bật đèn flash'} />
        <AppText value={'|'} color={color.text} fontSize={s(20)}/>
        <ActionItem onPress={onFlashPressed} icon={<ThunderSvg />} text={'Thư viện ảnh'} />
      </View>

      <View style={styles.btnContainer}>
        <AppButton title={'Chụp'} onPress={takePhoto}/>
      </View>
      <PreviewModal visible={preview} image={front} closeModal={()=> setPreview(false)}/>
    </View>
  )
});

export default CaptureId;

const styles = ScaledSheet.create({
    container: {
      flex:1,
      backgroundColor: 'rgba(122, 123, 120, 0.5)',
    },
  stepContainer: {
    backgroundColor: 'transparent'
  },
  camera :{
      flex: 1,
    marginVertical: '20@s'
  },
  wrapFrame: {
    position: "absolute",
    marginVertical: height / 2 - vs(40),
    alignItems: "center", justifyContent: 'center',
    width: width,
  },
  idContainer: {
      flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: '16@ms'
  },
  wrapAction: {
      backgroundColor: '#080706',
    marginHorizontal: '16@ms',
    borderRadius: '16@s',
      paddingVertical: '20@s',
      flexDirection: 'row',
    justifyContent: "space-evenly"
  },
  btnContainer: {
      paddingVertical: '24@s',
    paddingHorizontal: '16@ms'
  }
});
