interface Genre {
  id:number;
  name:string;
}

export class TrendTv {

  adult: boolean;
  backdropPath: string;
  idTv: number;
  title: string;
  originalLanguage: string;
  originalName: string;
  overview: string;
  posterPath: string;
  genres: Genre[] | any[];
  popularity: number;
  firstAirDate: Date;
  voteAverage: number;
  voteCount: number;
  
  idWatch: number;
  viewingPlace: string = "";
  viewingRate: number = 0;
  viewingMood: number = 0;
  dateWatch: Date;
  idWish: number;
  _wishStatusIcon: string = "fa-regular fa-bookmark fa-lg";
  _wishTitleIcon: string = "Ajouter à la Wish liste";
  _watchStatusIcon: string = "fa-regular fa-eye-slash fa-lg";
  _watchTitleIcon: string = "Marquer comme 'Vus'";
  _blackStatusIcon: string = "fa-solid fa-ban fa-lg";
  _blackTitleIcon: string = "Ne plus recommander";

  constructor(tvFromApi:any) {
    
    this.adult = tvFromApi.adult;
    this.backdropPath = tvFromApi.backdrop_path;
    this.idTv = tvFromApi.id;
    this.title = tvFromApi.name;
    this.originalLanguage = tvFromApi.original_language;
    this.originalName = tvFromApi.original_name;
    this.overview = tvFromApi.overview;
    this.posterPath = tvFromApi.poster_path;
    this.genres = tvFromApi.genres?tvFromApi.genres:[];
    this.popularity = tvFromApi.popularity;
    this.firstAirDate = tvFromApi.first_air_date;
    this.voteAverage = tvFromApi.vote_average;
    this.voteCount = tvFromApi.vote_count;

    this.idWatch = tvFromApi.idWatch;
    this.idWish = tvFromApi.idWish;
    this.viewingPlace = tvFromApi.viewingPlace;
    this.viewingRate = tvFromApi.viewingRate;
    this.viewingMood = tvFromApi.viewingMood;
    this.dateWatch = tvFromApi.dateWatch;

  } 
  
}
