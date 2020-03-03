import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GuildSelectorComponent } from './components/guild-selector/guild-selector.component';
import { ModSetRankingsComponent } from './pages/mod-set-rankings/mod-set-rankings.component';
import { ModBestFitComponent } from './pages/mod-best-fit/mod-best-fit.component';
import { ModSetIconComponent } from './components/mod-set-icon/mod-set-icon.component';
import { CharacterFilterComponent } from './components/character-filter/character-filter.component';
import { PlayerFilterComponent } from './components/player-filter/player-filter.component';
import { CharacterIdentifierComponent } from './components/character-identifier/character-identifier.component';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    GuildSelectorComponent,
    ModSetRankingsComponent,
    ModBestFitComponent,
    ModSetIconComponent,
    CharacterFilterComponent,
    PlayerFilterComponent,
    CharacterIdentifierComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
