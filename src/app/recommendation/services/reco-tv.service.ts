import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { RecoTv } from '../models/reco-tv.model';

@Injectable({
  providedIn: 'root'
})
export class RecoTvService {

  private refreshOnBlackListWatchSubject = new Subject<void>();
  
  apiBack = environment.base_url_apiBack;
  apiGetRecoTvs:string = '/recommendation/tv';
  apiPostBlackListTv:string = '/blacklist/tv';
  apiPostWishTv:string = '/wish/tv';
  apiPostWatchTv:string = '/watch/tv';
  private _recoTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
    private alerteSvc:AlertService,
  ) { }

  get refreshOnBlackListWatch$() {
    return this.refreshOnBlackListWatchSubject.asObservable();
  }
  triggerOnBlackListWatchRefresh() {
    this.refreshOnBlackListWatchSubject.next();
  }

  getRecoTvFromApi(){

    this.http.get(this.apiBack+this.apiGetRecoTvs)
    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (reco: any) => new RecoTv(reco) );
      })
    )
    .subscribe((recos:RecoTv[]) => {

      // let actualRecos = this._recoTv$.getValue();
      // let allRecos:any = [...actualRecos, ...recos]
      // if (allRecos.length !== 0){
      //   this._recoTv$.next(allRecos);
      // }
      if (recos.length !== 0){
        this._recoTv$.next(recos);
      }
    });  
  }
  getRecoTv$ ():Observable<RecoTv[]> {
    this._recoTv$.next([])
    return this._recoTv$.asObservable();
  }

 ////////////////////////////// SERVICES WISH //////////////////////////////


  postWishTvToApi(postWishTv: any) {
    return this.http.post(this.apiBack+this.apiPostWishTv, postWishTv, {observe: 'response', responseType: 'text'});
  }

  delWishThisTv(wishTvToDel: RecoTv) {
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

  delWatchThisTv(watchTvToDel:RecoTv) {
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


  ////////////////////////////// SERVICES BLACKLIST //////////////////////////////
  postBlackListTv(tvToBlackList:RecoTv) {
    let sendToApi = {idContent:tvToBlackList.idTv,};
    
    
    this.http.post(this.apiBack+this.apiPostBlackListTv, sendToApi ,{observe: 'response', responseType:'text'} )
    .subscribe({
      next: (response:any) => {
    
        if(response.status == "200") {
          this.alerteSvc.showAlert("Ajouté à la Black liste!")
          this.triggerOnBlackListWatchRefresh();
        }
      },
      // error: error => console.error(error)
    });

  }

}
