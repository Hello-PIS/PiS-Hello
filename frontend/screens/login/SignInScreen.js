import React, {useDebugValue, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, useWindowDimensions, ScrollView, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import GoogleSignInButton from '../../components/GoogleSignInButton';
//import GoogleButton from 'react-google-button'
//import SignInWithGoogle from '../../components/SignInWithGoogle';
import { useNavigation } from '@react-navigation/core';
import Card from '../../components/Card';
import OverscreenModal from '../../components/OverscreenModal';
import LoadingScreenModal from '../../components/LoadingScreenModal';
import backgroundImage from '../../assets/purple-bg.jpg';
import purple from '../../assets/gradient.png';
import { useDispatch, useSelector } from 'react-redux';
import { logInAsync } from 'expo-google-app-auth';
import * as loginActions from '../../actions/login';

export default function SignInScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failureModalVisible, setFailureModalVisible] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const token = useSelector((state) => state.login.token);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        if (token != null)
            navigation.navigate('HomeScreen');
        else
            setFailureModalVisible(true);
    }, [token]);

    const onSignInPressed = async () => {
        setWaitingForResponse(true);
        dispatch(loginActions.signIn(username, password));
        setWaitingForResponse(false);
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }

    const onRegisterPressed = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.screenView}>
            <Image 
            source={purple}
            style={{...StyleSheet.absoluteFillObject}}
            blurRadius={100}
            />
            <Card style={styles.mainCard}>
                <Image
                    source={backgroundImage}
                    style={{...StyleSheet.absoluteFillObject}}
                    blurRadius={10}
                />
                <View style={styles.formRow}>
                    <Text style={styles.text}>Login</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder='Wprowadź nazwę użytkownika...'
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.text}>Hasło</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Wprowadź hasło...'
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </Card>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 15,}}>
                    <View style={{flex: 1}} />
                    <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.signInButton} onPress={onSignInPressed} >
                        <Text style={styles.signInText }>Zaloguj</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                </View>
            </Card>

            <TouchableOpacity style={{margin: 5}} onPress={onForgotPasswordPressed}>
                <Text style={{color: 'white'}}>Zapomniałeś hasła?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{margin: 5}} onPress={onRegisterPressed}>
                <Text style={{color: 'white'}}>Nie masz konta? Zarejestruj się</Text>
            </TouchableOpacity>
            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Logowanie nie powiodło się"}
                message={"Serwer odrzucił próbę logowania. Sprawdź, czy wprowadzone hasło na pewno jest prawidłowe."}
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