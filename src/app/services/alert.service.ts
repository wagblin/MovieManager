import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackbar:MatSnackBar,
  ) { }

  showAlert(msg:string) {
    this.snackbar.open(msg,'Fermer', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000
    })
  }
}
