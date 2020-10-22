import {saleHttp} from "../http-common";

class SaleService{

  getAntiqueSale(id){
    return saleHttp.get(`/antique/${id}`);
  }

  getUserSales(){
    return saleHttp.get("/user-sales");
  }

getUsersPastBids(){
  return saleHttp.get("/user-bids");
}

}
export default new SaleService();
