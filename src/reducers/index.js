import {
  SUBMIT_CUSTOMER_SATISFACTION_ACTION,
  RESET_SUBMIT_CUSTOMER_SATISFACTION_ACTION,
  EXPORT_CSV_CUSTOMERSATISFACTIONDATA,
  DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS,
  GET_CUSTOMER_SATISFACTION,
} from '../actions';

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
    case `${RESET_SUBMIT_CUSTOMER_SATISFACTION_ACTION}`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/comma-separated-values;charset=utf-8,' +
      encodeURIComponent(text),
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * exportCsvCustomerSatisfactionData reducer.
 * @function exportCsvCustomerSatisfactionData
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const exportCsvCustomerSatisfactionData = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${EXPORT_CSV_CUSTOMERSATISFACTIONDATA}_PENDING`:
      return {
        ...state,
        error: null,
        result: null,
        loaded: false,
        loading: true,
      };
    case `${EXPORT_CSV_CUSTOMERSATISFACTIONDATA}_SUCCESS`:
      download('export-customer-satisfaction.csv', action.result);

      return {
        ...state,
        error: null,
        result: action.result,
        loaded: true,
        loading: false,
      };
    case `${EXPORT_CSV_CUSTOMERSATISFACTIONDATA}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
};

/**
 * deleteAllFeedbacks reducer.
 * @function deleteAllFeedbacks
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const deleteAllFeedbacks = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};

/**
 * getCustomerSatisfaction reducer.
 * @function getCustomerSatisfaction
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export const getCustomerSatisfaction = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_CUSTOMER_SATISFACTION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${GET_CUSTOMER_SATISFACTION}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${GET_CUSTOMER_SATISFACTION}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};
