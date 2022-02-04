import { ADD_CARD } from '../actions/businessCards';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        addCardOutcome: action.outcome,
        addCardResponseTimestamp: Date.now(),
      }; 
    // case SEARCH:
    //   return {
    //       ...state,
    //       myBusinessCards: action.businessCards,
    //       searchResponseTimestamp: Date.now(),
    //   };
  }
  return state;
};
