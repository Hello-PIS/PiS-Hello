import serverAddress from '../constants/serverAddress';

export const EDIT_DATA = 'EDIT_DATA'

async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 2000 } = options;
    
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal  
    });
    clearTimeout(timer);
    return response;
  }

  export const editFinished = () => {
    return async dispatch => {
        dispatch({ type: EDIT_DATA, outcome: null });
}
};

export const editCardData = (idU, company, name, phone, email, category, mode) => {

    return async dispatch => {
        const id = parseInt(idU);
        console.log('Updating data...')

        
        var response;

        try {
            response = await fetchWithTimeout(
                `http://${serverAddress.address}:8080/card/changedata`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        id,
                        company,
                        name,
                        phone,
                        email,
                        category,
                        mode
                    })
                }
            );
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log("AbortError occurred");
                return dispatch({ type: EDIT_DATA, outcome: null });
            }
            console.log("error occurred: " + error.toString());
            return dispatch({ type: EDIT_DATA, outcome: null });
        }

        console.log(`Response status: ${response.status}`);
        if(response.status == 200) {
            console.log(`Update data successfully`);
            dispatch({ type: EDIT_DATA, outcome: true });
        } else if (response.status == 404) {
            console.log(`Request rejected. Wrong credentials.`);
            dispatch({ type: EDIT_DATA, outcome: false });
        } else {
            console.log(`Request rejected for unknown reason.`);
            dispatch({ type: EDIT_DATA, outcome: null });
        }
    }
};
