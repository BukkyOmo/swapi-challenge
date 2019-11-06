/**
 * Returns an error response
 * @name ErrorRxx
 * @param {object} response
 * @param {number} code
 * @param {string} status
 * @param {string} error
 * @returns {object}
 */
const ErrorRxx = (response, code, status, error) => response.status(code).json({ status, error });

/**
 * Returns a 2xx response with payload
 * @name Response2xx
 * @param {object} response
 * @param {number} code
 * @param {string} status
 * @param {array} data
 * @returns {object}
 */
const Response2xx = (response, code, status, message, data) => {
  let responseBody = { status, message, data };
  if (!message) responseBody = { status, data };
  if (typeof data !== 'string' && !data.isArray) responseBody.data = [data];
  response.status(code).json(responseBody);
};

export {
  ErrorRxx, Response2xx
};
