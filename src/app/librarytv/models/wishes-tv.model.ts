export class WishesTv {
  idWish: number;
  idTv: number;
  idEpisode: number;
  idSeason: number;
  

  constructor(wishesFromApi:any){

    this.idWish = wishesFromApi.idWish;
    this.idTv = wishesFromApi.idTv;
    this.idEpisode = wishesFromApi.idEpisode;
    this.idSeason = wishesFromApi.idSeason;

  }
}
