import { Routes } from '@angular/router';
import { LoginComponent } from './movies/pages/login/login.component';
import { MoviesComponent } from './movies/pages/movies/movies.component';
import { ActorsComponent } from './movies/pages/actors/actors.component';
import { NewActorComponent } from './movies/pages/new-actor/new-actor.component';
import { ActorComponent } from './movies/pages/actor/actor.component';
import { LayoutPageComponent } from './movies/pages/layout-page/layout-page.component';

export const routes: Routes = [
  {
    path:"auth",
    component: LoginComponent
  },
  {
    path:"movies",
    component: MoviesComponent
  },
  {
    path:"main",
    component:LayoutPageComponent,
    children:[
      {
        path:"actors",
        component:ActorsComponent
      },
      {
        path:"new-actor", //new actor
        component:NewActorComponent
      },
      {
        path:"new-actor/:name", //edit actor
        component:NewActorComponent
      },
      {
        path:":name", //info of one actor
        component:ActorComponent
      },
      {
        path:"**",
        redirectTo:"actors"
      }
    ]
  },
  {
    path:"**",
    redirectTo:"main"
  }
];
