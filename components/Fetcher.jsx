import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default fetcher;
