import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../service/user.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent, employeeData } from '../dashboard/dashboard.component';
import { commonStringsDefault } from '@clr/angular';
import * as moment from 'moment';

const REGEX_NAME = new RegExp("^[A-Z][a-z]{2,}$");


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  department = ['HR', 'SALES', 'FINANCE', 'ENGINEERING'];
  date: any[] = []
  salary = [350000, 400000, 450000, 500000, 550000, 600000]
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  year = [2019, 2020, 2021, 2022]
  employees: any = [];
  profiles = ['../../../assets/Ellipse -3.png','../../../assets/Ellipse 1.png','../../../assets/Ellipse -8.png','../../../assets/Ellipse -4.png']
  checkedDepartment:any = [];
  values:any;
  name:string="nameijd";
  notes:string="";
  gender:any;
  checked: any ={};
  profileImg: any = {};
  selsal: any = {};
  
  constructor(private userService: UserService, private http: HttpClient, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<UpdateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public curremp: employeeData) { 
    for(let dept of this.department){
        if(curremp.department.includes(dept)){
            this.checkedDepartment.push(dept)
            this.checked[dept] = true
        }else{
          this.checked[dept] = false;
        }
    }
    console.log(curremp)
    for(let profile of this.profiles){
       this.profileImg[profile] = curremp.profile;
    }
    for(let sal of this.salary){
      this.selsal[sal] = false;
   }
   this.selsal[curremp.salary] = true;
    
  }

  ngOnInit(): void {
    console.log(this.curremp)
    this.day();
  }

  day() {
    let temp = []
    for (let i = 1; i < 31; i++) {
      temp.push(i)
    }
    this.date = temp;
  }


  onSubmit = (data: any) =>{
    if(data.salary == '')
      data.salary = this.curremp.salary;
    const momentDate = new Date(data.startDate); 
    const formattedDate = moment(momentDate).format("YYYY/MM/DD");
    data.startDate = formattedDate
    data.department = this.checkedDepartment
    console.log(data);
    
    this.userService.updateData(this.curremp.id, data).subscribe(res => {
      console.log("res is", res);
      location.reload();
    });
    alert("updated successfully")
    this.dialogRef.close();
   
  }

  onCheck(evt:any) {
    if (!this.checkedDepartment.includes(evt)) {
      this.checkedDepartment.push(evt);
      
    } else {
      var index = this.checkedDepartment.indexOf(evt);
      if (index > -1) {
        this.checkedDepartment.splice(index, 1);
      }
    }
    console.log(this.checkedDepartment);
  }

}
