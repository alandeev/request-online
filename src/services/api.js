const BASE_URL = "http://144.126.213.60/";

const baseFetch = async (urlRouter, fetchConfig) => {
    if(!fetchConfig.headers) {
        fetchConfig.headers = {}
    };

    if(fetchConfig.body) {
        fetchConfig.body = JSON.stringify(fetchConfig.body)
        fetchConfig.headers["Content-Type"] = "application/json"
    };

    const fetchResult = await fetch(`${BASE_URL}${urlRouter}`, fetchConfig);
    return fetchResult;

};

export default baseFetch;