import axios from "axios";

const API_URL = "http://localhost:8080/antique/login";
const ADMIN_URL= "http://localhost:8080/antique/admin/login"

class AuthService {
  login(username, password) {
    return axios
      .get(API_URL, {
        headers: {
          "Content-type": "application/json",
          'Access-Control-Allow-Origin': '*'
        },
        auth:{
          username:username,
          password:password
        }
      })
      .then(response => {
        if (response.status===200) {
          localStorage.setItem("auth",JSON.stringify({username:username,password:password}));
          return true;
        }
      })
      .catch(error=>{return false});
  }

  adminLogin(username, password) {
    return axios
      .get(ADMIN_URL, {
        auth:{
          username:username,
          password:password
        }
      })
      .then(response => {
        if (response.status===200) {
          localStorage.setItem("auth",JSON.stringify({username:username,password:password}));
          return true;
        }
      })
      .catch(error=>{return false});
  }

  logout() {
    localStorage.removeItem("auth");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('auth'));  
  }
}

export default new AuthService();
