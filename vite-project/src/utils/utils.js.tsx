export const buildPathUrl = (urlTemplate: string, pathParams: { [key: string]: string | number }) => {
    return urlTemplate.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
        const value = pathParams[key];
        if (value === undefined) {
            throw new Error(`Missing path param: ${key}`);
        }
        return encodeURIComponent(value.toString());
    });
};


export const buildUrlWithParams = (
    urlTemplate: string,
    pathParams: { [key: string]: string | number },
    queryParams?: { [key: string]: string | number }) => {

    let url = buildPathUrl(urlTemplate, pathParams);
    if (queryParams && Object.keys(queryParams).length > 0) {
        const params = new URLSearchParams();
        for (const key in queryParams) {
            const value = queryParams[key];
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        }
        url += `?${params.toString()}`;
    }
    return url;
}