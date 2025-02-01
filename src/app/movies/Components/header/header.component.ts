import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'header',
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

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

  // Actualiza la hora cada 1 segundo
  currentTime = new Date();
  updateClock() {
    this.currentTime = new Date();
  }
  clockInterval = setInterval(() => {
    this.updateClock();
  }, 1000);



}
