import { Component } from '@angular/core';
import { TvService } from '../../services/tv.service';

@Component({
  selector: 'app-actionbartv',
  templateUrl: './actionbartv.component.html',
  styleUrls: ['./actionbartv.component.css']
})
export class ActionbartvComponent {

  tvs:Array<any> =[];

  constructor(private tvSvc:TvService) {
  }

  onClickSuivants() {
    this.tvSvc.getTvsFromApi();
  }

}
