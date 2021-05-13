import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UserService} from '../../service/user.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public requiredForm:any = FormGroup;

  department = ['HR', 'SALES', 'FINANCE', 'ENGINEERING'];
  salary = [350000, 400000, 450000, 500000, 550000, 600000]
  date: any = [];
  month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  year = [2019, 2020, 2021, 2022]
  employees: any = [];
  profile = ['../../../assets/Ellipse -3.png','../../../assets/Ellipse 1.png','../../../assets/Ellipse -8.png','../../../assets/Ellipse -4.png']
  checkedDepartment:any = [];
  values:any;
   
  constructor(private userService: UserService, private http: HttpClient, private formBuilder: FormBuilder, private route:Router) { 
     this.requiredForm = this.formBuilder.group({
      name: ['', [Validators.pattern("^[A-Z]{1}[a-z]{2,}"),Validators.required,Validators.minLength(3)]],
      
    })
  }

  ngOnInit(): void {
    this.day();
  }

  day() {
    let temp = []
    for (let i = 1; i < 31; i++) {
      this.date = temp.push(i)
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
    
    this.userService.addData(data).subscribe(res => {
      console.log("res is", res);
      this.route.navigate(['/dashboard'])
      
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
  cancle(){
    this.route.navigate(['/dashboard']);
  }
  reset(){
    //this.route.navigate(['/home']);
    location.reload();
  }
}


