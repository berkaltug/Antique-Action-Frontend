import axios from "axios";

const http=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }
})

const multipart=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "multipart/form-data",
    'Access-Control-Allow-Origin': '*'
  }
})

export {http,multipart};
