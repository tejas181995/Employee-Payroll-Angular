import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessfull(){
    this.snackBar.open('Employee Created Successfully', ' ',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:'success'
    });
  }
  showDelete(){
    this.snackBar.open('Employee Deleted Successfully',' ',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'delete'
      
    })
  }
  showUpdate(){
    this.snackBar.open('Employee Updated Successfully',' ',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'update'
      
    })
  }
}
