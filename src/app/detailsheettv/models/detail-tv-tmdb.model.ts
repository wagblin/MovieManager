interface tvGenreTmdbInterface {
    id:number;
    name:string;
}

// interface tvSeasonTmdbInterface {
//   id:number;
//   airDate:Date;
//   posterPath: string;
//   seasonNumber: number;
//   episodeCount: number;
//   overview: string;
// }

export class DetailTvTmdbModel {

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

  numFirstSeason: number; // pour savoir si la 1ère saison a le n° 0 ou 1

  genres: tvGenreTmdbInterface[] | any[];
  seasons: DetailSeasonTmdbModel[] | any[];
  
  constructor(tvFromApiTmdb:any) {

    this.id = tvFromApiTmdb.id;
    this.firstAirDate = tvFromApiTmdb.first_air_date;
    this.lastAirDate = tvFromApiTmdb.last_air_date;
    this.homePage = tvFromApiTmdb.homepage;
    this.title = tvFromApiTmdb.original_name;
    this.resume = tvFromApiTmdb.overview;
    this.popularity = tvFromApiTmdb.popularity;
    this.backdropPath = tvFromApiTmdb.backdrop_path;
    this.posterPath = tvFromApiTmdb.poster_path;
    this.nbEpisodes = tvFromApiTmdb.number_of_episodes;
    this.nbSeasons = tvFromApiTmdb.number_of_seasons;
    this.voteAverage = tvFromApiTmdb.vote_average;
    this.voteCount = tvFromApiTmdb.vote_count;
    this.status = tvFromApiTmdb.status;

    this.numFirstSeason = tvFromApiTmdb.seasons[0].season_number;
    
    this.genres = tvFromApiTmdb.genres?tvFromApiTmdb.genres:[];
    // this.seasons = tvFromApiTmdb.seasons?tvFromApiTmdb.seasons:[];
    this.seasons = tvFromApiTmdb.seasons?tvFromApiTmdb.seasons.map((season: any) => new DetailSeasonTmdbModel(season)):[];
  }
    
}

export class DetailSeasonTmdbModel {

  id: number;
  airDate: Date;
  posterPath: string;
  seasonNumber: number;
  overview: string;
  // name: string;

  episodes: DetailEpisodeTmdbModel[] | any[];

  constructor(seasonsFromApiTmdb:any) {

    this.id = seasonsFromApiTmdb.id;
    this.airDate = seasonsFromApiTmdb.air_date;
    this.posterPath = seasonsFromApiTmdb.poster_path;
    this.overview = seasonsFromApiTmdb.overview;
    this.seasonNumber = seasonsFromApiTmdb.season_number;
    // this.name = seasonsFromApiTmdb.name;

    this.episodes = seasonsFromApiTmdb.episodes?seasonsFromApiTmdb.episodes.map((episode: any) => new DetailEpisodeTmdbModel(episode)):[];
  }


}

export class DetailEpisodeTmdbModel {
  id: number;
  episodeNumber: number;
  overview: string;
  airDate: Date;
  serieId: number;
  seasonNumber: number;
  stillPath: string;
  voteAverage: number;
  voteCount: number;

  constructor(episodeFromApiTmdb:any) {
    this.id = episodeFromApiTmdb.id;
    this.episodeNumber = episodeFromApiTmdb.episode_number;
    this.overview = episodeFromApiTmdb.overview;
    this.airDate = episodeFromApiTmdb.air_date;
    this.serieId = episodeFromApiTmdb.show_id;
    this.seasonNumber = episodeFromApiTmdb.season_number;
    this.stillPath = episodeFromApiTmdb.still_path;
    this.voteAverage = episodeFromApiTmdb.vote_average;
    this.voteCount = episodeFromApiTmdb.vote_count;
  }

}





