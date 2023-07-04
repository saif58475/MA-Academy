import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ExamsService {

  public data = new BehaviorSubject(null);
  
  constructor(private _HttpClient:HttpClient) { }

  // GetCourse():Observable<any>{
  //   return this._HttpClient.get(`${environment.Server_URL}/listSubject`);
  //  }
 
    CreateExam(data : object):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/addExam`, data);
   }
  //   DeleteCourse(id:number):Observable<any>{
  //   return this._HttpClient.delete(`${environment.Server_URL}/deleteSubject/${id}?`);
  //  }
}
