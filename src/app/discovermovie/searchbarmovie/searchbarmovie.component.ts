import { Component } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-searchbarmovie',
  templateUrl: './searchbarmovie.component.html',
  styleUrls: ['./searchbarmovie.component.css']
})
export class SearchbarmovieComponent {

  searchedMovies:Movie[] =[];

  constructor(private movieSvc:MovieService) {  }

  ngOnInit() {
    this.movieSvc.getSearchedMovies$()
    .subscribe ( (foundMovies:Movie[] ) => this.searchedMovies = foundMovies  );
  }

  onKeyupInput(userSearch:string) {
    
    if (userSearch.length == 0) {
      this.movieSvc.setSearchMovies$([]);
    }
    else {
      this.movieSvc.searchMoviesFromApi(userSearch);
    }
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    this.movieSvc.setSearchMovies$([]);
  }

}
