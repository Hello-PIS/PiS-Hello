import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import gradient from '../../assets/purple-bg.jpg';
import purple from '../../assets/gradient.png';
import Card from '../../components/Card';

export default function RegisterScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const navigation = useNavigation();

    const onRegisterPressed = () => {
        navigation.navigate('ConfirmEmail');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    return (
        <View style={styles.screenView}>
            <Image
                source={purple}
                style={StyleSheet.absoluteFillObject}
                blurRadius={100}
            />
            <ScrollView style={{width: '90%'}} contentContainerStyle={{alignItems: 'center'}}>
                <View style={{
                    width: '100%',
                    height: 150,
                }} >
                    <ImageBackground
                        source={purple}
                        resizeMode='stretch'
                        blurRadius={10}
                        style={{
                            flex: 1,
                            alignItems: 'center'
                        }}
                    >
                    <View style={{flex: 3}}/>
                    <Text style={styles.title}>Utwórz konto</Text>
                    <View style={{flex: 1}}/>
                    </ImageBackground>
                </View>
                <Card style={{width: '100%', overflow: 'hidden', padding: 20, alignItems: 'stretch', borderRadius: 30, marginVertical: 20, elevation: 10,}}>
                    <Image 
                        source={gradient}
                        style={{...StyleSheet.absoluteFillObject, resizeMode: 'stretch'}}
                        blurRadius={10}
                    />
                    <View style={styles.scrollView}>
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
                        <View style={styles.formRow}>
                            <Text style={styles.text}>Powtórz hasło</Text>
                            <Card style={styles.inputCard}>
                                <TextInput
                                    value={passwordRepeat}
                                    onChangeText={setPasswordRepeat}
                                    placeholder='Powtórz hasło...'
                                    style={styles.input}
                                    secureTextEntry={true}
                                />
                            </Card>
                        </View>
                        
                        <View style={{flexDirection: 'row', marginVertical: 15,}}>
                            <View style={{flex: 1}} />
                            <TouchableOpacity style={styles.signUpButton} onPress={onRegisterPressed} >
                                <Text style={styles.signUpText }>Zarejestruj</Text>
                            </TouchableOpacity>
                            <View style={{flex: 1}} />
                        </View>
                        
                        {/*
                        <CustomInput placeholder='Email' value={email} setValue={setEmail} />
                        */}
                    </View>
                </Card>
                <TouchableOpacity style={{margin: 5, alignItems: 'center'}} onPress={onSignInPressed}>
                    <Text style={{color: 'white'}}>Masz już konto? Zaloguj się</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
        
    );
};


const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    old_text: {
        color: 'gray',
        fontFamily: 'open-sans-bold',
        marginVertical: 15,
        textAlign: 'center',
    },
    inputCard: {
        flex: 1,
        paddingHorizontal: 5,
        margin: 10,
    },
    input: {
        fontFamily: 'open-sans',
        flex: 1,
        textAlign: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'open-sans-bold',
        color: 'white',
        textAlign: 'center',
    },
    signUpText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    signUpButton: {
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#4285F4',
    },
});