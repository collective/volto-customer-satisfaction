import { SUBMIT_CUSTOMER_SATISFACTION_ACTION } from '../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
};

/**
 * submitCustomerSatisfaction reducer.
 * @function submitForm
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const submitCustomerSatisfaction = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${SUBMIT_CUSTOMER_SATISFACTION_ACTION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${SUBMIT_CUSTOMER_SATISFACTION_ACTION}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${SUBMIT_CUSTOMER_SATISFACTION_ACTION}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
};
