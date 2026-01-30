export interface UserModel {
    email: string;
    password: string;
}

export interface CreateUserModelIam {
    email: string;
    password: string;
    loginName: string;
}

export interface GenreMovieModel {
    id: number;
}
export interface GenreTvModel {
    id: number;
}
export interface StreamingModel {
    id: number;
}

export class CreateUserModel    {
    
    userName: string;
    email: string;
    birthYear: number;
    adultContent: boolean;
    enableAccount: boolean;
    genreMovieDtoSet: GenreMovieModel[] | any[];
    genreTvDtoSet: GenreTvModel[] | any[];
    streamingSubscriptionDtoSet: StreamingModel[] | any[];

    constructor(postCreateUserToApi:any) {
        this.userName = postCreateUserToApi.userName;
        this.email = postCreateUserToApi.email;
        this.birthYear = postCreateUserToApi.birthYear;
        this.adultContent = postCreateUserToApi.adultContent;
        this.enableAccount = postCreateUserToApi.enableAccount;
        this.genreMovieDtoSet = postCreateUserToApi.genreMovieDtoSet?postCreateUserToApi.genreMovieDtoSet:[];
        this.genreTvDtoSet = postCreateUserToApi.genreTvDtoSet?postCreateUserToApi.genreTvDtoSet:[];
        this.streamingSubscriptionDtoSet = postCreateUserToApi.streamingSubscriptionDtoSet?postCreateUserToApi.streamingSubscriptionDtoSet:[];

    }

}