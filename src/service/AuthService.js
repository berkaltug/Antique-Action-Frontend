import axios from "axios";
import { userHttp } from "../http-common.js";

const API_URL = "http://localhost:8080/antique/login";
const ADMIN_URL = "http://localhost:8080/antique/admin/login";

class AuthService {
   async login(username, password) {
    return await axios
      .get(API_URL, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        auth: {
          username: username,
          password: password
        }
      })
      .then(response => {
        if (response.status === 200) {
            localStorage.setItem(
            "auth",
            JSON.stringify({ username: username, password: password })
          );
          return true;
        }
      })
      .catch(error => {
        return false;
      });
  }

  async adminLogin(username, password) {
    return  await axios
      .get(ADMIN_URL, {
        auth: {
          username: username,
          password: password
        }
      })
      .then(response => {
        if (response.status === 200) {
         localStorage.setItem(
            "auth",
            JSON.stringify({ username: username, password: password })
          );
          return true;
        }
      })
      .catch(error => {
        return false;
      });
  }

  register(username, email, password) {
    return userHttp.post('/register', {
      username: username,
      email: email,
      password: password
    });
  }

  logout() {
    localStorage.removeItem("auth");
  }

   getCurrentUser() {
    return JSON.parse(localStorage.getItem("auth"));
  }
}

export default new AuthService();
