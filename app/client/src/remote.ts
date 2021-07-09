import axios from "axios";

const remote = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default remote;
