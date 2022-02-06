import axios from 'axios'
axios.defaults.baseURL = 'https://all-in-one-db-test.herokuapp.com';

const fetcher = url => axios.get(url).then(res => res.data);

export default fetcher;