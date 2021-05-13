import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service'
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpService) { 
    
  }

  addData(data:any){
    return this.http.addPost(this.BaseUrl, data);
  }

  getEmp(){
    return this.http.getEmpData(this.BaseUrl+'/all');
  }

  deleteData(id:any){
    return this.http.delete(`${this.BaseUrl}/deleteEmployee/${id}`)
  }
  updateData(id:any, data:any){
    return this.http.update(`${this.BaseUrl}/updateEmployee/${id}`, data)
  }
}
