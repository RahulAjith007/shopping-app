import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rn-shopping-app-729b2.firebaseio.com/'
});

export default instance;