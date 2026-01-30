import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WatchesTv } from '../librarytv/models/watches-tv.model';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  _apiBack = environment.base_url_apiBack;

  _apiGetWatchTvs:string = '/tv/watchlist';
  _apiGetAllWatchTv:string = "/watch/episode/all";
  _apiGetListWatchTv:string = "/tv/watchlist";

  _apiPostWatchTv:string = '/watch/tv';
  _apiPostWatchEpisodeOfSeason:string = "/watch/season"
  _apiPostWatchEpisode: string = "/watch/episode"
  
  _apiDelWatchTv:string = '/watch/tv';
  _apiDeleteWatchEpisodeOfSeason:string = "/watch/season";
  _apiDeleteWatchEpisode:string = "/watch/episode"


  
  private _watchesTv$:BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(
    private http:HttpClient,
  ) {}

  getWatchTvsFromApi() {
    
    this.http.get(this._apiBack+this._apiGetWatchTvs)

    .pipe(
      map((apiResponse:any) => {
        return apiResponse.map( (watch: any) => new WatchesTv(watch) );
      })
    )
    
    .subscribe((watches:WatchesTv[]) => {
      // let actualWatches = this._watchesTv$.getValue();
      // let allWatches:any = [...actualWatches, ...watches]
      // if (allWatches.length !== 0){ 
      //   this._watchesTv$.next(allWatches);
      // }
      if (watches.length !== 0){ 
        this._watchesTv$.next(watches);
      }
    });    
  }
  
  getWatchesTv$():Observable<WatchesTv[]> {
    this._watchesTv$.next([])
    return this._watchesTv$.asObservable();
  }
  
  postWatchTvToApi(postWatchTv: any) {
    return this.http.post(this._apiBack+this._apiPostWatchTv, postWatchTv, {observe: 'response', responseType: 'text'} );
  }

  postAllWatchEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.post(this._apiBack+this._apiPostWatchTv, data);
  }

  deleteAllWatchEpisodesToApi(idTv:number) {
    let data = {idTv:idTv}
    return this.http.delete(this._apiBack+this._apiDelWatchTv, {body: data});
  }

  postAllWatchEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.post(this._apiBack+this._apiPostWatchEpisodeOfSeason, data);
  }

  deleteAllWatchEpisodesOfSeasonToApi(idTv: number, idSeason: number) {
    let data = {idTv: idTv, idSeason: idSeason}
    return this.http.delete(this._apiBack+this._apiDeleteWatchEpisodeOfSeason, {body: data});
  }

  postWatchEpisodeToApi(idTv:number, idSeason: number, idEpisode: number) {
    let data = {idTv:idTv, idSeason:idSeason, idEpisode:idEpisode}
    return this.http.post(this._apiBack+this._apiPostWatchEpisode, data);
  }

  deleteWatchEpisodeToApi(watchIdToDelete:number) {
    let data = {watchIdToDelete}
    return this.http.delete(this._apiBack+this._apiDeleteWatchEpisode, {body: data} );
  }

  getWatchIdTv(){ 
    // renvoie la liste des séries qui ont un WatchId
    return this.http.get(this._apiBack + this._apiGetListWatchTv);    
  }

  getAllWatchId(){
    return this.http.get(this._apiBack + this._apiGetAllWatchTv); 
  }



}
