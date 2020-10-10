import axios from "axios";
import AuthService from "./service/AuthService";

const http=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
  auth: AuthService.getCurrentUser()
})

const multipart=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "multipart/form-data",
    'Access-Control-Allow-Origin': '*'
  },
  auth: AuthService.getCurrentUser()
})

export {http,multipart};
