import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { CarDetails } from './pages/car-details/car-details';
import { PublishAd } from './pages/publish-ad/publish-ad';
import { Favorites } from './pages/favorites/favorites';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'home', component: Home },
  { path: 'car-details/:id', component: CarDetails },
  { path: 'publish-ad', component: PublishAd },
  { path: 'favorites', component: Favorites }, // <-- تأكدي من وجود هذا السطر
  { path: 'profile', component: Profile },     // <-- وتأكدي من وجود هذا السطر
  { path: '**', redirectTo: 'home' }
];