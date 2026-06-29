import { Routes } from '@angular/router';
import { Plans } from './plans/plans';
import { PlanNew } from './plans/plan-new/plan-new';

export const routes: Routes = [
  { path: 'plans/new', component: PlanNew },
  { path: 'plans', component: Plans },
];