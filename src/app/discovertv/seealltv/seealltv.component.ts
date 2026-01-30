import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { TvService } from 'src/app/services/tv.service';
import { UserService } from 'src/app/services/user.service';
import { WatchService } from 'src/app/services/watch.service';
import { WishService } from 'src/app/services/wish.service';
import { TvModel } from '../models/tv.model';

interface watchSerieInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
}
interface wishSerieInterface {
  cssIconOn: string;
  cssIconTitleOn: string;
}
@Component({
  selector: 'app-seealltv',
  templateUrl: './seealltv.component.html',
  styleUrls: ['./seealltv.component.css']
})
export class SeealltvComponent {

  tvs:Array<TvModel> =[];
  subscription:any;
  isAuth: boolean = this.userService.isAuth();
  
  mapWatchSerie: Map<number,watchSerieInterface> = new Map<number,watchSerieInterface>(); // tous les series watch
  mapWishSerie: Map<number,wishSerieInterface> = new Map<number,wishSerieInterface>(); // tous les series wish

    // Statut des icônes Wish d'une série
    _wishStatusIconSerieOn: string = "fa-solid fa-bookmark fa-lg"
    _wishStatusIconSerieOff: string = "fa-regular fa-bookmark fa-lg"
    _wishTitleIconSerieOn: string = "Supprimer tous les épisodes la Wish liste"
    _wishTitleIconSerieOff: string = "Ajouter tous les épisodes à la Wish liste"
   
    // Statut des icônes Watch d'une série
    _watchStatusIconSerieOn: string = "fa-sharp fa-solid fa-eye fa-lg"
    _watchStatusIconSerieOff: string = "fa-regular fa-eye-slash fa-lg"
    _watchTitleIconSerieOn: string = "Restaurer tous les épisodes comme 'Non Vu'"
    _watchTitleIconSerieOff: string = "Marquer tous les épisodes comme 'Vu'"

  constructor(
    private tvSvc:TvService, 
    private alerteService:AlertService,
    public wishService: WishService,
    public watchService: WatchService,
    public userService: UserService) {
  }

  ngOnInit() {

    this.subscription = this.tvSvc.getTvs$()
      .subscribe( (tvsArr:TvModel[]) => {

          if(tvsArr.length===0) {
            this.tvSvc.getTvsFromApi();
            // récupère tous les wish de la série
          }
          this.tvs = tvsArr

          if (this.isAuth) this.buildMapIconesSeries();
    });



  }

  getImgFullUrl(urlFragment:string):string {
    return "https://image.tmdb.org/t/p/w500"+urlFragment;
  }

  callTest(str:string) {
    this.alerteService.showAlert("Ajouté aux " + str + "!!!");
  }

  // BUILD map Wish/Watch Serie <-> Btn css active
  buildMapIconesSeries() {

    this.mapWatchSerie.clear();
    this.mapWishSerie.clear();

    // API pour récupérer tous les series Wish
    // https://redline.fr.nf/api/v1/tv/wishlist
    this.wishService.getWishIdTv().subscribe({
      next: (response:any) => {
        for (let wish of response) {
          // on stocke toutes les séries
          this.mapWishSerie.set(wish.idTv, {
              cssIconOn: this._wishStatusIconSerieOn,
              cssIconTitleOn: this._wishTitleIconSerieOn
          })         
        }
      },
      // error: error => console.error(error)
    })
    
    // API pour récupérer tous les episodes Watch
    // https://redline.fr.nf/api/v1/tv/watchlist
    this.watchService.getWatchIdTv().subscribe({
      next: (response:any) => {
        for (let watch of response) {
          // on ne prend que les watch de la série
            this.mapWatchSerie.set(watch.idTv, {
              cssIconOn: this._watchStatusIconSerieOn,
              cssIconTitleOn: this._watchTitleIconSerieOn,
            })
        }
      },
      // error: error => console.error(error)
    })
    
  }


  ///////////////////////
  // GESTION Icones WISH
  ///////////////////////

  updateStatusWishSerie(idTv: number) {

    // Recherche du statut de l'icône dans la map wish serie
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWishSerie.has(idTv) ) {
      this.delWishSerie(idTv)
    }
    else {
      this.addAllWishSerie(idTv)
    }
  }

  delWishSerie(idTv: number) {

    this.wishService.deleteAllWishEpisodesToApi(idTv)
    .subscribe({
      next: (response:any)=> {
        
        // MAJ de la map des wish serie
        this.mapWishSerie.delete(idTv)
        this.alerteService.showAlert("Tous les épisodes de cette série ont été supprimés de la Wish liste");
      },
      // error: error => console.error(error)
    });

  }

  addAllWishSerie(idTv: number) {

    this.wishService.postAllWishEpisodesToApi(idTv)
    .subscribe({
      next: (response:any)=> {
        
        // MAJ de la map des wish serie
        this.mapWishSerie.set(idTv, {
          cssIconOn: this._wishStatusIconSerieOn,
          cssIconTitleOn: this._wishTitleIconSerieOn,
        })

        this.alerteService.showAlert("Tous les épisodes de cette saison ont été ajoutés à la Wish liste");
        
      },
      // error: error => console.error(error)
    });

  }

  ////////////////////////
  // GESTION Icones Watch
  ////////////////////////

  updateStatusWatchSerie(idTv: number) {

    // Recherche du statut de l'icône dans la map watch serie
    // => S'il n'est pas présent dans la map c'est que l'icône est à off
    if ( this.mapWatchSerie.has(idTv) ) {
      this.delWatchSerie(idTv)
    }
    else {
      this.addAllWatchSerie(idTv)
    }
  }

  delWatchSerie(idTv: number) {

    this.watchService.deleteAllWatchEpisodesToApi(idTv)
    .subscribe({
      next: (response:any)=> {
        
        // MAJ de la map des watch serie
        this.mapWatchSerie.delete(idTv)
        this.alerteService.showAlert("Tous les épisodes de cette série ont été restaurés à 'Non Vu'");
      },
      // error: error => console.error(error)
    });

  }

  addAllWatchSerie(idTv: number) {

    this.watchService.postAllWatchEpisodesToApi(idTv)
    .subscribe({
      next: (response:any)=> {
        
        // MAJ de la map des wish serie
        this.mapWatchSerie.set(idTv, {
          cssIconOn: this._watchStatusIconSerieOn,
          cssIconTitleOn: this._watchTitleIconSerieOn,
        })

        this.alerteService.showAlert("Tous les épisodes de cette série ont été marqués comme 'Vu'");
        
      },
      // error: error => console.error(error)
    });

  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}