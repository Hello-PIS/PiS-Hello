import { EDIT_DATA } from '../actions/edit';

const initialState = {
    token: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case EDIT_DATA:
        return {
            ...state,
            editOutcome: action.outcome,
            editResponseTimestamp: Date.now(),
        };
    }
    return state;
  };