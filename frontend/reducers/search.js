import { SEARCH, GET } from '../actions/search';

const initialState = {
  token: null,
  businessCards: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return {
          ...state,
          businessCards: action.businessCards,
      };
    case SEARCH:
      return {
          ...state,
          businessCards: action.businessCards,
      };
  }
  return state;
};
