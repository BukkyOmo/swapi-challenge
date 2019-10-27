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

/**
 * Returns an error response
 * @name Response4xx
 * @param {object} response
 * @param {number} code
 * @param {string} status
 * @param {string} error
 * @returns {object}
 */
const Response4xx = (request, response) => {
  if (request.accepts('html')) return ErrorRxx(response, 404, 'failure', `Error in request, '${request.path}' not found!`);
  if (request.accepts('json')) return ErrorRxx(response, 404, 'failure', `Error in request, '${request.path}' not found!`);
  return ErrorRxx(response, 404, 'failure', 'Not found');
};

export {
  ErrorRxx, Response2xx, Response4xx,
};
