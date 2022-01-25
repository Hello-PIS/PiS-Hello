import React, {useDebugValue, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, useWindowDimensions, ScrollView, ImageBackground, Pressable, TouchableOpacity, Button } from 'react-native';
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
    const [category, setCategory] = useState('');
    const [mode, setMode] = useState('');

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

        dispatch(authActions.editCardData(photoId, company, name, phone, email, category, mode));
    }

    const onReturnPressed = () => {
        navigation.navigate('HomeScreen');
    }

    function onChangeModePressed () {
        if (mode == 'PRIVATE') {
            setMode('PUBLIC')
        }
        else{
            setMode('PRIVATE')
        }
    }

    
    return (
        <View style={styles.screenView}>
            <Image 
            source={purple}
            style={StyleSheet.absoluteFillObject}
            blurRadius={100}
            />
            <Card style={styles.mainCard}>

                <View style={styles.formRow}>
                    <Text style={styles.text}>Widoczność</Text>
                    <TouchableOpacity style={styles.changeButton} onPress={onChangeModePressed} >
                        <Text style={styles.changeText }>{mode}</Text>
                    </TouchableOpacity>
                </View>

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
                    <Text style={styles.text}>Kategoria</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={category}
                            onChangeText={setCategory}
                            placeholder={itemData.category}
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
                <View style={{flexDirection: 'row', marginVertical: 15,}}>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.signInButton} onPress={onChangeDataPressed} >
                        <Text style={styles.signInText }>Wprowadź zmiany</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.signInButton} onPress={onReturnPressed} >
                        <Text style={styles.signInText }>Powrót</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
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
        height: 80,
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginVertical: 5,
        
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
        backgroundColor: '#E6E6FA',
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
        backgroundColor: '#8e56c2',
    },
    changeButton: {
        margin: 0,
        height: 35,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#E6E6FA',
    },
    signInText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },

    changeText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
    }

});