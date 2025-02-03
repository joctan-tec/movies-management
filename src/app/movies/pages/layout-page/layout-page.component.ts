import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserService } from '../../services/user.service';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-layout-page',
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, MatMenuModule],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

  constructor
    (private _userService : UserService){}
  
    userDataDefault = {
      email: 'no-email',
      picture: '',
      role: 'no-role',
      username: 'no-username'
    };
  
    userData = this.userDataDefault;
  
    
    ngOnInit(){
      this._userService.userInformation().subscribe({
        next: (user) => {
          this.userData = user;
          sessionStorage.setItem('user', JSON.stringify(user));
        },
        error: (error) => {
          console.error(error);
        }
      });
  
    }

}
