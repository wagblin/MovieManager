import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { TmdbMovie } from '../models/tmdb-movie.model';
import { RecoTv } from '../recommendation/models/reco-tv.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private refreshWishToWatchSubject = new Subject<void>();
  private refreshOnBlackListWishSubject = new Subject<void>();

  movie:any = {};
  private indexPage:number = 1;

  /// REQUETES TMDB ///
  apiTmdb = environment.base_url_apiTmdb;
  apiKey = environment.apiKey_apiTmdb;
  apiTmdbSearchMoviesFromApi = '/search/movie';
  apiTmdbGetMoviesFromApi = '/discover/movie';
  apiGetTrendTvs:string = '/trending/movie/week';
  apiTmdbGetDetailsFromApi = '/movie/';
  private _searchedMovies$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _movies$:BehaviorSubject<any> = new BehaviorSubject([]);

  /// REQUETES BACK ///
  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/movie/detail/';
  apiPostWishMovie:string = '/wish/movie';
  apiGetWishMovies:string = '/movie/wishlist';
  apiPostWatchMovie:string = '/watch/movie';
  apiGetWatchMovies:string = '/movie/watchlist';
  apiGetRecoTvs:string = '/recommendation/tv';
  apiGetRecoMovies:string = '/recommendation/movie';
  apiPostBlackListMovie:string = '/blacklist/movie';
  private _watchesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _wishesMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _recoTv$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _recoMovie$:BehaviorSubject<any> = new BehaviorSubject([]);
  
  /// OBSERVABLE EN COMMUN TMDB/BACK ///
  private _movieDetail$:BehaviorSubject<any> = new BehaviorSubject([]);
  private _trendMovie$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
    private alerteSvc:AlertService,

  ) { }

  get refreshWishToWatch$() {
    return this.refreshWishToWatchSubject.asObservable();
  }
  triggerWishToWatchRefresh() {
    this.refreshWishToWatchSubject.next();
  }

  get refreshOnBlackListWish$() {
    return this.refreshOnBlackListWishSubject.asObservable();
  }
  triggerOnBlackListWishRefresh() {
    this.refreshOnBlackListWishSubject.next();
  }
  
  ////////////////////////////// SERVICES FOR TREND //////////////////////////////
  getTrendMovieFromApi(){


    let urlApi = this.apiTmdb+this.apiGetTrendTvs;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('page', '1')

    // this.http.get(this.apiBack+this.apiGetTrendTvs)
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.results.map( (reco: any) => new TmdbMovie(reco) );
      })
    )
    .subscribe((recos:TmdbMovie[]) => {

      let actualRecos = this._trendMovie$.getValue();
      let allRecos:any = [...actualRecos, ...recos]
      if (allRecos.length !== 0){
        this._trendMovie$.next(allRecos);
      }
    });  
  }
  getTrendMovie$ ():Observable<TmdbMovie[]> {
    this._trendMovie$.next([])
    return this._trendMovie$.asObservable();
  }

  ////////////////////////////// SERVICES FOR RECO //////////////////////////////
  getRecoMovieFromApi(){

    this.http.get(this.apiBack+this.apiGetRecoMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (reco: any) => new Movie(reco) );
      })
    )
    .subscribe((recos:Movie[]) => {

      // let actualRecos = this._recoMovie$.getValue();
      // let allRecos:any = [...actualRecos, ...recos]
      // if (allRecos.length !== 0){
      //   this._recoMovie$.next(allRecos);
      // }
      if (recos.length !== 0){
        this._recoMovie$.next(recos);
      }
    });  
  }
  getRecoMovie$ ():Observable<Movie[]> {
    this._recoMovie$.next([])
    return this._recoMovie$.asObservable();
  }
  getRecoTvFromApi(){

    this.http.get(this.apiBack+this.apiGetRecoTvs)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (reco: any) => new RecoTv(reco) );
      })
    )
    .subscribe((recos:RecoTv[]) => {

      let actualRecos = this._recoTv$.getValue();
      let allRecos:any = [...actualRecos, ...recos]
      if (allRecos.length !== 0){
        this._recoTv$.next(allRecos);
      }
    });  
  }

  getRecoTv$ ():Observable<RecoTv[]> {
    this._recoTv$.next([])
    return this._recoTv$.asObservable();
  }

  ////////////////////////////// SERVICES FOR SEARCHBAR //////////////////////////////
  searchMoviesFromApi(userSearch:string):void{
    let urlApi = this.apiTmdb+this.apiTmdbSearchMoviesFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('query', userSearch);

    
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (movie: any) => new TmdbMovie(movie) )
      })
    )
    .subscribe( (foundMovies:TmdbMovie[]) => this._searchedMovies$.next(foundMovies) );
  }
  getSearchedMovies$ ():Observable<TmdbMovie[]> {
    this._searchedMovies$.next([])
    return this._searchedMovies$.asObservable();
  }
  setSearchMovies$ (movies:TmdbMovie[]):void {
    this._searchedMovies$.next(movies);
  }

  //////////////////// SERVICES FOR DISCOVER (SEEALL+ACTIONBAR) ////////////////////
  getMoviesFromApi():void {
    let urlApi = this.apiTmdb+this.apiTmdbGetMoviesFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('vote_average.gte', '7')
    .set('vote_count.gte', '1000')
    .set('page', this.indexPage);

    
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any)=> {
        
        return apiResponse.results.map( (movie: any) => {
          
          return new TmdbMovie(movie) ;
          
        })
      })
    )
    .subscribe( (movies:TmdbMovie[]) => {
      let actualMovies = this._movies$.getValue();
      let allMovies:any = [...actualMovies, ...movies];
    
      this._movies$.next(allMovies);
    });
    this.indexPage++;
  }
  getMovies$ ():Observable<TmdbMovie[]> {
    this._movies$.next([])
    return this._movies$.asObservable();
  }

  ///////////////////////// SERVICES FOR DETAILSHEET /////////////////////////
  getBackDetailsFromApi(id:number):void{
    this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+id)
    .pipe(
      map((apiResponse:any)=> new Movie(apiResponse))
    )
    .subscribe( (movie:Movie) => {
      this.movie = movie;
      this._movieDetail$.next(this.movie)
    });
  }
  getTmdbDetailsFromApi(id:number):void{
    let urlApi = this.apiTmdb+this.apiTmdbGetDetailsFromApi;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')

    this.http.get(urlApi+id, {params})
    .pipe(
      map((apiResponse:any)=> new TmdbMovie(apiResponse))
    )
    .subscribe( (movie:TmdbMovie) => {
      this.movie = movie;
      this._movieDetail$.next(this.movie)
    });
  }
  getMovieDetail$ ():Observable<Movie> {
    // this._movieDetail$.next([])
    return this._movieDetail$.asObservable();
  }

  ////////////////////////////// SERVICES WISH //////////////////////////////
  postWishMovieToApi(postWishMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWishMovie, postWishMovie, {observe: 'response', responseType: 'text'});
  }
  getWishMoviesFromApi() { 
    this.http.get(this.apiBack+this.apiGetWishMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (wish: any) => new Movie(wish) )
      })
    )
    .subscribe((wishes:Movie[]) => {
      if (wishes.length !== 0){
        this._wishesMovie$.next(wishes);
      }
    });
  }
  getWishesMovie$ ():Observable<Movie[]> {
    this._wishesMovie$.next([])
    return this._wishesMovie$.asObservable();
  }
  delWishMovie() {
    let sendToApi = {wishIdToDelete:this.movie.idWish,};
    this.http.delete(this.apiBack+this.apiPostWishMovie, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          this.movie.idWish = null;
          this._movieDetail$.next(this.movie);
          this.alerteSvc.showAlert("Supprimé de la Wish liste!")
        }
      },
      // error: error => console.error(error)
    });
  }
  delWishThisMovie(wishMovieToDel: any) {
    let sendToApi = {wishIdToDelete:wishMovieToDel.idWish,};
    this.http.delete(this.apiBack+this.apiPostWishMovie, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          wishMovieToDel.idWish = null;
          /////// A VERIFIER !!! ///////
          // this._movieDetail$.next(wishMovieToDel);
          this.alerteSvc.showAlert("Supprimé de la Wish liste!")
        }
      },
      // error: error => console.error(error)
    });
  }
  

  ////////////////////////////// SERVICES WATCH //////////////////////////////
  postWatchMovieToApi(postWatchMovie: any) {
    return this.http.post(this.apiBack+this.apiPostWatchMovie, postWatchMovie, {observe: 'response', responseType: 'text'} );
  }
  getWatchMoviesFromApi() {
    this.http.get(this.apiBack+this.apiGetWatchMovies)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new Movie(watch) );
      })
    )
    .subscribe((watches:Movie[]) => {
      if (watches.length !== 0){ 
        this._watchesMovie$.next(watches);
      }
    });    
  }
  getWatchesMovie$ ():Observable<Movie[]> {
    this._watchesMovie$.next([])
    return this._watchesMovie$.asObservable();
  }
  delWatchMovie() {
    let sendToApi = {watchIdToDelete:this.movie.idWatch,};
    this.http.delete(this.apiBack+this.apiPostWatchMovie, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          this.movie.idWatch = null;
          this._movieDetail$.next(this.movie);
          this.alerteSvc.showAlert("Supprimé de la Watch liste!")
        }
      },
      // error: error => console.error(error)
    });
  }
  delWatchThisMovie(watchMovieToDel:any) {
    let sendToApi = {watchIdToDelete:watchMovieToDel.idWatch,};
    this.http.delete(this.apiBack+this.apiPostWatchMovie, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          watchMovieToDel.idWatch = null;
          /////// A VERIFIER !!! ///////
          // this._movieDetail$.next(this.movie);
          this.alerteSvc.showAlert("Supprimé de la Watch liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

////////////////////////////// SERVICES BLACKLIST //////////////////////////////
  postBlackListMovie(movieToBlackList:Movie) {
    let sendToApi = {idContent:movieToBlackList.idMovie,};
    
    this.http.post(this.apiBack+this.apiPostBlackListMovie, sendToApi ,{observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          this.alerteSvc.showAlert("Ajouté à la Black liste!");
          this.triggerOnBlackListWishRefresh();
        }
      },
      // error: error => console.error(error)
    });

  }
}