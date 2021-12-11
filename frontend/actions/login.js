import { SHA256 } from 'crypto-js';

import serverAddress from '../constants/serverAddress';

export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const signIn = (login, password) => {
    return async dispatch => {
        console.log('signing in...')

        const name = login;
        password = SHA256(password).toString();
        
        const response = await fetch(
            `http://${serverAddress.address}:8080/login`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password
                })
            }
        );
        console.log(`response status: ${response.status}`);
        let token = null;
        if(response.status == 200) {
            const respData = await response.json();
            token = respData.token;
            console.log(`Received token: ${token}`);
        } else if (response.status == 403) {
            console.log(`Request rejected. Wrong credentials.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        dispatch({ type: SIGN_IN, token: token });
    }
};

export const register = (login, password) => {
    return async dispatch => {
        console.log('registering...');

        const name = login;
        password = SHA256(password).toString();

        const response = await fetch(
            `http://${serverAddress.address}:8080/register`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password
                })
            }
        );
        console.log(`response status: ${response.status}`);
        if(response.status == 201) {
            console.log(`Registration successful!`);
        } else if (response.status == 409) {
            console.log(`Request rejected. Wrong credentials. Try changing your login.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        return response.status == 201 ? true : response.status == 409 ? false : null;
    }
};

export const checkLogin = (login) => {
    console.log(`checking login: ${login}`);
    return async dispatch => {
        const response = await fetch(
            `http://${serverAddress.address}:8080/check?name=${login}`
        );
        console.log(`response status: ${response.status}`);
        if(response.status == 200) {
            console.log(`Login available`);
        } else if (response.status == 409) {
            console.log(`User with this name already exists.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        return response.status == 200 ? true : response.status == 409 ? false : null;
    }
};