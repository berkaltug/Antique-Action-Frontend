import {http,multipart} from "../http-common";

import AuthService from "./AuthService";

class AntiqueService{

    getAllAntique(page,sort){
        return http.get(`http://localhost:8080/antique/list?page=${page}&sort=${sort}`);
    }

    searchAntique(page,sort,string){
      return http.get(`http://localhost:8080/antique/search?page=${page}&sort=${sort}&str=${string}`);
    }

    getAntique(id){
      return http.get(`http://localhost:8080/antique/get/${id}`);
    }

    addAntique(formData){
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
