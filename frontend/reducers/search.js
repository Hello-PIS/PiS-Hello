import { SEARCH, GET } from '../actions/search';

const initialState = {
  token: null,
  businessCards: [],
  myBusinessCards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
          ...state,
          myBusinessCards: action.businessCards,
          getResponseTimestamp: Date.now(),
      };
    case SEARCH:
      return {
          ...state,
          businessCards: action.businessCards,
          searchResponseTimestamp: Date.now(),
      };
  }
  return state;
};
