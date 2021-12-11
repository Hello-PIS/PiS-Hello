import { SHA256 } from 'crypto-js';

import serverAddress from './serverAddress';

export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const signIn = (login, password) => {
    return async dispatch => {
        console.log(`password: ${password}`);
        password = SHA256(password);
        console.log(`hash: ${password}`);
        setTimeout(resolve, ms);
        dispatch({ type: SIGN_IN, token: password.toString() });
        return;
        const response = await fetch(
            `http://${serverAddress.address}:8080/login?login=${login}?password=${password}`,
            {
                method: 'PUT'
            }
        );

        if(response.status == 200) {
            const respData = await response.json();
            const token = respData.token;
            console.log(`Received token: ${token}`);
        } else if (response.status == 403) {
            console.log(`Request rejected. Wrong credentials.`);
            const token = null;
        } else {
            console.log(`Request rejected for unknown reason.`);
            const token = null;
        }
        
        dispatch({ type: SIGN_IN, token: token });
    }
};

export const register = (login, password) => {
    return async dispatch => {
        console.log('Registering');
        console.log(`password: ${password}`);
        password = SHA256(password);
        console.log(`hash: ${password}`);

        dispatch({ type: REGISTER, outcome: false });
        return;
        const response = await fetch(
            `http://${serverAddress.address}:8080/login?login=${login}?password=${password}`,
            {
                method: 'PUT'
            }
        );

        if(response.status == 200) {
            console.log(`Registration successful!`);
        } else if (response.status == 403) {
            console.log(`Request rejected. Wrong credentials. Try changing your login.`);
            const token = null;
        } else {
            console.log(`Request rejected for unknown reason.`);
            const token = null;
        }
        
        dispatch({ type: REGISTER, outcome: response.status == 200 ? true : false });
    }
};

export const checkLogin = (login) => {
    return async dispatch => {
        dispatch({ type: CHECK_LOGIN, outcome: false });
        return;
        const response = await fetch(
            `http://${serverAddress.address}:8080/check_login?login=${login}`,
            {
                method: 'PUT'
            }
        );

        if(response.status == 200) {
            console.log(`Login available`);
        } else if (response.status == 409) {
            console.log(`Request rejected. User already exists.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        dispatch({ type: CHECK_LOGIN, outcome: response.status == 200 ? true : false });
    }
};