import { Component } from '@angular/core';
import { TvService } from '../../services/tv.service';
import { TvModel } from '../models/tv.model';

@Component({
  selector: 'app-searchbartv',
  templateUrl: './searchbartv.component.html',
  styleUrls: ['./searchbartv.component.css']
})
export class SearchbartvComponent {

  searchedtvs:TvModel[] =[];

  constructor(private tvSvc:TvService) {  }

  ngOnInit() {
    this.tvSvc.getSearchedTvs$()
    .subscribe ( (foundtvs:TvModel[] ) => this.searchedtvs = foundtvs  );
  }

  onKeyupInput(userSearch:string) {
    
    if (userSearch.length == 0) {
      this.tvSvc.setSearchTvs$([]);
    }
    else {
      this.tvSvc.searchTvsFromApi(userSearch);
    }
  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  ngOnDestroy() {
    this.tvSvc.setSearchTvs$([]);
  }

}
