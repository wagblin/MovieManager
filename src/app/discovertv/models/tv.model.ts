interface Genre {
    id:number;
    name:string;
}

export class TvModel {

    id: number;
    firstAirDate: Date;
    titre: string;
    resume: string;
    image_portrait: string;
    image_landscape: string;
    score: number;
    date: Date;
    duration: number;
    genres: Genre[] | any[];

    idWish: any;
    idWatch: any;

    constructor(tvFromApi:any) {
        this.id = tvFromApi.id;
        this.firstAirDate = tvFromApi.first_air_date;
        this.titre = tvFromApi.name;
        this.resume = tvFromApi.overview;
        this.image_portrait = tvFromApi.poster_path;
        this.image_landscape = tvFromApi.backdrop_path;
        this.score = tvFromApi.vote_average;
        this.date = tvFromApi.release_date;
        this.duration = tvFromApi.runtime? tvFromApi.runtime : 0;
        this.genres = tvFromApi.genres?tvFromApi.genres:[];

        this.idWish = null;
        this.idWatch = null;
    }

    set setIdWish(idWish:any) {
        this.idWish = idWish;
    }

    set setIdWatch(idWatch:any) {
        this.idWatch = idWatch;
    }
}

