import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {HomeCommandComponent} from "./home/home-command/home-command.component";
import {LoaderComponent} from "./loader/loader.component";
import {ZeroComponent} from "./level/zero/zero.component";
import {ZeroCommandsComponent} from "./level/zero/zero-commands/zero-commands.component";

export const routes: Routes = [
  {  path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        outlet: 'topScreen'
      },
      {
        path: '',
        component: HomeCommandComponent,
        outlet: 'commandScreen'
      }
    ] },
  {
    path: 'loading',
    component: LoaderComponent
  },
  {  path: 'level_0',
    children: [
      {
        path: '',
        component: ZeroComponent,
        outlet: 'topScreen'
      },
      {
        path: '',
        component: ZeroCommandsComponent,
        outlet: 'commandScreen'
      }
    ] }

];
