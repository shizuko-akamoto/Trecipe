import axios from 'axios';

export const baseURL = 'api/v1/';
export default axios.create({
    baseURL: baseURL,
});
