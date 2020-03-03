import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModSetRankingsComponent } from './pages/mod-set-rankings/mod-set-rankings.component'
import { ModBestFitComponent } from './pages/mod-best-fit/mod-best-fit.component'

const routes: Routes = [
  { path: '', redirectTo: 'mod-set-rankings', pathMatch: 'full'},
  { path: 'mod-set-rankings', component: ModSetRankingsComponent, pathMatch: 'full'},
  { path: 'mod-best-fit', component: ModBestFitComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
