import axios from "axios";

export axios.create({
  baseURL: "http://localhost:8080/antique",
  headers: {
    "Content-type": "multipart/form-data"
  }
})
