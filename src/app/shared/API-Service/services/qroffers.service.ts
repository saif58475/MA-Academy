import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class QroffersService {

  public Data = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

  CreateQR(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addQROffers?`, data);
   }
  UpdateQR(data : object, id : number):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/updateQROffers/${id}`, data);
   }
  GetQR():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listQROffers`);
  }
  DeleteQR(id : number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteQROffers/${id}`);
  }
 
}
