import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModSetRankingsComponent } from './pages/mod-set-rankings/mod-set-rankings.component'
import { ModBestFitComponent } from './pages/mod-best-fit/mod-best-fit.component'
import { ModCommonComponent } from './pages/mod-common/mod-common.component'
import { PackValueComponent } from './pages/pack-value/pack-value.component';
import { ModMatchCharacterComponent } from './pages/mod-match-character/mod-match-character.component';
import { ModPlayerComponent } from './pages/mod-player/mod-player.component';

const routes: Routes = [
  { path: '', redirectTo: 'mod-player', pathMatch: 'full' },
  { path: 'mod-common', component: ModCommonComponent, pathMatch: 'full' },
  { path: 'mod-set-rankings', component: ModSetRankingsComponent, pathMatch: 'full' },
  { path: 'mod-best-fit', component: ModBestFitComponent, pathMatch: 'full' },
  { path: 'pack-value', component: PackValueComponent, pathMatch: 'full' },
  { path: 'mod-match-character', component: ModMatchCharacterComponent, pathMatch: 'full' },
  { path: 'mod-player', component: ModPlayerComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
