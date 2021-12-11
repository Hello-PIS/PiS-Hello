import { SHA256 } from 'crypto-js';

import serverAddress from './serverAddress';

export const SIGN_IN = 'SIGN_IN';
export const REGISTER = 'REGISTER';
export const CHECK_LOGIN = 'CHECK_LOGIN';

export const signIn = (login, password) => {
    return async dispatch => {
        console.log('signing in...')

        const name = login;
        const password = SHA256(password).toString();

        // setTimeout(resolve, ms);
        // dispatch({ type: SIGN_IN, token: password.toString() });
        // return;
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
        console.log('response:');
        console.log(response);
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
        console.log('registering...');

        const name = login;
        const password = SHA256(password).toString();

        console.log(JSON.stringify({
            name,
            password
        }));

        // dispatch({ type: REGISTER, outcome: false });
        // return;
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
        console.log('response:');
        console.log(response);
        if(response.status == 201) {
            console.log(`Registration successful!`);
        } else if (response.status == 409) {
            console.log(`Request rejected. Wrong credentials. Try changing your login.`);
            const token = null;
        } else {
            console.log(`Request rejected for unknown reason.`);
            const token = null;
        }
        
        return response.status == 201 ? true : response.status == 409 ? false : null;
    }
};

export const checkLogin = (login) => {
    return async dispatch => {
        const response = await fetch(
            `http://${serverAddress.address}:8080/check_login?login=${login}`
        );
        console.log('response:');
        console.log(response);
        if(response.status == 200) {
            console.log(`Login available`);
        } else if (response.status == 409) {
            console.log(`Request rejected. User with this name already exists.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        return response.status == 200 ? true : response.status == 409 ? false : null;
    }
};