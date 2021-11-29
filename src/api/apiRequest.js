export const apiRequest = async (url = '', optionsObj = null, errorMessage = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('There was an error loading the data. Please try again.');
    } catch (error) {
        errorMessage = error.message;
    } finally {
        return errorMessage;
    }
}
