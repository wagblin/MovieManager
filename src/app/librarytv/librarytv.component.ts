import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-librarytv',
  templateUrl: './librarytv.component.html',
  styleUrls: ['./librarytv.component.css']
})
export class LibrarytvComponent {

  isAuth: boolean = this.userService.isAuth();

  constructor(public userService:UserService) {}

}
