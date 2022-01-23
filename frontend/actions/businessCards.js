import { SHA256 } from 'crypto-js';

import serverAddress from '../constants/serverAddress';

export const ADD_CARD = 'ADD_CARD';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 10000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

export const addBusinessCard = (photo, ownerName) => {
    return async dispatch => {
        console.log('[dispatch] sending business card photo to server...')
        
        console.log(photo);

        let body = new FormData();
        body.append('image', {uri: photo.uri, name: 'image',filename :`${ownerName}_card.jpg`, type: 'image/jpeg'});
        body.append('Content-Type', 'image/jpeg'); // multipart/form-data

        var response;
        try {
            response = await fetchWithTimeout(
                `http://${serverAddress.address}:8080/card?ownerName=${ownerName}`,
                {
                    method: 'POST',
                    headers: {
                        // 'Accept':'application/json',
                        "Content-Type": "multipart/form-data;charset=UTF-8",
                        // 'crossDomain': 'true',
                    },
                    body: body,
                    // JSON.stringify({
                    //     image,
                    //     ownerName
                    // })
                }
            );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: ADD_CARD, outcome: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: ADD_CARD, outcome: null });
        }

        console.log(`response status: ${response.status}`);

        const outcome = response.status === 201 ? true : false;

        dispatch({ type: ADD_CARD, outcome: outcome });
    }
};