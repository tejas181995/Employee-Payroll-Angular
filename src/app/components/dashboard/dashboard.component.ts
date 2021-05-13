import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { UserService} from '../../service/user.service'
import { getAngularJSVersion } from '@cds/core/internal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  employee:any = [];
  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.getData()
    
  }

  getData(){
    this.userService.getEmp().subscribe(res =>{
      console.log("res is", res)
      this.employee = res;
    })
  }

  onClick(id: any){
    console.log(id);
    this.userService.deleteData(id).subscribe(res => {
      this.getData();
      console.log("deleted successfully")
    })
      console.log("deleted successfully");     
    this.ngOnInit();
  }

}
