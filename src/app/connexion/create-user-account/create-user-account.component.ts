import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { CreateUserModel, CreateUserModelIam, UserModel } from '../../models/userlogin.model';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent {

  formInscription!:FormGroup;

  //Liste de toutes les catégories
  movieGenreRef: any;
  serieGenreRef:any;
  streamingSubsciptionRef:any;

  //Tableau des catégories sélectionnées
  movieGenreCheckSelected: any;
  serieGenreCheckSelected: any;
  streamingGenreCheckSelected: any;

  constructor(
    private fb:FormBuilder,
    public userService:UserService,
    private alertService:AlertService,
    private router:Router,
  ){}

  ngOnInit() {
    
    this.formInscription = this.fb.group ({
      pseudo: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(5)]],
      birthYear: ['', [Validators.required, Validators.pattern("^(19[0-9]{2}|20[0-2][0-3])$"), Validators.minLength(4), Validators.maxLength(4)]],
      adultContent: [''],
      movieGenre: [''],
      serieGenre: [''],
      streamingSubs: [''],
      checkArrayMovie: this.fb.array([]),
      checkArraySerie: this.fb.array([]),
      checkArrayStreaming: this.fb.array([])
    });


    this.userService.getGenresMovie()
    .subscribe( (response:any) => {
        this.movieGenreRef = response;
      }
    )

    this.userService.getGenresTv()
    .subscribe( (response:any) => {
        this.serieGenreRef = response;
      }
    )

    this.userService.getStreaming()
    .subscribe( (response:any) => {
        this.streamingSubsciptionRef = response;
      }
    )

  }

  onCheckboxChangeMovie(event:any) {
    const checkArrayMovie: FormArray = this.formInscription.get('checkArrayMovie') as FormArray;
    if (event.target.checked) {
      checkArrayMovie.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArrayMovie.controls.forEach(
        (item: any) => {
        if (item.value == event.target.value) {
          checkArrayMovie.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.movieGenreCheckSelected = checkArrayMovie.value 
    
  }

  onCheckboxChangeSerie(event:any) {
    const checkArraySerie: FormArray = this.formInscription.get('checkArraySerie') as FormArray;
    if (event.target.checked) {
      checkArraySerie.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArraySerie.controls.forEach(
        (item: any) => {
        if (item.value == event.target.value) {
          checkArraySerie.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.serieGenreCheckSelected = checkArraySerie.value 
    
  }

  onCheckboxChangeStreaming(event:any) {
    const checkArrayStreaming: FormArray = this.formInscription.get('checkArrayStreaming') as FormArray;
    if (event.target.checked) {
      checkArrayStreaming.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkArrayStreaming.controls.forEach(
        (item: any) => {
        if (item.value == event.target.value) {
          checkArrayStreaming.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.streamingGenreCheckSelected = checkArrayStreaming.value 
    
  }

  createAccount() {    

    let userModelMma:CreateUserModel =
    {
      userName: this.formInscription.controls['pseudo'].value,
      email: this.formInscription.controls['email'].value,
      birthYear: Number(this.formInscription.controls['birthYear'].value),
      adultContent: this.formInscription.controls['adultContent'].value === "true",
      enableAccount: true,
      genreMovieDtoSet: this.movieGenreCheckSelected?this.movieGenreCheckSelected.map((id:number) => ({ id })):[],
      genreTvDtoSet: this.serieGenreCheckSelected?this.serieGenreCheckSelected.map((id:number) => ({ id })):[],
      streamingSubscriptionDtoSet: this.streamingGenreCheckSelected?this.streamingGenreCheckSelected.map((id:number) => ({ id })):[]
    }

    let userModelIam:CreateUserModelIam =
    {
      email: this.formInscription.controls['email'].value,
      password: this.formInscription.controls['password'].value,
      loginName: this.formInscription.controls['pseudo'].value
    }

    

    this.userService.postCreateUserIamToApi(userModelIam)
    .subscribe({
      next: (responseIam:any) => {
        
        if(responseIam) {
          
          this.userService.postCreateUserToApi(userModelMma)
          .subscribe({
            next: (responseMma:any) => {
          
              if(responseMma) {
                
                this.router.navigate(['connexion']);
              }
              else {
                // console.log("Pb création user mma")
                // console.log("responseMma");
                // console.log(responseMma);
              }
            },
            
            // error: error => console.log(error)
            
          })

        } else {
          // console.log("Pb création user iam");
          // console.log("responseIam");
          // console.log(responseIam);
        }
      },
      // error:error => console.log(error)
    });
  
  }

}
