import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeacherRequestService {
  public Subject = new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient) { }

   GetPdfRequests():Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/listRequestPdf`);
  }

   approveRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/approvepdfteacher/${RequestId}`);
  }
   denyRequest(RequestId : number):Observable<any>{
   return this._HttpClient.get(`${environment.Server_URL}/denypdfteacher/${RequestId}`);
  }
}
