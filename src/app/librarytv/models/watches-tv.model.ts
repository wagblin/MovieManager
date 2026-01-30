export class WatchesTv {
  idWatch: number;
  viewingPlace: string;
  viewingRate: number;
  viewingMood: number;
  idTv: number;
  idEpisode: number;
  idSeason: number;

  constructor(watchesFromApi:any){

    this.idWatch = watchesFromApi.idWatch;
    this.viewingPlace = watchesFromApi.viewingPlace;
    this.viewingRate = watchesFromApi.viewingRate;
    this.viewingMood = watchesFromApi.viewingMood;
    this.idTv = watchesFromApi.idTv;
    this.idEpisode = watchesFromApi.idEpisode;
    this.idSeason = watchesFromApi.idSeason;
    
  }


}
