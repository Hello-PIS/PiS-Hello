import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from "@expo/vector-icons";
import LoadingScreenModal from "../components/LoadingScreenModal";
import OverscreenModal from "../components/OverscreenModal";
import * as businessCardsActions from "../actions/businessCards";

export default function GalleryScreen() {
  const navigation = useNavigation();
  // const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const sendPhotoOutcome = useSelector((state) => state.businessCards.addCardOutcome);
  const sendPhotoTimestamp = useSelector((state) => state.businessCards.addCardResponseTimestamp);

  const dispatch = useDispatch();

  const [hasPermission, setPermission] = useState(null);
  const [picture, setPicture] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setPicture(result);
    } else {
      setPicture(null);
      navigation.goBack();
    }
  };

  const sendPhoto = async() => {
    setWaitingForResponse(true);
    dispatch(businessCardsActions.addBusinessCard(picture, username));
  }

  useEffect(() => {
    if (waitingForResponse === true) {
      if (sendPhotoOutcome === true)
        setSuccessModalVisible(true);
      if (sendPhotoOutcome === false)
        setFailureModalVisible(true);
    }
    setWaitingForResponse(false);

  }, [sendPhotoTimestamp])


  useEffect(() => {
    (async() => {
      // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Brak uprawnień do obsługi aparatu',
          'Aby skorzystać z tej funkcji, musisz nadać aplikacji uprawnienia do używania aparatu.',
          [{text: 'Rozumiem',
            onPress: () => navigation.goBack(),
          }]
        );
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  
  if (picture === null) {
    pickImage();
    return <View />
  }
  else
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Image style={{flex: 1}} resizeMode='contain' source={{uri: picture.uri}} />
        <View style={{height: 80, width: '100%', position: 'absolute', bottom: 0, flexDirection: 'row'}}>
          <View style={{flex: 1}} />
          <TouchableOpacity
              onPress={ () => { setPicture(null); navigation.goBack();} }
              style={{...styles.backButton, backgroundColor: 'rgba(255,0,0,0.8)'}}>
            <AntDesign name='back' size={40} color='#fff' />
          </TouchableOpacity>
          <View style={{flex: 1}} />
          <TouchableOpacity
              onPress={ sendPhoto }
              style={{...styles.backButton, backgroundColor: 'rgba(0,255,0,0.8)'}}>
            <AntDesign name='check' size={40} color='#fff' />
          </TouchableOpacity>
          <View style={{flex: 1}} />
        </View>

        <LoadingScreenModal amIVisible={waitingForResponse} />

        <OverscreenModal
            title={"Gotowe!"}
            message={"Zdjęcie zostało pomyślnie przesłane."}
            buttonType='check'
            onClick={() => {
              setSuccessModalVisible(false);
              setPicture(null);
              navigation.navigate('HomeScreen');
            }}
            amIVisible={successModalVisible}
        />

        <OverscreenModal
            title={"Wystąpił błąd!"}
            message={"Nie udało się przesłać zdjęcia. Spróbuj ponownie."}
            buttonType='back'
            onClick={() => setFailureModalVisible(false)}
            amIVisible={failureModalVisible}
        />

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
    backgroundColor: 'rgba(44,47,51,0.25)',
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
  },
});