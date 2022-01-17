import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

export default function CameraScreen({ route }) {
  const navigation = useNavigation();
  const token = useSelector((state) => state.login.token);

  const { setImageUri } = route.params;
  const { height, width } = Dimensions.get('window');
  const screenRatio = height / width;
  
  const [camera, setCamera] = useState(null);
  const [hasPermission, setPermission] = useState(null);
  const [cameraMargin, setCameraMargin] = useState(0);
  const [ratio, setRatio] = useState(null);

  const setCameraReady = async() => {
  if (ratio === null) {
          await prepareRatio();
      }
  };

  const prepareRatio = async() => {
    // This issue only affects Android
    if (Platform.OS === 'android') {
      const ratios = await camera.getSupportedRatiosAsync();

      // Calculate the width/height of each of the supported camera ratios
      // These width/height are measured in landscape mode
      // find the ratio that is closest to the screen ratio without going over
      let distances = {};
      let realRatios = {};
      let minDistance = null;
      for (const ratio of ratios) {
        const parts = ratio.split(':');
        const realRatio = parseInt(parts[0]) / parseInt(parts[1]);
        realRatios[ratio] = realRatio;
        // ratio can't be taller than screen, so we don't want an abs()
        const distance = screenRatio - realRatio; 
        distances[ratio] = realRatio;
        if (minDistance == null) {
            minDistance = ratio;
        } else {
          if (distance >= 0 && distance < distances[minDistance]) {
            minDistance = ratio;
          }
        }
      }
      // set the best match
      const desiredRatio = minDistance;
      //  calculate the difference between the camera width and the screen height
      const remainder = Math.floor( (height - realRatios[desiredRatio] * width) / 2 );
      // set the preview padding and preview ratio
      setCameraMargin(remainder);
      setRatio(desiredRatio);
    }
  };

  const takePhoto = async() => {
      if (camera) {
          const photo = await camera.takePictureAsync();
          setImageUri(photo.uri);
          navigation.goBack();
      }
  };

  useEffect(() => {
    (async() => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted')
            Alert.alert(
                'Brak uprawnień do obsługi aparatu',
                'Aby skorzystać z tej funkcji, musisz nadać aplikacji uprawnienia do używania aparatu.',
                [{text: 'Rozumiem'}]
            );
        setPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>No access to camera</Text>
    </View>;
  }

  return (
    <View style={{...styles.imagePicker, paddingVertical: cameraMargin }}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onCameraReady={setCameraReady}
        ratio={ratio}
        ref={ref => {
          setCamera(ref);
        }}
      >
        <View style={styles.cameraView}>
            
        </View>
      </Camera>
      <View style={styles.cameraView}>
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0)',
        }}>
          <TouchableOpacity
            onPress={ navigation.goBack }
            style={styles.backButton}>
            <AntDesign name='back' size={30} color='#fff' />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={ takePhoto }
          style={styles.cameraButton}>
          <AntDesign name='camera' size={30} color='#fff' />
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButton: {
    flex: 1,
    width: 50,
    height: 50,
    padding: 10,
    margin: 10,
    borderRadius: 100,
    backgroundColor: '#9932CC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  backButton: {
    padding: 10,
    margin: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  imagePicker: {
    //alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  cameraView: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  camera: {
    flex: 1,
    // width: '100%',
  },
});