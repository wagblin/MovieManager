import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialExampleModule } from 'src/material.module';

import { ConnexionComponent } from './connexion/connexion.component';
import { CreateUserAccountComponent } from './connexion/create-user-account/create-user-account.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { PrintDurationPipe } from './shared/pipes/print-duration.pipe';

import { RecommendationComponent } from './recommendation/recommendation.component';
import { OverviewRecoTvComponent } from './recommendation/overview-reco-tv/overview-reco-tv.component';
import { OverviewRecoMovieComponent } from './recommendation/overview-reco-movie/overview-reco-movie.component';

import { DiscovermovieComponent } from './discovermovie/discovermovie.component';
import { ActionbarmovieComponent } from './discovermovie/actionbarmovie/actionbarmovie.component';
import { SearchbarmovieComponent } from './discovermovie/searchbarmovie/searchbarmovie.component';
import { SeeallmovieComponent } from './discovermovie/seeallmovie/seeallmovie.component';

import { DiscovertvComponent } from './discovertv/discovertv.component';
import { ActionbartvComponent } from './discovertv/actionbartv/actionbartv.component';
import { SearchbartvComponent } from './discovertv/searchbartv/searchbartv.component';
import { SeealltvComponent } from './discovertv/seealltv/seealltv.component';

import { LibrarymovieComponent } from './librarymovie/librarymovie.component';
import { OverviewWatchMovieComponent } from './librarymovie/overview-watch-movie/overview-watch-movie.component';
import { OverviewWishMovieComponent } from './librarymovie/overview-wish-movie/overview-wish-movie.component';

import { LibrarytvComponent } from './librarytv/librarytv.component';
import { OverviewWatchTvComponent } from './librarytv/overview-watch-tv/overview-watch-tv.component';
import { OverviewWishTvComponent } from './librarytv/overview-wish-tv/overview-wish-tv.component';

import { DetailsheetmovieComponent } from './detailsheetmovie/detailsheetmovie.component';
import { DetailsheettvComponent } from './detailsheettv/detailsheettv.component';
import { TrendingComponent } from './trending/trending.component';
import { OverviewTrendMovieComponent } from './trending/overview-trend-movie/overview-trend-movie.component';
import { OverviewTrendTvComponent } from './trending/overview-trend-tv/overview-trend-tv.component';

@NgModule({
  declarations: [
    AppComponent,

    ConnexionComponent,
    CreateUserAccountComponent,
    PrintDurationPipe,

    RecommendationComponent,
    OverviewRecoMovieComponent,
    OverviewRecoTvComponent,

    DiscovermovieComponent,
    ActionbarmovieComponent,
    SearchbarmovieComponent,
    SeeallmovieComponent,

    DiscovertvComponent,
    ActionbartvComponent,
    SearchbartvComponent,
    SeealltvComponent,

    LibrarymovieComponent,
    OverviewWatchMovieComponent,
    OverviewWishMovieComponent,
    
    LibrarytvComponent,
    OverviewWatchTvComponent,
    OverviewWishTvComponent,

    DetailsheetmovieComponent,
    DetailsheettvComponent,
    TrendingComponent,
    OverviewTrendMovieComponent,
    OverviewTrendTvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatSnackBarModule,

    MaterialExampleModule,
    FormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
