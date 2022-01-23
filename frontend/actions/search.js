import serverAddress from '../constants/serverAddress';

export const SEARCH = 'SEARCH';

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 5000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

  export const searchBusinessCards = (username) => {
    return async dispatch => {
        console.log('[dispatch] searching for business cards...')
        
        var response;
        try {
            response = await fetchWithTimeout(
                `http://${serverAddress.address}:8080/${username}/cards`
            );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: SEARCH, businessCards: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: SEARCH, businessCards: null });
        }

        console.log(`response status: ${response.status}`);
        var respData = [];
        if(response.status == 200) {
            respData = await response.json();
            // console.log(respData);
        } else if (response.status == 404) {
            console.log(`No business cards found.`);
        } else {
            console.log(`Request rejected for unknown reason.`);
        }
        
        dispatch({ type: SEARCH, businessCards: respData });
    }
};