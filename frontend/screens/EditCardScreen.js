import React, {useDebugValue, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, useWindowDimensions, ScrollView, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { CommonActions, useNavigation, useRoute} from '@react-navigation/core';
import Card from '../components/Card';
import OverscreenModal from '../components/OverscreenModal';
import LoadingScreenModal from '../components/LoadingScreenModal';
import backgroundImage from '../assets/purple-bg.jpg';
import purple from '../assets/gradient.png';
import { useDispatch, useSelector } from 'react-redux';
import { logInAsync } from 'expo-google-app-auth';
import * as authActions from '../actions/edit';

export default function EditCardScreen({ route, navigation }) {

    const [company, setCompany] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [failureModalVisible, setFailureModalVisible] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const editResponse = useSelector((state) => state.edit.editResponseTimestamp);
    const editOutcome = useSelector((state) => state.edit.editOutcome);

    const dispatch = useDispatch();
    const {itemData } = route.params;
    const photoId = itemData.id
    
    useEffect(() => {
        setWaitingForResponse(false);
        if (editResponse == null)
            return;
        if (editOutcome == null)
            return;
        if (editOutcome == true)
        {
            dispatch(authActions.editFinished());
            navigation.navigate('HomeScreen');
        }
        else
            setFailureModalVisible(true);
    }, [editResponse]);


    const onChangeDataPressed = async () => {
        setWaitingForResponse(true);

        dispatch(authActions.editCardData(photoId, company, name, phone, email));
    }

    const onReturnPressed = () => {
        navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.screenView}>
            <Image 
            source={purple}
            style={StyleSheet.absoluteFillObject}
            blurRadius={100}
            />
            <Card style={styles.mainCard}>
                <Image
                    source={backgroundImage}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={10}
                />
                <View style={styles.formRow}>
                    <Text style={styles.text}>Firma</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={company}
                            onChangeText={setCompany}
                            placeholder={itemData.company}
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.text}>Imię i nazwisko</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder={itemData.name}
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.text}>Telefon</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={phone}
                            onChangeText={setPhone}
                            placeholder={itemData.phone}
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.text}>Email</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder={itemData.email}
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <TouchableOpacity style={styles.signInButton} onPress={onChangeDataPressed} >
                        <Text style={styles.signInText }>Wprowadź zmiany</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.signInButton} onPress={onReturnPressed} >
                        <Text style={styles.signInText }>Powrót</Text>
                    </TouchableOpacity>
                </View>
            </Card>

            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Edytowanie danych nie powiodło się"}
                message={"Serwer odrzucił próbę edycji."}
                buttonType={'reload1'}
                buttonColor={'#9932CC'}
                onClick={ () => setFailureModalVisible(false) }
                amIVisible={failureModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    mainCard: {
        width: '100%',
        overflow: 'hidden',
        padding: 15,
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 20,
        elevation: 10,
    },
    formRow: {
        height: 90,
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    inputCard: {
        flex: 1,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        fontFamily: 'open-sans',
        flex: 1,
        textAlign: 'center',
    },
    signInButton: {
        margin: 0,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#4285F4',
    },
    signInText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    }

});