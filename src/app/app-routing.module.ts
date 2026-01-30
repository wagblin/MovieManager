import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { DiscovermovieComponent } from './discovermovie/discovermovie.component';
import { DiscovertvComponent } from './discovertv/discovertv.component';
import { LibrarymovieComponent } from './librarymovie/librarymovie.component';
import { LibrarytvComponent } from './librarytv/librarytv.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { DetailsheetmovieComponent } from './detailsheetmovie/detailsheetmovie.component';
import { DetailsheettvComponent } from './detailsheettv/detailsheettv.component';
import { CreateUserAccountComponent } from './connexion/create-user-account/create-user-account.component';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
  {
    path:'', component:TrendingComponent
  },
  {
    path:'connexion', component:ConnexionComponent
  },
  {
    path:'inscription', component:CreateUserAccountComponent
  },
  {
    path:'tendance', component:TrendingComponent
  },
  {
    path:'recommendation', component:RecommendationComponent
  },
  {
    path:'discovermovie', component:DiscovermovieComponent
  },
  {
    path:'discovertv', component:DiscovertvComponent
  },
  {
    path:'librarymovie', component:LibrarymovieComponent
  },
  {
    path:'librarytv', component:LibrarytvComponent
  },
  {
    path:'detailmovie/:id', component:DetailsheetmovieComponent
  },
  {
    path:'detailtv/:id', component:DetailsheettvComponent
  },
  {
    path:'**', component:TrendingComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
