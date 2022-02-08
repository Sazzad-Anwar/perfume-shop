import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : 'https://all-in-one-db-test.herokuapp.com';

const fetcher = url => axios.get(url).then(res => res.data);

export default fetcher;