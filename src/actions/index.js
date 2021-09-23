export const SUBMIT_CUSTOMER_SATISFACTION_ACTION =
  'SUBMIT_CUSTOMER_SATISFACTION_ACTION';

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
