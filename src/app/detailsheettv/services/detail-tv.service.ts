import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DetailTvMmaModel } from '../models/detail-tv-mma.model';
import { DetailEpisodeTmdbModel, DetailSeasonTmdbModel, DetailTvTmdbModel } from '../models/detail-tv-tmdb.model';

@Injectable({
  providedIn: 'root'
})
export class DetailTvService {


  
  // API TMDB
  apiKeyTmdb = environment.apiKey_apiTmdb;
  apiSerieTmdb = environment.base_url_apiTmdb+'/tv/';
  
  // APIs MMA
  apiBack = environment.base_url_apiBack;
  apiSerieMma = this.apiBack + "/tv/detail/"

  // Observables
  private _serieDetail$ = new BehaviorSubject<DetailTvTmdbModel | any>({});
  private _seasonDetail$: BehaviorSubject<any> = new BehaviorSubject([]);


  constructor(private http:HttpClient) {}

  getDetailsFromApiMma(idTv:number):void {

    this._seasonDetail$.next([]);

    

    this.http.get(this.apiSerieMma + idTv)
    .pipe(
      map((apiSerieMmaResponse:any)=> new DetailTvMmaModel(apiSerieMmaResponse))
    )
    .subscribe( (serie:DetailTvMmaModel) => {
      
      
      this._serieDetail$.next(serie);
      this._seasonDetail$.next(serie.seasons);
      

    });

  }

  getDetailsFromApiTmdb(idTv:number):void {
  // Infos générales de la série

    this._seasonDetail$.next([]);

    let params = new HttpParams()
    .set('api_key', this.apiKeyTmdb)
    .set('language', 'fr-FR')

    this.http.get(this.apiSerieTmdb + idTv, {params})
    .pipe(
      map((apiTmdbResponse:any)=> new DetailTvTmdbModel(apiTmdbResponse))
    )
    .subscribe( (serie:DetailTvTmdbModel) => {
      
      
      for (let i = serie.numFirstSeason; i <= serie.nbSeasons; i++ ) {
        
        this.getSeasonDetailsFromApiTmdb(idTv, i)
      }
      this._serieDetail$.next(serie);
      
      
    });

  }

  getSeasonDetailsFromApiTmdb(idTv:number, seasonNum:number):void {
  // Infos sur la saison et ses épisodes

      let params = new HttpParams()
      .set('api_key', this.apiKeyTmdb)
      .set('language', 'fr-FR')

      
      this.http.get(this.apiSerieTmdb + idTv + "/season/" + seasonNum, {params})
      .pipe(
        map((seasons:any) => {
          if (!Array.isArray(seasons)) {
            seasons = [seasons];
          }
          return seasons.map( (season: any) => new DetailSeasonTmdbModel(season)) })
      )
      .subscribe( (seasons:DetailSeasonTmdbModel[]) => {
        // next:
        let actualSeasons = this._seasonDetail$.getValue();
        let allSeasons:any = [...actualSeasons, ...seasons];
        this._seasonDetail$.next(allSeasons);
        
      });
  }

  get serieDetail$():Observable<DetailTvTmdbModel> {
    return this._serieDetail$.asObservable();
  }

  get seasonDetail$():Observable<DetailSeasonTmdbModel[]> {
    return this._seasonDetail$.asObservable();
  }
}
