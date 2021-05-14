import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  addPost = (url: any, data: any) => {   
    let options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
        
      })
    } 
      return this.http.post(url, data, options)
  }

  getEmpData = (url:any) =>{
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
      return this.http.get(url, options)
  }

  delete = (url:any) =>{
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    return this.http.delete(url, options)
  }
  update = (url:any, data:any) =>{
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    } 
    console.log(url)
    console.log(data)
    return this.http.put(url, data, options)
  }
}