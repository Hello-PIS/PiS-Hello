import { SEARCH } from '../actions/search';

const initialState = {
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
          ...state,
          businessCards: action.businessCards,
      };
  }
  return state;
};
