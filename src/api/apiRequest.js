export const apiRequest = async (url = '', optionsObj = null, errorMessage = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Something went wrong. Please come back later.');
    } catch (error) {
        errorMessage = error.message;
    } finally {
        return errorMessage;
    }
}
