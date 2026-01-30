import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { TrendTv } from '../models/trend-tv.model';

@Injectable({
  providedIn: 'root'
})
export class TrendTvService {

  apiTmdb = environment.base_url_apiTmdb;
  apiKey = environment.apiKey_apiTmdb;
  apiBack = environment.base_url_apiBack;
  apiGetTrendTvs:string = '/trending/tv/week';
  apiPostWishTv:string = '/wish/tv';
  apiPostWatchTv:string = '/watch/tv';
  private _trendTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
    private alerteSvc:AlertService,
  ) { }

  getRecoTvFromApi(){


    let urlApi = this.apiTmdb+this.apiGetTrendTvs;
    let apiKey = this.apiKey;
    let params = new HttpParams()
    .set('api_key', apiKey)
    .set('page', '1')

    // this.http.get(this.apiBack+this.apiGetTrendTvs)
    this.http.get(urlApi, {params})
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.results.map( (reco: any) => new TrendTv(reco) );
      })
    )
    .subscribe((recos:TrendTv[]) => {

      // let actualRecos = this._trendTv$.getValue();
      // let allRecos:any = [...actualRecos, ...recos]
      // if (allRecos.length !== 0){
      //   this._trendTv$.next(allRecos);
      // }
      if (recos.length !== 0){
        this._trendTv$.next(recos);
      }
    });  
  }
  getRecoTv$ ():Observable<TrendTv[]> {
    this._trendTv$.next([])
    return this._trendTv$.asObservable();
  }

 ////////////////////////////// SERVICES WISH //////////////////////////////


  postWishTvToApi(postWishTv: any) {
    return this.http.post(this.apiBack+this.apiPostWishTv, postWishTv, {observe: 'response', responseType: 'text'});
  }

  delWishThisTv(wishTvToDel: any) {
   let sendToApi = {idTv:wishTvToDel.idTv,};
    // this.http.delete(this.apiBack+this.apiPostWishMovie+"/"+wishMovieToDel.idWish, {observe: 'response', responseType:'text'})
    this.http.delete(this.apiBack+this.apiPostWishTv, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "200") {
          wishTvToDel.idWish = null;
          /////// A VERIFIER !!! ///////
          // this._tvDetail$.next(wishTvToDel);
          this.alerteSvc.showAlert("Supprimé de la Wish liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

  ////////////////////////////// SERVICES WATCH //////////////////////////////

  postWatchTvToApi(postWatchTv: any) {
    return this.http.post(this.apiBack+this.apiPostWatchTv, postWatchTv, {observe: 'response', responseType: 'text'} );
  }

  delWatchThisTv(watchTvToDel:any) {
    let sendToApi = {idTv:watchTvToDel.idTv,};
    // this.http.delete(this.apiBack+this.apiPostWatchMovie+"/"+watchMovieToDel.idWatch, {observe: 'response', responseType: 'text'} )
    this.http.delete(this.apiBack+this.apiPostWatchTv, {body: sendToApi, observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
        
        if(response.status == "201") {
          watchTvToDel.idWatch = null;
          /////// A VERIFIER !!! ///////
          // this._tvDetail$.next(watchTvToDel);
          this.alerteSvc.showAlert("Supprimé de la Watch liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

}
