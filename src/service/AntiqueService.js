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
      let config={auth:AuthService.getCurrentUser()};
      return multipart.post(`http://localhost:8080/antique/add`,{data:formData,config:config});
    }

    updateAntique(formData){
      let config={auth:AuthService.getCurrentUser()};
      return multipart.post(`http://localhost:8080/antique/update`,{data:formData,config:config});
    }
    makeBid(id,bid){
      let config={auth:AuthService.getCurrentUser()};
      return http.post(`http://localhost:8080/antique/bid`,{data:{id:id,bid:bid},config:config});
    }
    deleteAntique(id){
      let config={auth:AuthService.getCurrentUser()};
      return http.delete(`http://localhost:8080/antique/delete/${id}`,config);
    }
}
export default new AntiqueService();
