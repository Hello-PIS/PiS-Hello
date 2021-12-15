import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, Image, ActivityIndicator, StyleSheet } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useDispatch } from 'react-redux';

WebBrowser.maybeCompleteAuthSession();

async function fetchUserInfo(token) {
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  return await response.json();
}

export default function GoogleSignInButton (props) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '383627229131-468hbi76c2hb3rtc58ftg2ekfhlbkg1o.apps.googleusercontent.com',
    scopes: ['email', 'profile']
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (response == null)
      return;
    if (response.type === 'success') {
      const { authentication: { accessToken } } = response;
      dispatch(loginActions.getCredentialsFromGoogle(accessToken));
    }
  }, [response]);

  return (
    <TouchableOpacity {...props} style={{
        ...styles.container,
        opacity: props.disabled ? 0.5 : 1,
        backgroundColor: props.backgroundColor,
        }}
        onPress={() => {
          promptAsync();
          }}
    >
    {props.loading ?
        <ActivityIndicator size={'small'} color={color} /> :
        <View style={{ alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-start' }}>
            <Image style={styles.logo} source={require('../assets/google-logo.png')} />
            <View style={{width: 24}} />
            <Text style={{...styles.label }}>{props.children}</Text>
            <View style={{width: 16}} />
        </View>}
    </TouchableOpacity>
)
}

GoogleSignInButton.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
}

GoogleSignInButton.defaultProps = {
  color: 'black',
  backgroundColor: 'white', //'#4285F4',
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  logo: {
    width: 18,
    height: 18,
  },
  label: {
    fontSize: 14,
    fontFamily: 'roboto-medium',
  },
});