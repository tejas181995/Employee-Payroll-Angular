import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../service/user.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardComponent, employeeData } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  public userPost:any = FormGroup;
  department = ['HR', 'SALES', 'FINANCE', 'ENGINEERING'];
  date: any[] = []
  salary = [350000, 400000, 450000, 500000, 550000, 600000]
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  year = [2019, 2020, 2021, 2022]
  employees: any = [];
  profile = ['../../../assets/Ellipse -3.png','../../../assets/Ellipse 1.png','../../../assets/Ellipse -8.png','../../../assets/Ellipse -4.png']
  checkedDepartment:any = [];
  values:any;
  
  constructor(private userService: UserService, private http: HttpClient, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public curremp: employeeData) { 
    this.userPost = this.formBuilder.group({
     name: ['', [Validators.pattern("^[A-Z]{1}[a-z]{2,}"),Validators.required,Validators.minLength(3)]],
     
   })

   
 }

  ngOnInit(): void {
    this.userPost = this.formBuilder.group({
      department:[this.curremp.department],
      startDate: [this.curremp.startDate],
      salary: [this.curremp.salary],
      profile: [this.curremp.profile],
      name: [this.curremp.name, , Validators.required],
      notes: [this.curremp.notes],
      id: [this.curremp.id],
      gender: [this.curremp.gender]
   });

    this.day()
  }
  day() {
    let temp = []
    for (let i = 1; i < 31; i++) {
      temp.push(i)
    }
    this.date = temp;
  }

  onSubmit = (data: any) =>{
    console.log(data.year);
    data.department = this.checkedDepartment;
    data.startDate = data.year + '/' + (this.month.indexOf(data.month)+1) + '/' + data.day; 
    delete data.month;
    delete data.year;
    delete data.day;
    console.log(data);
    console.log();
    
    this.userService.updateData(this.curremp.id, this.curremp).subscribe(res => {
      console.log("res is", res);
    })
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
