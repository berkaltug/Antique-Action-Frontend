import {http,multipart} from "../http-common";

import AuthService from "./AuthService";

class AntiqueService{

    getAllAntique(page,sort){
      let config={auth:AuthService.getCurrentUser()};
        return http.get(`http://localhost:8080/antique/list?page=${page}&sort=${sort}`,config);
    }

    getAntique(id){
      let config={auth:AuthService.getCurrentUser()};
      return http.get(`http://localhost:8080/antique/get/${id}`,config);
    }

    addAntique(formData){
      let config={auth:AuthService.getCurrentUser(),};
      console.log(formData)
      return multipart.post(`http://localhost:8080/antique/add`,formData);
    }

    updateAntique(formData){
      return multipart.post(`http://localhost:8080/antique/update`,formData);
    }
    makeBid(id,bid){
      return http.post(`http://localhost:8080/antique/bid`,{id:id,bid:bid});
    }
    deleteAntique(id){
      return http.delete(`http://localhost:8080/antique/delete/${id}`);
    }
}
export default new AntiqueService();
