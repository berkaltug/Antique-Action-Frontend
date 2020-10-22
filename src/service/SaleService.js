import {saleHttp} from "../http-common";

class SaleService{

  getAntiqueSale(id){
    return saleHttp.get(`/${id}`);
  }

  getUserSales(){
    return saleHttp.get("/user-sales");
  }

}
export default new SaleService();
