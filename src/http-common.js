import axios from "axios";
import AuthService from "./service/AuthService";

const http=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
  auth:AuthService.getCurrentUser()
})

const multipart=axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "multipart/form-data",
    'Access-Control-Allow-Origin': '*'
  },
  auth: AuthService.getCurrentUser()
})

const userHttp=axios.create({
  baseUrl:"http://localhost:8080/user",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  }
})

const saleHttp=axios.create({
  baseURL: "http://localhost:8080/sale",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*'
  },
  auth: AuthService.getCurrentUser()
})

export {http,multipart,userHttp,saleHttp};
