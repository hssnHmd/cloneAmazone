import axios from 'axios';

const instance = axios.create({
    // the api (cloud function) url
    baseURL: 'http://localhost:5001/clone-e8499/us-central1/api',

})
export default instance;