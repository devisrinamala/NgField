import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseurl="http://localhost:8081/api/v1/insert";
  constructor(private http:HttpClient) { }
  onget():Observable<any>{
    return this.http.get<any>(this.baseurl)
  }
  onpost(user:User):Observable<any>{
    return this.http.post<any>(this.baseurl,user)
  }
  // onupdate(id:number,user:User):Observable<any>{
  //   return this.http.put<any>(`${this.baseurl}/id/${id}`,{data:user})
  // }
  ondelete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseurl}/id/${id}`)
  }
  getbyemail(email:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseurl}/search?email=${email}`)
  }
}
