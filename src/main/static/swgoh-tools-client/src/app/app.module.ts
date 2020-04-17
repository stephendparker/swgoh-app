import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CommonModule, DecimalPipe } from '@angular/common';

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
import { ModCommonComponent } from './pages/mod-common/mod-common.component';
import { PlayerSelectorComponent } from './components/player-selector/player-selector.component';
import { ModPrimaryPercentagesComponent } from './components/mod-primary-percentages/mod-primary-percentages.component';
import { ModSetPercentagesComponent } from './components/mod-set-percentages/mod-set-percentages.component';
import { ColumnSelectorComponent } from './components/column-selector/column-selector.component';
import { GuildPlayerSelectorComponent } from './components/guild-player-selector/guild-player-selector.component';
import { PackValueComponent } from './pages/pack-value/pack-value.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ModMatchCharacterComponent } from './pages/mod-match-character/mod-match-character.component';
import { ModSecondaryInputComponent } from './components/mod-secondary-input/mod-secondary-input.component';
import { ModPlayerComponent } from './pages/mod-player/mod-player.component';
import { ModPortraitComponent } from './components/mod-portrait/mod-portrait.component';
import { AddCharacterComponent } from './components/add-character/add-character.component';
import { ModDisplayComponent } from './components/mod-display/mod-display.component';
import { ModSetComparisonComponent } from './components/mod-set-comparison/mod-set-comparison.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ModListComponentComponent } from './components/mod-list-component/mod-list-component.component';
import { CharacterPortraitComponent } from './components/character-portrait/character-portrait.component';
import { PlayerLoginComponent } from './components/player-login/player-login.component';
import { MatDividerModule } from '@angular/material/divider';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import { ModSlotIconComponent } from './components/mod-slot-icon/mod-slot-icon.component';
import { ModFilterDialogComponent } from './components/mod-filter-dialog/mod-filter-dialog.component';
import { RefreshModDialogComponent } from './components/refresh-mod-dialog/refresh-mod-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ModSetSummaryComponent } from './components/mod-set-summary/mod-set-summary.component';
import { DeleteModConfigDialogComponent } from './components/delete-mod-config-dialog/delete-mod-config-dialog.component';
import { CharacterModSummaryComponent } from './components/character-mod-summary/character-mod-summary.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SquadManagerComponent } from './components/squad-manager/squad-manager.component';
import { CharacterOptimizationDialogComponent } from './components/character-optimization-dialog/character-optimization-dialog.component';
import { MatSliderModule } from '@angular/material/slider';

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
    ProgressSpinnerComponent,
    ModCommonComponent,
    PlayerSelectorComponent,
    ModPrimaryPercentagesComponent,
    ModSetPercentagesComponent,
    ColumnSelectorComponent,
    GuildPlayerSelectorComponent,
    PackValueComponent,
    ModMatchCharacterComponent,
    ModSecondaryInputComponent,
    ModPlayerComponent,
    ModPortraitComponent,
    AddCharacterComponent,
    ModDisplayComponent,
    ModSetComparisonComponent,
    ModListComponentComponent,
    CharacterPortraitComponent,
    PlayerLoginComponent,
    ModSlotIconComponent,
    ModFilterDialogComponent,
    RefreshModDialogComponent,
    ConfirmationDialogComponent,
    ModSetSummaryComponent,
    DeleteModConfigDialogComponent,
    CharacterModSummaryComponent,
    SquadManagerComponent,
    CharacterOptimizationDialogComponent
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
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSortModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDividerModule,
    ScrollingModule,
    MatMenuModule,
    MatCheckboxModule,
    DragDropModule,
    MatSliderModule
  ],
  entryComponents: [
    ColumnSelectorComponent,
    AddCharacterComponent,
    PlayerLoginComponent,
    ModFilterDialogComponent,
    RefreshModDialogComponent,
    ConfirmationDialogComponent,
    DeleteModConfigDialogComponent,
    CharacterOptimizationDialogComponent
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
