import axios from 'axios';

/**
 * handleSubmit: using to send a request from client to server via api
 *
 * @since 0.0.1
 * @param {String} url_api
 **/

export const handleSubmit = (url_api: string) => {
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