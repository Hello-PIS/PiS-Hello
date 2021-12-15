import React, { useState } from "react";
import {Text} from 'react-native';
import * as Google from 'expo-google-app-auth';
import { useNavigation } from "@react-navigation/core";
import { Pressable } from "react-native";

// const navigation = useNavigation();

export default function SignInWithGoogle() {

    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const googleSignInHandler = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: '231972046751-amiv5o7fc2s0autel4o8f4g42v9lg33m.apps.googleusercontent.com',
            androidClientId: '231972046751-9o8civunle7cdrv6rr201ktepvodecan.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google.logInAsync(config)
        .then((result) => {
            const {type, user} = result;

            if(type == 'success') {
                const {email, name, photoUrl} = user;
                console.warn('Google SignIn successful');
                setTimeout(() => navigation.navigate('HomeScreen', {email, name, photoUrl}), 1000);
            } else {
                console.warn('Google SignIn was cancelled');
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.warn('An error occured. Check your network and try again!');
            setGoogleSubmitting(false);
        })

    };

    return (
        <Pressable
            disable={true}
            onPress={googleSignInHandler}
            style={{
                backgroundColor: '#4285f4',
                borderRadius: 5,
                justifyContent: 'center',
                padding: 10,
            }}
        >
            <Text style={{color: 'white'}}>Sign in with Google</Text>
        </Pressable>
    );

};