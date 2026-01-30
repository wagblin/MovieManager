interface tvGenreMmaInterface {
    id:number;
    name:string;
}

export class DetailTvMmaModel {

  id: number;
  firstAirDate: Date;
  lastAirDate: Date;
  homePage: string;
  title: string;
  resume: string;
  popularity: number;
  backdropPath: string;
  posterPath: string;
  nbEpisodes: number;
  nbSeasons: number;
  voteAverage: number;
  voteCount: number;
  status:string;

  idWatch: number;
  idWish: number;

  numFirstSeason: number; // pour savoir si la 1ère saison a le n° 0 ou 1

  genres: tvGenreMmaInterface[] | any[];
  seasons: DetailSeasonMmaModel[] | any[];
  
  constructor(tvFromApiMma:any) {

    this.id = tvFromApiMma.idTv;
    this.firstAirDate = tvFromApiMma.firstAirDate;
    this.lastAirDate = tvFromApiMma.lastAirDate;
    this.homePage = tvFromApiMma.homepage;
    this.title = tvFromApiMma.originalName;
    this.resume = tvFromApiMma.overview;
    this.popularity = tvFromApiMma.popularity;
    this.backdropPath = tvFromApiMma.backdropPath;
    this.posterPath = tvFromApiMma.posterPath;
    this.nbEpisodes = tvFromApiMma.numberOfEpisodes;
    this.nbSeasons = tvFromApiMma.numberOfSeasons;
    this.voteAverage = tvFromApiMma.voteAverage;
    this.voteCount = tvFromApiMma.voteCount;
    this.status = tvFromApiMma.status;

    this.idWatch = tvFromApiMma.idWatch;
    this.idWish = tvFromApiMma.idWish;

    this.numFirstSeason = tvFromApiMma.seasonDtoList[0].seasonNumber;
    
    this.genres = tvFromApiMma.genreTvDtoList?tvFromApiMma.genreTvDtoList:[];
    // this.seasons = tvFromApiMma.seasons?tvFromApiMma.seasons:[];
    this.seasons = tvFromApiMma.seasonDtoList?tvFromApiMma.seasonDtoList.map((season: any) => new DetailSeasonMmaModel(season)):[];
  }
    
}

export class DetailSeasonMmaModel {

  id: number;
  airDate: Date;
  posterPath: string;
  seasonNumber: number;
  overview: string;

  idWatch: number;
  idWish: number;

  episodes: DetailEpisodeMmaModel[] | any[];

  constructor(seasonsFromApiMma:any) {

    this.id = seasonsFromApiMma.idSeason;
    this.airDate = seasonsFromApiMma.airDate;
    this.posterPath = seasonsFromApiMma.posterPath;
    this.overview = seasonsFromApiMma.overview;
    this.seasonNumber = seasonsFromApiMma.seasonNumber;

    this.idWatch = seasonsFromApiMma.idWatch;
    this.idWish = seasonsFromApiMma.idWish;

    this.episodes = seasonsFromApiMma.episodeDtoList?seasonsFromApiMma.episodeDtoList.map((episode: any) => new DetailEpisodeMmaModel(episode)):[];
  }


}

export class DetailEpisodeMmaModel {

  id: number;
  episodeNumber: number;
  overview: string;
  airDate: Date;
  serieId: number;
  seasonNumber: number;
  stillPath: string;
  voteAverage: number;
  voteCount: number;

  idWatch: number;
  idWish: number;

  constructor(episodeFromApiMma:any) {

    this.id = episodeFromApiMma.idEpisode;
    this.episodeNumber = episodeFromApiMma.episodeNumber;
    this.overview = episodeFromApiMma.overview;
    this.airDate = episodeFromApiMma.airDate;
    this.serieId = episodeFromApiMma.seriesId;
    this.seasonNumber = episodeFromApiMma.seasonNumber;
    this.stillPath = episodeFromApiMma.stillPath;
    this.voteAverage = episodeFromApiMma.voteAverage;
    this.voteCount = episodeFromApiMma.voteCount;

    this.idWatch = episodeFromApiMma.idWatch;
    this.idWish = episodeFromApiMma.idWish;
  }

}





