import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { TmdbMovie } from 'src/app/models/tmdb-movie.model';
import { AlertService } from 'src/app/services/alert.service';
import { MovieService } from 'src/app/services/movie.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-overview-trend-movie',
  templateUrl: './overview-trend-movie.component.html',
  styleUrls: ['./overview-trend-movie.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OverviewTrendMovieComponent {

  recoMovies:Array<TmdbMovie> = [];
  isAuth = this.userService.isAuth();

  // Statut icône Wish
  _wishStatusIconOn: string = "fa-solid fa-bookmark fa-lg";
  _wishTitleIconOn: string = "Supprimer de la Wish liste";
  _wishStatusIconOff: string = "fa-regular fa-bookmark fa-lg";
  _wishTitleIconOff: string = "Ajouter à la Wish liste";

  // Statut icône Watch
  _watchStatusIconOn: string = "fa-solid fa-eye fa-lg"
  _watchTitleIconOn: string = "Restaurer 'Non Vu'"
  _watchStatusIconOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconOff: string = "Marquer comme 'Vus'"

  // Statut icône BlackList
  _blackStatusIconOn: string = "fa-solid fa-ban fa-lg";
  _blackTitleIconOn: string = "Ne plus recommander";

  subscriptionRecoMovie:any;

  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/movie/detail/';

  constructor(
    private movieSvc:MovieService,
    private alerteSvc:AlertService,
    private http:HttpClient,
    public userService: UserService,
  ){}
  
  async ngOnInit() {
    
    this.subscriptionRecoMovie = await this.movieSvc.getTrendMovie$()
      .subscribe( async (recoArr:Movie[]) => {
        if(recoArr.length===0) {
          this.movieSvc.getTrendMovieFromApi();
        }
        this.recoMovies = recoArr;
        

        if (this.isAuth){
        

          for (let movie of this.recoMovies){
            await this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+movie.idMovie)
            .toPromise()      
            .then( (response:any) => {
              // INIT icones wish, watch, blackList
              if (response.idWish !== null) {
                movie.idWish = response.idWish;
                movie._wishStatusIcon = this._wishStatusIconOn;
                movie._wishTitleIcon = this._wishTitleIconOn;
              } else {
                movie._wishStatusIcon = this._wishStatusIconOff;
                movie._wishTitleIcon = this._wishTitleIconOff;
              };
              if (response.idWatch !== null) {
                movie.idWatch = response.idWatch;
                movie._watchStatusIcon = this._watchStatusIconOn;
                movie._watchTitleIcon = this._watchTitleIconOn;
              } else {
                movie._watchStatusIcon = this._watchStatusIconOff;
                movie._watchTitleIcon = this._watchTitleIconOff;
              };
              
            });
            
          }  
        }
        return;
      });

  }

  updateStatusWishIcon(movie:Movie) {
    if (movie._wishStatusIcon === this._wishStatusIconOn) {
      
      this.movieSvc.delWishThisMovie(movie);
      this.setStatusWishIcon(movie, 0)
    }
    else {
      
      this.addWish(movie);
      this.setStatusWishIcon(movie, 1)
    }
  }

  updateStatusWatchIcon(movie:Movie) {
    if (movie._watchStatusIcon === this._watchStatusIconOn) {
      
      this.movieSvc.delWatchThisMovie(movie);
      this.setStatusWatchIcon(movie, 0)
    }
    else {
      
      this.checkWatch(movie);
      this.setStatusWatchIcon(movie, 1)
    }
  }

  setStatusWishIcon(movie:Movie , status: number) {
    if (status) {
      movie._wishStatusIcon = this._wishStatusIconOn;
      movie._wishTitleIcon = this._wishTitleIconOn;
    }
    else {
      movie._wishStatusIcon = this._wishStatusIconOff;
      movie._wishTitleIcon = this._wishTitleIconOff;
    }
  }

  setStatusWatchIcon(movie:Movie , status: number) {
    if (status) {
      movie._watchStatusIcon = this._watchStatusIconOn;
      movie._watchTitleIcon = this._watchTitleIconOn;
    }
    else {
      movie._watchStatusIcon = this._watchStatusIconOff;
      movie._watchTitleIcon = this._watchTitleIconOff;
    }
  }

  

  callTest(str:string) {
    this.alerteSvc.showAlert("Ajouté aux " + str + "!!!");
  }

  addWish(movie:Movie) {
    let sendToApi = { idMovie:movie.idMovie, };
    
    this.movieSvc.postWishMovieToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        
        if(response.status = "201") {
          this.alerteSvc.showAlert("Ajouté à la Wish liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

  checkWatch(movie:Movie) {
    let sendToApi = { idMovie:movie.idMovie,};
    

    this.movieSvc.postWatchMovieToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        
        if(response.status = "201") {
          this.alerteSvc.showAlert("Ajouté à la Watch liste!")
          
        }
      },
      // error: error => console.error(error)
    });
  }
            
  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }
  
  ngOnDestroy() {
    this.subscriptionRecoMovie.unsubscribe();
  }



}
