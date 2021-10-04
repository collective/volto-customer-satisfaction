export const SUBMIT_CUSTOMER_SATISFACTION_ACTION =
  'SUBMIT_CUSTOMER_SATISFACTION_ACTION';
export const RESET_SUBMIT_CUSTOMER_SATISFACTION_ACTION =
  'RESET_SUBMIT_CUSTOMER_SATISFACTION_ACTION';

export const RESET_DELETE_FEEDBACKS =
  'RESET_DELETE_FEEDBACKS_CUSTOMER_SATISFACTION';

/**
 * submitCustomerSatisfaction function
 * @function submitCustomerSatisfaction
 * @param {string} path
 * @param {Object} data
 */
export function submitCustomerSatisfaction(path = '', data) {
  return {
    type: SUBMIT_CUSTOMER_SATISFACTION_ACTION,
    request: {
      op: 'post',
      path: path + '/@customer-satisfaction-add',
      data,
    },
  };
}

export function resetSubmitCustomerSatisfaction() {
  return {
    type: RESET_SUBMIT_CUSTOMER_SATISFACTION_ACTION,
  };
}

export function resetDeleteFeedbacks() {
  return { type: RESET_DELETE_FEEDBACKS };
}

/**
 * EXPORT_CSV_CUSTOMERSATISFACTIONDATA action
 * @module actions/exportCsvCustomerSatisfactionData
 */
export const EXPORT_CSV_CUSTOMERSATISFACTIONDATA =
  'EXPORT_CSV_CUSTOMERSATISFACTIONDATA';

export function exportCsvCustomerSatisfactionData() {
  return {
    type: EXPORT_CSV_CUSTOMERSATISFACTIONDATA,
    request: {
      op: 'get',
      path: '/@customer-satisfaction-csv',
    },
  };
}

/**
 * DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS action
 * @module actions/deleteAllFeedbacks
 */
export const DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS =
  'DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS';

export function deleteAllFeedbacks() {
  return {
    type: DELETE_ALL_CUSTOMERSATISFACTION_FEEDBACKS,
    request: {
      op: 'get',
      path: '/@customer-satisfaction-clear',
    },
  };
}

/**
 * GET_CUSTOMER_SATISFACTION action
 * @module actions/getCustomerSatisfaction
 */
export const GET_CUSTOMER_SATISFACTION = 'GET_CUSTOMER_SATISFACTION';
export function getCustomerSatisfaction(data) {
  return {
    type: GET_CUSTOMER_SATISFACTION,
    request: {
      op: 'get',
      path: '/@customer-satisfaction',
      params: data,
    },
  };
}

/**
 * DELETE_FEEDBACKS action
 * @module actions/getCustomerSatisfaction
 */
export const DELETE_FEEDBACKS = 'DELETE_FEEDBACKS';
export function deleteFeedbacks(item) {
  return {
    type: DELETE_FEEDBACKS,
    subrequest: item.uid,
    request: {
      op: 'del',
      path: '/@customer-satisfaction-delete/' + item.uid,
    },
  };
}
