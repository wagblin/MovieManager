import { Component, ViewEncapsulation } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { WatchService } from 'src/app/services/watch.service';
import { TvModel } from '../../discovertv/models/tv.model';
import { WatchesTv } from '../models/watches-tv.model';

@Component({
  selector: 'app-overview-watch-tv',
  templateUrl: './overview-watch-tv.component.html',
  styleUrls: ['./overview-watch-tv.component.css'],
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  // changeDetection: ChangeDetectionStrategy.Default,
})
export class OverviewWatchTvComponent {

  watchTvs:Array<WatchesTv> = [] ;
  subscriptionWatchesTv:any;

  tvsWatch:Array<TvModel>=[];
  subscriptionTvWatch:any;

  constructor(
    private watchSvc:WatchService,
    public tvSvcWatch:TvService,
  ) {}

  ngOnInit() {

    this.subscriptionWatchesTv = this.watchSvc.getWatchesTv$()
      .subscribe(
        (watchesArr:WatchesTv[]) => {
          if(watchesArr.length===0) {
            this.watchSvc.getWatchTvsFromApi();
          }
          this.watchTvs = watchesArr
          for (let watch of this.watchTvs) {
            this.tvSvcWatch.getDetailsWatchFromApi(watch.idTv);
          }
        }
      );
    
    this.subscriptionTvWatch = this.tvSvcWatch.getTvWatchDetail$()
    .subscribe(
      (tvWatch:TvModel) => {      
        if (tvWatch.id){
          this.tvsWatch.push(tvWatch);
        }
      }
    );
  }

  getImgFullUrl(urlFragment:string):string {
    // https://image.tmdb.org/t/p/w500/faXT8V80JRhnArTAeYXz0Eutpv9.jpg
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }

  ngOnDestroy() {
    this.subscriptionWatchesTv.unsubscribe();
    this.subscriptionTvWatch.unsubscribe();
  }

}
