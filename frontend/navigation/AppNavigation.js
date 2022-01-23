import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from '../screens/login/SignInScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import GalleryScreen from '../screens/GalleryScreen';
import MyBusinessCardsScreen from '../screens/MyBusinessCardsScreen';
import SearchBusinessCardsScreen from '../screens/SearchBusinessCardsScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='MyBusinessCards' component={MyBusinessCardsScreen} />
                <Stack.Screen name='SearchBusinessCards' component={SearchBusinessCardsScreen} />
                <Stack.Screen name='Camera' component={CameraScreen} />
                <Stack.Screen name='Gallery' component={GalleryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
