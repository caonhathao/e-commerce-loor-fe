import axios from 'axios';

/**
 * handleSubmit: using to send a request from client to server via api
 *
 * @since 0.0.1
 * @param {String} url_api
 * @param {String} method - method of you request (GET, POST, PUT,...)
 * @param {Object} formData - a data of any object (prepare by form,..) to be push with request
 * @param {String} direct_url - direct to any page after complete request
 **/

export const handleSubmit = (url_api: string, method: string, formData: any, direct_url: any) => {
    try {
        axios.post(url_api).then((response) => {
            if (response.status === 200) {
                console.log(response);
            } else console.log(response);
        })
    } catch (err) {
        console.log(err);
    }
}