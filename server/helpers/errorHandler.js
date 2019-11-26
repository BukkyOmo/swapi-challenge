/**
 * @description Wraps a controller function in a try-catch block
 * @param  {object} request - The request object
 * @param  {object} response - The response object
 * @returns Boolean
 */

const tryCatch = controller => async (request, response) => {
    try {
        await controller(request, response);
    } catch (error) {
        return error;
    }
    return true;
}

export default tryCatch;
