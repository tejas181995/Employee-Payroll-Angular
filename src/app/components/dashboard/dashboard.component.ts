import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { UserService} from '../../service/user.service'
import { getAngularJSVersion } from '@cds/core/internal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';


export interface employeeData{
  department: any[],
  startDate: string,
  salary: number,
  profile: any,
  name: string,
  notes: string,
  id: number,
  gender: string


}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  employee:any = [];
  constructor(private http: HttpClient, private userService: UserService, public dialog: MatDialog) { }

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
    location.reload();
    location.reload();
  }
  editEmp(id:any){
    var curremp = this.getEmpbyid(id)
    const dialogRef = this.dialog.open(UpdateEmployeeComponent,{
      data : {
        department:curremp.department,
      startDate: curremp.startDate,
      salary: curremp.salary,
      profile: curremp.profile,
      name: curremp.name,
      notes: curremp.notes,
      id: curremp.id,
      gender: curremp.gender
      }
    });
    //location.reload()
   
  }
  getEmpbyid(id:any){
    for(let emp of this.employee.data){
      if(emp.id == id){
        console.log(emp)
        return emp;
      }
    }
  }

}
