import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  
  connexion!:FormGroup;
  isSubmitted:boolean = false;
  userData:any;

  constructor(
    private fb:FormBuilder,
    public userSvc:UserService,
    private alertSvc:AlertService,
    private router:Router,
    public dialog: MatDialog,
  ){}

  ngOnInit() {
    
    this.connexion = this.fb.group ({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
    });

    let userDataInStorage = localStorage.getItem('userData');
    this.userData = userDataInStorage!=null?JSON.parse(userDataInStorage):{};
  }

  onSubmit() {

    if(this.connexion.valid) {

      this.userSvc.login(this.connexion.value)
      .subscribe(
        {
          next: (response:any) => {
            

            let name = response.email.split ('@');
            let userData = {
              email: response.email,
              username: name[0],
            };

            localStorage.setItem('token', response.jwt);
            localStorage.setItem('userData', JSON.stringify(userData));

            if(response.jwt){  
              this.router.navigate(['/recommendation']);
              this.alertSvc.showAlert('Vous êtes connecté(e)');
              this.userSvc.triggerAuthRefresh();
            }
          },
          
          // error: (err) => console.log(err)
        }
      
      )
    } 
  }

  
  
}
