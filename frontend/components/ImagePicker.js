import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Button, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const ImgPicker = props => {
    const { height, width } = Dimensions.get('window');
    const screenRatio = height / width;
    
    const [camera, setCamera] = useState(null);
    const [isRatioSet, setIsRatioSet] = useState(false);
    const [hasPermission, setPermission] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [cameraMargin, setCameraMargin] = useState(0);
    const [ratio, setRatio] = useState(null);

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

    const setCameraReady = async() => {
    if (!isRatioSet) {
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
        desiredRatio = minDistance;
        //  calculate the difference between the camera width and the screen height
        const remainder = Math.floor(
        (height - realRatios[desiredRatio] * width) / 2
        );
        // set the preview padding and preview ratio
        setCameraMargin(remainder);
        setRatio(desiredRatio);
        // Set a flag so we don't do this 
        // calculation each time the screen refreshes
        setIsRatioSet(true);
    }
    };

    const takePhoto = async() => {
        if (camera) {
            const photo = await camera.takePictureAsync();
            setPhoto(photo);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text>No access to camera</Text>
        </View>;
    }
    return <View style={{...styles.imagePicker, paddingVertical: cameraMargin }}>
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
                <TouchableOpacity
                    style={{
                        flex: 1,
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={takePhoto}
                >
                    <Text style={styles.textTakePhoto}>Zrób zdjęcie</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    </View>
};

const styles = StyleSheet.create({
    imagePicker: {
        //alignItems: 'center',
        backgroundColor: 'black',
        flex: 1,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },
    camera: {
        flex: 1,
        // width: '100%',
    },
    cameraView: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    textTakePhoto: {
        color: 'white',
        fontSize: 20,
    }
});

export default ImgPicker;