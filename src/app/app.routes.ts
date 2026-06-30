import { Routes } from '@angular/router';
import { Plans } from './plans/plans';
import { PlanNew } from './plans/plan-new/plan-new';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './auth/auth-guard';
import { Reader } from './reader/reader';
import { ReaderHome } from './reader-home/reader-home';
import { BookChapters } from './book-chapters/book-chapters';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reader', component: ReaderHome, canActivate: [authGuard] },
  { path: 'plans/new', component: PlanNew, canActivate: [authGuard] },
  { path: 'reader/:book', component: BookChapters, canActivate: [authGuard] },
  { path: 'reader/:book/:chapter', component: Reader, canActivate: [authGuard] },
  { path: 'plans', component: Plans, canActivate: [authGuard] },
];