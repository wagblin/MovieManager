import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TvService } from 'src/app/services/tv.service';
import { WishService } from 'src/app/services/wish.service';
import { TvModel } from '../../discovertv/models/tv.model';
import { WishesTv } from '../models/wishes-tv.model';

@Component({
  selector: 'app-overview-wish-tv',
  templateUrl: './overview-wish-tv.component.html',
  styleUrls: ['./overview-wish-tv.component.css'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewWishTvComponent {

  wishTvs:Array<WishesTv> = [];
  subscriptionWishesTv:any;

  tvsWish:Array<TvModel>=[];
  subscriptionTvWish:any;

  constructor(
    private wishSvc:WishService,
    public tvSvcWish:TvService,
  ){
  }

  ngOnInit() {
    
    this.subscriptionWishesTv = this.wishSvc.getWishesTv$()
    .subscribe(
      (wishesArr:WishesTv[]) => {        
          if(wishesArr.length===0) {
            this.wishSvc.getWishTvsFromApi();
          }
          this.wishTvs = wishesArr
          for (let wish of this.wishTvs) {
            this.tvSvcWish.getDetailsWishFromApi(wish.idTv);
          }
        }
      );
    
    this.subscriptionTvWish = this.tvSvcWish.getTvWishDetail$()
      .subscribe(
        (tvWish:TvModel) => {
          if (tvWish.id ){
            this.tvsWish.push(tvWish);
          }
        }
      );
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWishesTv.unsubscribe();
    this.subscriptionTvWish.unsubscribe();
  }


}
