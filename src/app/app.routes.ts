import { MovieComponent } from './movies/pages/movie/movie.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './movies/pages/login/login.component';
import { MoviesComponent } from './movies/pages/movies/movies.component';
import { ActorsComponent } from './movies/pages/actors/actors.component';
import { NewActorComponent } from './movies/pages/new-actor/new-actor.component';
import { ActorComponent } from './movies/pages/actor/actor.component';
import { LayoutPageComponent } from './movies/pages/layout-page/layout-page.component';
import { RegisterComponent } from './movies/pages/register/register.component';
import { EditActorComponent } from './movies/pages/edit-actor/edit-actor.component';
import { EditMovieComponent } from './movies/pages/edit-movie/edit-movie.component';

export const routes: Routes = [
  {
    path:"auth",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },

  {
    path:"main",
    component:LayoutPageComponent,
    children:[
      {
        path:"movies",
        component: MoviesComponent,
      },
      {
        path: "movie/new",
        component:EditMovieComponent
      },
      {
        path:"movie/:name",
        component:MovieComponent
      },
      {
        path:"movie/edit/:name",
        component:EditMovieComponent
      },
      {
        path:"actors",
        component:ActorsComponent
      },
      {
        path:"actor/new", //new actor
        component:EditActorComponent
      },
      {
        path:"actor/edit/:name", //edit actor
        component:EditActorComponent
      },
      {
        path:"actors/:name", //info of one actor
        component:ActorComponent
      },
      {
        path:"**",
        redirectTo:"movies"
      }
    ]
  },
  {
    path:"**",
    redirectTo:"auth"
  }
];
