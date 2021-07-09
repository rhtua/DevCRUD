import axios from "axios";

const remote = axios.create({
  baseURL: process.env.REACT_APP_URL || "http://localhost:3001",
});

export default remote;
