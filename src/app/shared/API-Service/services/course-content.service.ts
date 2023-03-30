import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  public coursecontent = new BehaviorSubject(null);
  public insertnewcoursecontent = new BehaviorSubject(null);
  public studentemail = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }


  GetCourseContent():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listSubjectContent`);
  }

  CreateCourseContent(data : any):Observable<any>{
   return this._HttpClient.post(`${environment.Server_URL}/addSubjectContent`, data);
  }

  UpdateCourseContent(data : any,id : number):Observable<any>{
   return this._HttpClient.put(`${environment.Server_URL}/updateSubjectContent/${id}`, data);
  }

  DeleteCourseContent(id:number):Observable<any>{
    return this._HttpClient.delete(`${environment.Server_URL}/deleteSubjectContent/${id}`);
  }

  // ====================================
  // this is for activation a student
  viewactivation():Observable<any>{
    return this._HttpClient.get(`${environment.Server_URL}/listStudentSubjectContents`)
  }
  insertactivation(data : any):Observable<any>{
    return this._HttpClient.post(`${environment.Server_URL}/StudentSubjectContents/store`, data);
  }
  updateactivation(data:any , id:number):Observable<any>{
    return this._HttpClient.put(`${environment.Server_URL}/StudentSubjectContents/updateStudentSubjectContents/${id}`, data);
  }
}

