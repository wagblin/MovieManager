import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvModel } from '../discovertv/models/tv.model';


@Injectable({
  providedIn: 'root'
})
export class TvService {

  apiTmdb = environment.base_url_apiTmdb;
  apiKeyTmdb = environment.apiKey_apiTmdb;

  private tvs$:BehaviorSubject<any> = new BehaviorSubject([]);
  private tvDetail$:BehaviorSubject<any> = new BehaviorSubject([]);
  private tvDetailWish$:Subject<any> = new Subject();
  private tvDetailWatch$:Subject<any> = new Subject();
  private indexPage:number = 1;
  
  private searchedTvs$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient
  ) {}

  //////////////
  // DISCOVERY
  //////////////
  
  getTvsFromApi():void {
    let urlApi = this.apiTmdb+'/discover/tv';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('vote_average.gte', '8')
    .set('vote_count.gte', '1000')
    .set('page', this.indexPage);

    

    this.http.get(urlApi, {params})
  
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (tv: any) => new TvModel(tv) )      
      })
    )
    
    .subscribe( (tvs:TvModel[]) => {
      let actualTvs = this.tvs$.getValue();
      let allTvs:any = [...actualTvs, ...tvs];
    
      this.tvs$.next(allTvs);
    });
    
    this.indexPage++;
  }

  getTvs$ ():Observable<TvModel[]> {
    this.tvs$.next([])
    return this.tvs$.asObservable();
  }


  getDetailsFromApi(id:number):void{
    let urlApi = this.apiTmdb+'/tv/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TvModel(apiResponse) )
    )

    .subscribe( (tv:TvModel) => {
      this.tvDetail$.next(tv)
    });
  }

  getTvDetail$ ():Observable<TvModel> {
    return this.tvDetail$.asObservable();
  }

  getDetailsWishFromApi(id:number):void{
    let urlApi = this.apiTmdb+'/tv/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TvModel(apiResponse) )
    )

    .subscribe( (tv:TvModel) => {
      this.tvDetailWish$.next(tv)
    })
    ;
  }

  getTvWishDetail$ ():Observable<TvModel> {
    return this.tvDetailWish$.asObservable();
  }

  getDetailsWatchFromApi(id:number):void{
    let urlApi = this.apiTmdb+'/tv/';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    
    
    this.http.get(urlApi+id, {params})
    
    .pipe(
      map((apiResponse:any)=> new TvModel(apiResponse) )
    )

    .subscribe( (tv:TvModel) => {
      this.tvDetailWatch$.next(tv)
    })
    ;
  }

  getTvWatchDetail$ ():Observable<TvModel> {
    this.tvDetailWatch$.next([])
    return this.tvDetailWatch$.asObservable();
  }

  searchTvsFromApi(userSearch:string):void{
    let urlApi = this.apiTmdb+'/search/tv';
    let apiKey = this.apiKeyTmdb;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('language', 'fr')
    .set('query', userSearch);

    
    this.http.get(urlApi, {params})
    
    .pipe(
      map((apiResponse:any)=> {
        return apiResponse.results.map( (tv: any) => new TvModel(tv) )
      })
    )
    .subscribe( (foundTvs:TvModel[]) => this.searchedTvs$.next(foundTvs) );
  }

  getSearchedTvs$ ():Observable<TvModel[]> {
    this.searchedTvs$.next([])
    return this.searchedTvs$.asObservable();
  }

  setSearchTvs$ (tvs:TvModel[]):void {
    this.searchedTvs$.next(tvs);
  }

  // getVideosFromApi(id:number){  
  //   let urlApi = this.apiTmdb+'/tv/';
  //   let apiKey = this.apiKeyTmdb;
  //   let params = new HttpParams()
  //   .set('api_key', apiKey)
  //   .set('language', 'fr')
  //   return this.http.get(urlApi+id+'/videos', {params});
  // }


}
