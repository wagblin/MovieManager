import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { RecoTv } from '../models/reco-tv.model';
import { RecoTvService } from '../services/reco-tv.service';

@Component({
  selector: 'app-overview-reco-tv',
  templateUrl: './overview-reco-tv.component.html',
  styleUrls: ['./overview-reco-tv.component.css']
})
export class OverviewRecoTvComponent {

  recoTvs:Array<RecoTv> = [];

  // Statut icône Wish
  _wishStatusIconOn: string = "fa-solid fa-bookmark fa-lg";
  _wishTitleIconOn: string = "Supprimer de la Wish liste";
  _wishStatusIconOff: string = "fa-regular fa-bookmark fa-lg";
  _wishTitleIconOff: string = "Ajouter à la Wish liste";

  // Statut icône Watch
  _watchStatusIconOn: string = "fa-solid fa-eye fa-lg"
  _watchTitleIconOn: string = "Restaurer 'Non Vu'"
  _watchStatusIconOff: string = "fa-regular fa-eye-slash fa-lg"
  _watchTitleIconOff: string = "Marquer comme 'Vus'"

  // Statut icône BlackList
  _blackStatusIconOn: string = "fa-solid fa-ban fa-lg";
  _blackTitleIconOn: string = "Ne plus recommander";

  subscriptionRecoTv:any;

  apiBack = environment.base_url_apiBack;
  apiBackGetDetailsFromApi = '/tv/detail/';

  constructor(
    private recoTvSvc:RecoTvService,
    private alerteSvc:AlertService,
    private http:HttpClient,
  ){this.recoTvSvc.refreshOnBlackListWatch$.subscribe(  () => { this.refreshOnBlackListTvComponent(); }  ); }

  async ngOnInit() {
    
    this.subscriptionRecoTv = await this.recoTvSvc.getRecoTv$()
      .subscribe( async (recoArr:RecoTv[]) => {
        if(recoArr.length===0) {
          this.recoTvSvc.getRecoTvFromApi();
        }
        this.recoTvs = recoArr.slice(0, 20);
        

        for (let tv of this.recoTvs){
          await this.http.get(this.apiBack+this.apiBackGetDetailsFromApi+tv.idTv)
          .toPromise()      
          .then( (response:any) => {
            // INIT icones wish, watch, blackList
            if (response.idWish !== null) {
              tv.idWish = response.idWish;
              tv._wishStatusIcon = this._wishStatusIconOn;
              tv._wishTitleIcon = this._wishTitleIconOn;
            } else {
              tv._wishStatusIcon = this._wishStatusIconOff;
              tv._wishTitleIcon = this._wishTitleIconOff;
            };
            if (response.idWatch !== null) {
              tv.idWatch = response.idWatch;
              tv._watchStatusIcon = this._watchStatusIconOn;
              tv._watchTitleIcon = this._watchTitleIconOn;
            } else {
              tv._watchStatusIcon = this._watchStatusIconOff;
              tv._watchTitleIcon = this._watchTitleIconOff;
            };
            tv._blackStatusIcon = this._blackStatusIconOn;
            tv._blackTitleIcon = this._blackTitleIconOn;
          });
          
        }  
        return;
      });

  }

  postBlackList(tv:RecoTv) {
    this.recoTvSvc.postBlackListTv(tv);
  }

  updateStatusWishIcon(tv:RecoTv) {
    if (tv._wishStatusIcon === this._wishStatusIconOn) {
      this.recoTvSvc.delWishThisTv(tv);
      this.setStatusWishIcon(tv, 0)
    }
    else {
      this.addWish(tv);
      this.setStatusWishIcon(tv, 1)
    }
  }

  updateStatusWatchIcon(tv:RecoTv) {
    if (tv._watchStatusIcon === this._watchStatusIconOn) {
      this.recoTvSvc.delWatchThisTv(tv);
      this.setStatusWatchIcon(tv, 0)
    }
    else {
      this.addWatch(tv);
      this.setStatusWatchIcon(tv, 1)
    }
  }

  setStatusWishIcon(tv:RecoTv , status: number) {
    if (status) {
      tv._wishStatusIcon = this._wishStatusIconOn;
      tv._wishTitleIcon = this._wishTitleIconOn;
    }
    else {
      tv._wishStatusIcon = this._wishStatusIconOff;
      tv._wishTitleIcon = this._wishTitleIconOff;
    }
  }

  setStatusWatchIcon(tv:RecoTv , status: number) {
    if (status) {
      tv._watchStatusIcon = this._watchStatusIconOn;
      tv._watchTitleIcon = this._watchTitleIconOn;
    }
    else {
      tv._watchStatusIcon = this._watchStatusIconOff;
      tv._watchTitleIcon = this._watchTitleIconOff;
    }
  }

  

  callTest(str:string) {
    this.alerteSvc.showAlert("Ajouté aux " + str + "!!!");
  }

  addWish(tv:RecoTv) {
    let sendToApi = { idTv:tv.idTv, };
    
    this.recoTvSvc.postWishTvToApi(sendToApi)
    .subscribe({
      next: (response:any)=>  {
        if(response.status = "201") {
          this.alerteSvc.showAlert("Ajouté à la Wish liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

  addWatch(tv:RecoTv) {
    let sendToApi = { idTv:tv.idTv,};

    this.recoTvSvc.postWatchTvToApi(sendToApi)
    .subscribe({
      next: (response:any) => {
        
        if(response.status = "201") {
          this.alerteSvc.showAlert("Ajouté à la Watch liste!")
        }
      },
      // error: error => console.error(error)
    });
  }

  refreshOnBlackListTvComponent(): void {
    this.subscriptionRecoTv.unsubscribe();
    this.subscriptionRecoTv = this.recoTvSvc.getRecoTv$()
    .subscribe( 
      (recoArr:RecoTv[]) => {
        if(recoArr.length===0) {
          this.recoTvSvc.getRecoTvFromApi();
        }
        this.recoTvs = recoArr.slice(0, 20);
      return;
    });
  }
            
  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500/"+urlFragment;
  }
  
  ngOnDestroy() {
    this.subscriptionRecoTv.unsubscribe();
  }

}
