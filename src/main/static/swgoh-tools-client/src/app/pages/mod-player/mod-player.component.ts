import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { Subject, forkJoin } from 'rxjs';
import { ModCalculatedData, SwgohGgCalc, ModUnitCalcResults, SetTotalCounts, CommonSet, EvaluatedModDto, ModTotalBonus, StatsDto, SetInfo, CharacterModDto } from './../../calcs/swgoh-gg-calc';
import { delay, takeUntil } from 'rxjs/operators';
import { DataStoreService } from './../../services/data-store.service';
import { UnitsEntity, PlayerData } from './../../model/swgohgg/player-data';
import { ModDisplayComponent } from './../../components/mod-display/mod-display.component';
import { ModSetComparisonComponent } from './../../components/mod-set-comparison/mod-set-comparison.component';
import { ModListComponentComponent, LockedModDto } from './../../components/mod-list-component/mod-list-component.component';
import { MatDialog } from '@angular/material/dialog';
import { PlayerLoginComponent } from './../../components/player-login/player-login.component';
import { CharacterPortraitComponent } from './../../components/character-portrait/character-portrait.component';
import { ModPortraitComponent } from './../../components/mod-portrait/mod-portrait.component';
import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { AddCharacterComponent } from './../../components/add-character/add-character.component';
import { CharacterData } from './../../model/swgohgg/character-data';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ModFilterDialogComponent } from './../../components/mod-filter-dialog/mod-filter-dialog.component';
import { RefreshModDialogComponent } from './../../components/refresh-mod-dialog/refresh-mod-dialog.component';
import { HotutilsDataService } from './../../services/hotutils-data.service';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';
import { ModSetSummaryComponent } from './../../components/mod-set-summary/mod-set-summary.component';
import { DeleteModConfigDialogComponent } from './../../components/delete-mod-config-dialog/delete-mod-config-dialog.component';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SquadManagerComponent } from './../../components/squad-manager/squad-manager.component';
import { ModCalculatorCharacterResultsDto, ModCalculatorResultsDto } from './../../model/optimization/mod-optimization';
import { SwgohGgConstants } from './../../calcs/swgoh-gg-constants';


class CharacterBestMods {
  public name: string = "";
  public bestSquare: EvaluatedModDto = null;
  public bestDiamond: EvaluatedModDto = null;
  public bestCircle: EvaluatedModDto = null;
  public bestArrow: EvaluatedModDto = null;
  public bestTriangle: EvaluatedModDto = null;
  public bestCross: EvaluatedModDto = null;
}


// Users current mod selection configuration

class SaveModDto {
  public id: string;
  public character: string;
}

const MOD_SLOT_SQUARE = 1;
const MOD_SLOT_ARROW = 2;
const MOD_SLOT_DIAMOND = 3;
const MOD_SLOT_TRIANGLE = 4;
const MOD_SLOT_CIRCLE = 5;
const MOD_SLOT_CROSS = 6;

export class PlayerModData {

  playerAllyCode: string;
  playerData: PlayerData = null;
  playerMods: Mods = null; // players mods
  unequippedMods: ModsEntity[] = [];
}

export class ModEditorViewConfiguration {
  public characterName;
  public filterSets: number[] = [];
  public filterSlots: number[] = [];

  public crossPrimaryFilters: number[] = [];
  public trianglePrimaryFilters: number[] = [];
  public circlePrimaryFilters: number[] = [];
  public arrowPrimaryFilters: number[] = [];

  public sort: string = 'strength';
}

export class PlayerModConfiguration {
  public modEditorViewConfigurations: ModEditorViewConfiguration[] = [];
}

class PlayerModSaveData {
  playerAllyCode: string; // ally code

  squads: string[][] = []; // squads to organize the players
  modEditorViewConfigurations: ModEditorViewConfiguration[] = []; // views, filters, sorting, etc per character

  playerModData: PlayerModData = new PlayerModData(); // from swgoh and mod utils
  restoredLockedMods: SaveModDto[] = []; // locked mods to character, mod id and charactername
}


export enum ENUM_SORT_TYPE {
  POWER = 1,
  SPEED,
  OFFENSE,
  HEALTH,
  PROTECTION,
  POTENCY,
  TENACITY
}

// DTO used to show as filtering option, includes a label (leader name) and if all characters are locked
class SquadDto {
  public characters: string[] = [];
  public label: string;
  public allLocked: boolean = false;
}

@Component({
  selector: 'app-mod-player',
  templateUrl: './mod-player.component.html',
  styleUrls: ['./mod-player.component.scss']
})
export class ModPlayerComponent implements OnInit, OnDestroy {

  get ENUM_SORT_TYPE() { return ENUM_SORT_TYPE; }

  SwgohGgCalc: typeof SwgohGgCalc = SwgohGgCalc;

  @ViewChildren('pendingModsDisplay') pendingModsDisplay: QueryList<ModDisplayComponent>;
  @ViewChildren('compareCurrentPending') compareCurrentPending: QueryList<ModSetComparisonComponent>;
  @ViewChildren('characterPortrait') characterPortrait: QueryList<CharacterPortraitComponent>;
  @ViewChildren('selectedSlotModPortrait') selectedSlotModPortrait: QueryList<ModPortraitComponent>;
  private squadManagers: QueryList<SquadManagerComponent>;
  @ViewChildren('squadManager') set squadManagerContent(content: QueryList<SquadManagerComponent>) {
    this.squadManagers = content;
  }
  @ViewChild(ModListComponentComponent) modList: ModListComponentComponent;

  protected unsubscribe$ = new Subject<void>();

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  public VIEW_SELECT_CHARACTER = 1;
  public VIEW_MODS = 2;
  public VIEW_REVIEW_CHARACTER = 3;
  public VIEW_EDIT_SQUAD = 4;
  public VIEW_REVIEW_ALL_CHARACTERS = 5;
  public FILTER_OUT_THRESHOLD = .35;

  public SAVE_DATA_KEY = "mod-player-data";

  public SQUADS_LOCAL_STORAGE_KEY = "squads";
  public PLAYER_MOD_DATA_STORAGE_KEY = "playerModData";
  public PLAYER_LOCKED_MOD_DATA_STORAGE_KEY = "lockedMods";
  public PLAYER_FILTERS_DATA_STORAGE_KEY = "filterMods";

  public REVIEW_FILTER_SQUAD = "filterSquad";
  public REVIEW_FILTER_MOVED_MODS = "movedMods";
  public REVIEW_FILTER_CATEGORY = "filterCategory";

  public summarySort: ENUM_SORT_TYPE = ENUM_SORT_TYPE.POWER;

  public viewMode: number = null;

  fullyLockedCharacters: CharacterModDto[] = [];

  // data returned from services (not configured by user)
  // playerModData: PlayerModData = new PlayerModData();

  squadDtos: SquadDto[] = [];

  saveData: PlayerModSaveData = new PlayerModSaveData();

  selectedSlotMod: ModsEntity; // the mod the user clicks in their display
  selectedCharacterDto: CharacterModDto = null;
  selectedModEditorViewConfiguration: ModEditorViewConfiguration = null;
  playerCharacterDtos: CharacterModDto[];

  evaludatedMods: EvaluatedModDto[];
  assignedModSets: CharacterBestMods[] = [];
  selectedCharacter: string = null;

  sortField: string = 'strength';
  filterSets: number[] = [];
  filterSlots: number[] = [];
  filterLocked: boolean = true;

  // playerModConfiguration: PlayerModConfiguration = new PlayerModConfiguration();

  modelGuildMods: Mods[] = null;

  editSquadIndex: number = null;

  reviewFilterType: string = null;
  reviewFilterSquad: string[] = null;
  reviewFilterCategory: string = null;

  // squads: string[][] = [];

  // restoredLockedMods: SaveModDto[] = null;

  categoryList: string[] = []; // categories list is used in filter options for summary view
  characterData: CharacterData[] = null;
  optimizationData: ModCalculatorResultsDto;  // used for mod optimization

  constructor(private dataStoreService: DataStoreService, private hotutilsDataService: HotutilsDataService,
    private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {

    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });

    this.dataStoreService.getCharacterData().pipe(takeUntil(this.unsubscribe$)).subscribe(charData => {
      if (charData != null) {
        this.characterData = charData;
        this.categoryList = [];
        charData.forEach(cData => {
          cData.categories.forEach(category => {
            this.categoryList.indexOf(category) === -1 ? this.categoryList.push(category) : null;
          });
        });
        this.categoryList = this.categoryList.sort((a, b) => a.localeCompare(b));
        this.updateComponents();
      }
    });

    this.dataStoreService.getModOptimizationData().pipe(takeUntil(this.unsubscribe$)).subscribe(optimizationData => {
      if (optimizationData != null) {
        this.optimizationData = optimizationData;
      }
    });


    let saveDataString = localStorage.getItem(this.SAVE_DATA_KEY);
    if (saveDataString != null) {
      this.saveData = JSON.parse(saveDataString);
      this.refreshDataCalculations();
    }

    this.updateFullyLockedCharacters();

    (async () => {
      await delay(1);
      this.updateFullyLockedCharacters();

      if (this.saveData.playerAllyCode == null) {
        this.openPlayerLogin();
      } else {
        this.viewMode = this.VIEW_REVIEW_ALL_CHARACTERS;
      }
      if (this.squadManagers) {
        this.squadManagers.forEach(squadManager => squadManager.setCharacterGroups(this.saveData.squads));
      }
    })();
  }

  summaryViewCharacters: CharacterModDto[] = [];

  setSortPower() {
    this.summarySort = ENUM_SORT_TYPE.POWER;
    this.updateSummaryViewCharacters();
  }

  setSortSpeed() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();

    this.summarySort = ENUM_SORT_TYPE.SPEED;
    this.updateSummaryViewCharacters();
    this.cdr.detectChanges();
  }

  setSortOffense() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.summarySort = ENUM_SORT_TYPE.OFFENSE;
    this.updateSummaryViewCharacters();
  }

  setSortHealth() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.summarySort = ENUM_SORT_TYPE.HEALTH;
    this.updateSummaryViewCharacters();
  }

  setSortProtection() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.summarySort = ENUM_SORT_TYPE.PROTECTION;
    this.updateSummaryViewCharacters();
  }

  setSortPotency() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.summarySort = ENUM_SORT_TYPE.POTENCY;
    this.updateSummaryViewCharacters();
  }

  setSortTenacity() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.summarySort = ENUM_SORT_TYPE.TENACITY;
    this.updateSummaryViewCharacters();
  }

  setReviewFilterAll() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.reviewFilterType = null;
    this.updateSummaryViewCharacters();
  }

  setReviewFilterMovedMods() {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.reviewFilterType = this.REVIEW_FILTER_MOVED_MODS;
    this.updateSummaryViewCharacters();
  }

  setReviewFilterSquad(squad) {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.reviewFilterType = this.REVIEW_FILTER_SQUAD;
    this.reviewFilterSquad = squad;
    this.updateSummaryViewCharacters();
  }

  setReviewFilterCategory(category) {
    this.summaryViewCharacters = [];
    this.cdr.detectChanges();
    this.reviewFilterType = this.REVIEW_FILTER_CATEGORY;
    this.reviewFilterCategory = category;
    this.updateSummaryViewCharacters();
  }

  updateSummaryViewCharacters() {
    let retVal: CharacterModDto[] = [];

    switch (this.reviewFilterType) {
      case null: {
        retVal = this.playerCharacterDtos;
        break;
      }
      case this.REVIEW_FILTER_SQUAD: {
        retVal = this.reviewFilterSquad.map(character => this.playerCharacterDtos.find(playerCharacterDto => playerCharacterDto.name == character));
        break;
      }
      case this.REVIEW_FILTER_CATEGORY: {
        retVal = this.playerCharacterDtos.filter(playerCharacterDto => {
          let character = this.characterData.find(character => character.base_id == playerCharacterDto.name);
          return character != null && character.categories.indexOf(this.reviewFilterCategory) != -1;
        });
        break;
      }
      case this.REVIEW_FILTER_MOVED_MODS: {
        retVal = this.playerCharacterDtos.filter(playerCharacterDto => {
          let effectiveMods = this.getEffectiveMods(playerCharacterDto);
          return playerCharacterDto.lockedMods.length > 0 && (effectiveMods.length != playerCharacterDto.currentMods.length ||
            (effectiveMods.filter(effectiveMod => playerCharacterDto.currentMods.find(currentMod => currentMod.id == effectiveMod.id) == null).length > 0));
        });
        break;
      }
      default: {
        //statements; 
        break;
      }
    }

    switch (this.summarySort) {
      case ENUM_SORT_TYPE.POWER: {
        retVal.sort((n1, n2) => {
          let n1Power = n1.unitData == null ? 0 : n1.unitData.data.power;
          let n2Power = n2.unitData == null ? 0 : n2.unitData.data.power;
          return n2Power - n1Power;
        });
        break;
      }
      case ENUM_SORT_TYPE.SPEED: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_SPEED_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_SPEED_NAME];
          return n2Score - n1Score;
        });
        break;
      }
      case ENUM_SORT_TYPE.HEALTH: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_HEALTH_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_HEALTH_NAME];
          return n2Score - n1Score;
        });
        break;
      }
      case ENUM_SORT_TYPE.OFFENSE: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_OFFENSE_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_OFFENSE_NAME];
          return n2Score - n1Score;
        });
        break;
      }
      case ENUM_SORT_TYPE.POTENCY: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_POTENCY_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_POTENCY_NAME];
          return n2Score - n1Score;
        });
        break;
      }
      case ENUM_SORT_TYPE.PROTECTION: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_PROTECTION_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_PROTECTION_NAME];
          return n2Score - n1Score;
        });
        break;
      }  
      case ENUM_SORT_TYPE.TENACITY: {

        retVal.sort((n1, n2) => {
          let n1Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n1.name);
          let n2Optimization = this.optimizationData.characterResults.find(characterResult => characterResult.name == n2.name);

          let n1Score = n1Optimization == null ? 0 : n1Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_TENACITY_NAME];
          let n2Score = n2Optimization == null ? 0 : n2Optimization.secondaryTypeCounts[SwgohGgConstants.MOD_SECONDARY_TENACITY_NAME];
          return n2Score - n1Score;
        });
        break;
      }              
      default: {
        //statements; 
        break;
      }
    }

    this.summaryViewCharacters = retVal;

  }

  getEffectiveMods(playerCharacterDto: CharacterModDto): ModsEntity[] {
    let retVal = playerCharacterDto.lockedMods.slice(0);

    let lockedMods: ModsEntity[] = this.getLockedMods(true);

    // mods that are assigned to character in game
    playerCharacterDto.currentMods.filter(mod => {
      // remove mods that are locked to other players
      return lockedMods.find(lockedMod => lockedMod.id == mod.id) == null;
    }).filter(currentUnlockedMod => {
      // remove mods that slot is already accounted for
      return playerCharacterDto.lockedMods.find(lockedMod => lockedMod.slot == currentUnlockedMod.slot) == null;
    }).forEach(currentMod => {
      retVal.push(currentMod);
    });
    return retVal;
  }

  generateDefaultEditorViews() {
    let views: ModEditorViewConfiguration[] = this.saveData.modEditorViewConfigurations;
    this.playerCharacterDtos.forEach(pcd => {

      if (views.find(view => view.characterName == pcd.name) == null) {

        let modEditorViewConfiguration = new ModEditorViewConfiguration();
        modEditorViewConfiguration.characterName = pcd.name;
        views.push(modEditorViewConfiguration);
      }
    });
  }

  getAcceptablePrimary(optimizationCharacterData: ModCalculatorCharacterResultsDto, slotNumber: number): number[] {


    return SwgohGgConstants.ALL_PRIMARIES.filter(primaryId => {
      optimizationCharacterData.primaryMultipliers[slotNumber][primaryId] > .5;
    });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getSavedModsDtos(): SaveModDto[] {
    let retVal: SaveModDto[] = [];
    if (this.playerCharacterDtos) {
      this.playerCharacterDtos.forEach(characterPlayerDto => {
        if (characterPlayerDto.lockedMods != null && characterPlayerDto.lockedMods.length > 0) {
          characterPlayerDto.lockedMods.forEach(mod => {
            retVal.push({
              id: mod.id,
              character: characterPlayerDto.name
            });
          });
        }
      });
    }
    return retVal;
  }

  saveSettings() {

    this.saveData.restoredLockedMods = this.getSavedModsDtos();
    localStorage.setItem(this.SAVE_DATA_KEY, JSON.stringify(this.saveData));


    // localStorage.setItem(this.SQUADS_LOCAL_STORAGE_KEY, JSON.stringify(this.squads));
    // localStorage.setItem(this.PLAYER_MOD_DATA_STORAGE_KEY, JSON.stringify(this.playerModData));
    // localStorage.setItem(this.PLAYER_FILTERS_DATA_STORAGE_KEY, JSON.stringify(this.playerModConfiguration));

    // if (this.playerCharacterDtos) {
    //   let saveMods: SaveModDto[] = [];

    //   this.playerCharacterDtos.forEach(characterPlayerDto => {
    //     if (characterPlayerDto.lockedMods != null && characterPlayerDto.lockedMods.length > 0) {
    //       characterPlayerDto.lockedMods.forEach(mod => {
    //         saveMods.push({
    //           id: mod.id,
    //           character: characterPlayerDto.name
    //         });
    //       });
    //     }
    //   });
    //   localStorage.setItem(this.PLAYER_LOCKED_MOD_DATA_STORAGE_KEY, JSON.stringify(saveMods))
    // }
  }


  updateSquads(squads: string[][]) {
    this.saveData.squads = squads;
    this.saveSettings();
    this.updateComponents();
  }

  reloadData(playerSwgohGg: boolean, playerHotutils: boolean, clearMods: boolean, sessionIdHotutils: string) {

    let netWorkCalls = [];
    let netWorkResponses = [];

    if (playerSwgohGg) {
      netWorkCalls.push(this.dataStoreService.getPlayerData(this.saveData.playerAllyCode));
      netWorkResponses.push((playerData) => {
        if (playerData != null) {
          this.saveData.playerModData.playerData = playerData;

        }
      })
      netWorkCalls.push(this.dataStoreService.getPlayerModData(+this.saveData.playerAllyCode));
      netWorkResponses.push((playerMods) => {
        if (playerMods != null) {
          this.saveData.playerModData.playerMods = playerMods.value.body;
          let filteredMods = this.saveData.playerModData.playerMods.mods.filter(mod => mod.character == "EMPERORPALPATINE");
          let y = 10;
        }
      })
    }
    if (playerHotutils) {
      netWorkCalls.push(this.hotutilsDataService.playerMods(sessionIdHotutils));
      netWorkResponses.push((playerModListResponse) => {
        if (playerModListResponse != null) {
          this.saveData.playerModData.unequippedMods = playerModListResponse;
        }
      })
    }

    this.dataStoreService.setLockInput(true);

    forkJoin(netWorkCalls).subscribe(results => {
      results.forEach((result, index) => {
        netWorkResponses[index](result);
      });
      this.refreshDataCalculations();
      this.saveSettings();
      this.dataStoreService.setLockInput(false);
    });

  }

  refreshDataCalculations() {
    this.generatePlayerCharacterDtos();
  }

  clickRefreshData() {
    const dialogRef = this.dialog.open(RefreshModDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reloadData(result.playerSwgohGg, result.playerHotutils, result.clearMods, result.sessionIdHotutils);
      }
    });
  }


  // FROM UI
  openPlayerLogin() {
    const dialogRef = this.dialog.open(PlayerLoginComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.saveData.playerAllyCode = result.playerId;
        this.reloadData(true, result.playerHotutils != null, false, result.playerHotutils);
        this.viewMode = this.VIEW_REVIEW_ALL_CHARACTERS;
      }
    });
  }

  // FROM UI
  toggleSetFilter(id: number) {

    if (this.selectedModEditorViewConfiguration.filterSets.indexOf(id) == -1) {
      this.selectedModEditorViewConfiguration.filterSets.push(id);
    } else {
      this.selectedModEditorViewConfiguration.filterSets = this.selectedModEditorViewConfiguration.filterSets.filter(filterName => filterName != id);
    }
    this.modList.setModSetFilter(this.selectedModEditorViewConfiguration.filterSets);
    this.saveSettings();
    this.updateComponents();
    this.cdr.detectChanges();
  }

  setSetFilter(filters: number[]) {
    this.filterSets = filters;
    this.modList.setModSetFilter(this.filterSets);
    this.updateComponents();
    this.cdr.detectChanges();
  }

  toggleLockedFilter() {
    this.filterLocked = !this.filterLocked;
    this.modList.setLockedFilter(this.filterLocked);
    this.updateComponents();
    this.cdr.detectChanges();
  }

  deleteSquad(index: number) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        confirmationText: 'Are you sure you want to delete this squad?'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.saveData.squads = this.saveData.squads.filter((squad, indexSquad) => indexSquad != index);
        this.updateComponents();
        this.cdr.detectChanges();
      }
    });
  }

  // FROM UI
  toggleSlotFilter(id: number) {

    if (this.filterSlots.indexOf(id) == -1) {
      this.filterSlots.push(id);
    } else {
      this.filterSlots = this.filterSlots.filter(filterName => filterName != id);
    }
    this.modList.setModSlotFilter(this.filterSlots);
    this.updateComponents();
    this.cdr.detectChanges();
  }

  openModFilterOptions() {
    const dialogRef = this.dialog.open(ModFilterDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        filterSets: this.selectedModEditorViewConfiguration.filterSets,
        filterSlots: this.filterSlots,
        arrowPrimaryFilters: this.selectedModEditorViewConfiguration.arrowPrimaryFilters,
        circlePrimaryFilters: this.selectedModEditorViewConfiguration.circlePrimaryFilters,
        trianglePrimaryFilters: this.selectedModEditorViewConfiguration.trianglePrimaryFilters,
        crossPrimaryFilters: this.selectedModEditorViewConfiguration.crossPrimaryFilters
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // TODO -remove this we are storing per player
        this.filterSets = result.filterSets;
        this.filterSlots = result.filterSlots;

        if (this.selectedModEditorViewConfiguration != null) {
          this.selectedModEditorViewConfiguration.filterSets = result.filterSets;
          this.selectedModEditorViewConfiguration.arrowPrimaryFilters = result.arrowPrimaryFilter;
          this.selectedModEditorViewConfiguration.circlePrimaryFilters = result.circlePrimaryFilter;
          this.selectedModEditorViewConfiguration.trianglePrimaryFilters = result.trianglePrimaryFilter;
          this.selectedModEditorViewConfiguration.crossPrimaryFilters = result.crossPrimaryFilter;
        } else {
          this.setSetFilter([]);
        }

        this.modList.setModSlotFilter(this.filterSlots);
        this.modList.setFilters(this.selectedModEditorViewConfiguration);
        this.saveSettings();
        this.updateComponents();
        this.cdr.detectChanges();
      }
    });
  }

  clickCleanUpData() {
    const dialogRef = this.dialog.open(DeleteModConfigDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        if (result.lockedMods == DeleteModConfigDialogComponent.ALL) {
          this.playerCharacterDtos.forEach(characterModDto => {
            characterModDto.lockedMods = [];
          });

        }
        if (result.filters == DeleteModConfigDialogComponent.ALL) {
          this.saveData.modEditorViewConfigurations = [];
        }
        if (result.filters == DeleteModConfigDialogComponent.RESET) {
          this.saveData.modEditorViewConfigurations = [];
          this.generateDefaultEditorViews();
        }
        this.saveSettings();
        this.updateComponents();
        this.cdr.detectChanges();
      }
    });
  }

  // FROM UI
  clickModDisplayMod(mod: ModsEntity) {
    this.selectedSlotMod = mod;
    this.filterSlots = mod == null ? [] : [mod.slot];
    this.modList.setModSlotFilter(this.filterSlots);
    this.updateComponents();
    this.cdr.detectChanges();
  }

  // FROM UI - add a single mod to the current characters pending
  setPending(mod: ModsEntity) {
    if (this.selectedCharacterDto != null) {
      this.selectedCharacterDto.pendingMods = this.selectedCharacterDto.pendingMods.filter(pendingMod => mod.slot != pendingMod.slot);
      this.selectedCharacterDto.pendingMods.push(mod);
    }
    this.updateComponents();
    this.cdr.detectChanges();
  }

  // FROM UI 
  modCharacter(character) {
    this.viewMode = this.VIEW_MODS;
    this.setSelectedCharacter(character);
    this.revertToInGameModsSoft();
    this.updateComponents();
    this.cdr.detectChanges();
  }

  // assign pending mods to character, first mods that are locked, second mods in game that are not locked to other players
  revertToInGameModsSoft() {

    let lockedMods: ModsEntity[] = this.getLockedMods(true);
    if (this.selectedCharacterDto != null) {
      // assign all locked mods
      this.selectedCharacterDto.pendingMods = this.selectedCharacterDto.lockedMods.slice(0);

      // mods that are assigned to character in game
      this.selectedCharacterDto.currentMods.filter(mod => {
        // remove mods that are locked to other players
        return lockedMods.find(lockedMod => lockedMod.id == mod.id) == null;
      }).filter(currentUnlockedMod => {
        // remove mods that slot is already accounted for
        return this.selectedCharacterDto.pendingMods.find(pendingMod => pendingMod.slot == currentUnlockedMod.slot) == null;
      }).forEach(currentMod => {
        this.selectedCharacterDto.pendingMods.push(currentMod);
      });
    }
  }

  // FROM UI
  clickOptimizeCharacter(name: string) {
    this.optimize(name);
    this.updateComponents();
    this.cdr.detectChanges();
  }

  // Set mod MatSort
  setModSort(sortField: string) {
    this.sortField = sortField;
    this.selectedModEditorViewConfiguration.sort = sortField;
    this.modList.setModSortField(this.selectedModEditorViewConfiguration.sort = sortField);
    this.cdr.detectChanges();
  }

  resetMods(name: string) {

    this.updateComponents();
    this.cdr.detectChanges();
  }

  revertMods(name: string) {
    this.revertToInGameModsSoft();
    this.updateComponents();
    this.cdr.detectChanges();
  }

  sameMods(set1: ModsEntity[], set2: ModsEntity[]): boolean {
    let retVal: boolean = false;

    if (set1.length == set2.length) {
      retVal = true;
      set1.forEach(modSet1 => {
        if (set2.find(modSet2 => modSet2.id == modSet1.id) == null) {
          retVal = false;
        }
      })
    }
    return retVal;
  }

  allLocked(characterModDto: CharacterModDto) {


    return characterModDto != null && characterModDto.lockedMods != null && characterModDto.lockedMods.length == 6 &&
      this.sameMods(characterModDto.lockedMods, characterModDto.pendingMods);
  }

  unlockedMod(characterModDto: CharacterModDto, lockedMods: ModsEntity[]) {

    let retVal = false;
    characterModDto.currentMods.forEach(currentMod => {

      let slotAlreadyLocked: boolean = characterModDto.lockedMods.find(lockedMod => lockedMod.slot == currentMod.slot) != null;
      let modAlreadyLocked: boolean = lockedMods != null && lockedMods.find(lockedMod => lockedMod.id == currentMod.id) != null;

      if (slotAlreadyLocked == false && modAlreadyLocked == false) {
        retVal = true;
      }
    });
    return retVal;
  }

  toggleSummaryLock(characterModDto: CharacterModDto) {
    let lockedMods = this.getLockedMods(true);
    if (characterModDto != null) {
      if (this.unlockedMod(characterModDto, lockedMods)) {
        // lock all visible mods

        let displayMods = characterModDto.lockedMods.slice(0);


        characterModDto.currentMods.forEach(currentMod => {

          let slotAlreadyLocked: boolean = characterModDto.lockedMods.find(lockedMod => lockedMod.slot == currentMod.slot) != null;
          let modAlreadyLocked: boolean = lockedMods != null && lockedMods.find(lockedMod => lockedMod.id == currentMod.id) != null;

          if (slotAlreadyLocked == false && modAlreadyLocked == false) {
            displayMods.push(currentMod);
          }
        });
        characterModDto.lockedMods = displayMods;
        this.saveSettings();
      }
      else {
        // unlock all mods
        characterModDto.lockedMods = [];
        this.saveSettings();
      }
    }
  }

  toggleLock(characterModDto: CharacterModDto) {
    let lockedMods = this.getLockedMods(true);
    if (characterModDto != null) {
      if (this.allLocked(characterModDto)) {
        characterModDto.lockedMods = [];
        this.saveSettings();
      } else {
        characterModDto.lockedMods = characterModDto.pendingMods.slice(0);
        this.modList.setLockedMods(this.getLockedMods(true));
        this.modList.setTheLockedMods(this.getLockedModDtos(true));

        this.playerCharacterDtos.forEach(playerCharacter => {
          // remove locked mods from other characters
          if (playerCharacter.name != characterModDto.name) {
            playerCharacter.lockedMods = playerCharacter.lockedMods.filter(mod => {
              return characterModDto.lockedMods.find(lockedMod => lockedMod.id == mod.id) == null;
            });
          }
        });
        this.saveSettings();
      }

      this.updateComponents();
      this.cdr.detectChanges();
    }
  }

  getFullModList(): ModsEntity[] {
    let retVal = this.saveData.playerModData.playerMods.mods.slice(0);
    // if (this.)
    if (this.saveData.playerModData.unequippedMods != null && this.saveData.playerModData.unequippedMods.length != null) {
      this.saveData.playerModData.unequippedMods.forEach(unequippedMod => {
        if (retVal.find(iMod => iMod.id == unequippedMod.id) == null) {
          retVal.push(unequippedMod);
        }
      })

    }

    return retVal;
  }

  round(value: number): number {
    return Math.round(value);
  }

  setSelectedCharacter(name: string) {

    this.selectedCharacter = name;
    this.selectedCharacterDto = null;

    if (name != null) {
      this.selectedCharacterDto = this.playerCharacterDtos.find(dto => dto.name == name);

      this.selectedModEditorViewConfiguration = this.saveData.modEditorViewConfigurations.find(view => view.characterName == name);

      if (this.selectedModEditorViewConfiguration != null) {
        this.modList.setFilters(this.selectedModEditorViewConfiguration);
      } else {
        this.setSetFilter([]);
      }

      let currentModBonus: ModTotalBonus = SwgohGgCalc.calculateModTotalBonus(this.selectedCharacterDto.currentMods);
      let baseStats: StatsDto = SwgohGgCalc.deriveBaseStats(this.selectedCharacterDto.unitData, currentModBonus);

      let allMods = this.getFullModList();


      this.evaludatedMods = allMods.map(mod => {
        let retVal: EvaluatedModDto = new EvaluatedModDto();
        let strength: number = 0;
        if (this.optimizationData != null) {
          let optimizationCharacterData = this.optimizationData.characterResults.find(optimizationCharacter => optimizationCharacter.name == name);

          let setStrength = optimizationCharacterData.fourSetMultipliers[mod.set];
          setStrength = setStrength == null ? 0 : setStrength;

          strength = SwgohGgCalc.calculateModOptimizationStrength(mod, optimizationCharacterData) * setStrength;
        }

        let modBonus: ModTotalBonus = SwgohGgCalc.calculateModTotalBonus([mod]);
        let appliedModBonus: StatsDto = SwgohGgCalc.applyBonuses(baseStats, modBonus);

        retVal.mod = mod;
        retVal.strength = strength;

        retVal.speed = appliedModBonus.speed;
        retVal.health = appliedModBonus.health;
        retVal.protection = appliedModBonus.protection;
        retVal.physicalOffense = appliedModBonus.physicalOffense;
        retVal.specialOffense = appliedModBonus.specialOffense;
        retVal.critChance = appliedModBonus.specialCritChance;

        retVal.potency = appliedModBonus.potency;
        retVal.tenacity = appliedModBonus.tenacity;
        retVal.physicalDefense = appliedModBonus.physicalDefense;
        retVal.specialDefense = appliedModBonus.speciallDefense;

        return retVal;
      });

      if (this.modList)
        this.modList.setMods(this.evaludatedMods);
    }
  }

  updateFullyLockedCharacters() {
    if (this.playerCharacterDtos != null) {
      this.fullyLockedCharacters = this.playerCharacterDtos.filter(dto => dto.lockedMods != null && dto.lockedMods.length == 6);
    }
  }

  getOptimization(name: string): ModCalculatorCharacterResultsDto {
    return this.optimizationData == null ? null : this.optimizationData.characterResults.find(optimizationCharacter => optimizationCharacter.name == name);
  }


  isCommonSet(set): boolean {
    if (this.selectedCharacter != null && this.optimizationData != null) {

      let results: ModCalculatorCharacterResultsDto = this.optimizationData.characterResults.find(optimizationCharacter => optimizationCharacter.name == this.selectedCharacter);

      return set.name == results.commonSet1Name || set.name == results.commonSet2Name || set.name == results.commonSet3Name;
    }
    return false;
  }

  updateComponents() {

    this.squadDtos = [];
    if (this.saveData.squads != null && this.saveData.squads.length > 0) {
      this.squadDtos = this.saveData.squads.map(squad => {
        let retVal = new SquadDto();

        retVal.characters = squad.slice(0);

        let charData = this.characterData.find(character => character.base_id == squad[0]);
        if (charData != null) {
          retVal.label = charData.name;
        }
        retVal.allLocked = squad.filter(squadCharacter => {
          let playerCharacterDto: CharacterModDto = this.playerCharacterDtos.find(dto => dto.name == squadCharacter);
          return playerCharacterDto == null || playerCharacterDto.lockedMods == null || playerCharacterDto.lockedMods.length != 6;
        }).length == 0;


        return retVal;
      })
    }

    if (this.characterPortrait) {
      this.characterPortrait.forEach(portrait => {
        portrait.setBaseId(this.selectedCharacter);
      });
    }
    if (this.modList) {
      this.modList.setLockedMods(this.getLockedMods(true));
      this.modList.setTheLockedMods(this.getLockedModDtos(true));
    }

    if (this.selectedSlotModPortrait) {
      this.selectedSlotModPortrait.forEach(modPortrait => {
        modPortrait.mod = this.selectedSlotMod;
      });
    }
    this.updateFullyLockedCharacters();

    if (this.pendingModsDisplay) {
      this.pendingModsDisplay.forEach(modDisplay => {
        modDisplay.setMods(this.selectedCharacterDto == null ? null : this.selectedCharacterDto.pendingMods);


        if (this.selectedCharacterDto != null) {
          let lockedMods = this.selectedCharacterDto.pendingMods.filter(pendingMod => this.selectedCharacterDto.currentMods.find(newMod => newMod.id == pendingMod.id) == null);
          modDisplay.highlightMods = lockedMods;
        }

        modDisplay.setLockedMods(this.getLockedMods(true));
        // TODO
        // this.modList.setTheLockedMods(this.getLockedModDtos(true));
      });
    }

    // TODO - dont need this
    if (this.compareCurrentPending) {
      this.compareCurrentPending.forEach(compareCurrentNew => {

        if (this.selectedCharacterDto != null) {

          compareCurrentNew.setModData(this.selectedCharacterDto.unitData, this.selectedCharacterDto.currentMods,
            this.selectedCharacterDto.lockedMods, this.selectedCharacterDto.pendingMods, this.getLockedMods(true));

        } else {
          compareCurrentNew.setData(null, null, null, null, null);
        }
      });
    }
    this.updateSummaryViewCharacters();
  }

  // Generate player characters and assign mods to them
  generatePlayerCharacterDtos() {
    this.playerCharacterDtos = [];

    let allMods = this.getFullModList();

    allMods.forEach(mod => {

      let playerCharacterDto: CharacterModDto = this.playerCharacterDtos.find(dto => dto.name == mod.character);
      if (playerCharacterDto == null) {
        playerCharacterDto = new CharacterModDto();
        playerCharacterDto.name = mod.character;
        this.playerCharacterDtos.push(playerCharacterDto);
        playerCharacterDto.unitData = this.saveData.playerModData.playerData.units.find(unit => unit.data.base_id == mod.character);
        if (this.saveData.restoredLockedMods != null && this.saveData.restoredLockedMods.length > 0) {
          let savedMods: SaveModDto[] = this.saveData.restoredLockedMods.filter(saveDto => saveDto.character == playerCharacterDto.name);
          savedMods.forEach(saveMod => {
            let foundLockedMod = allMods.find(modIndex => modIndex.id == saveMod.id);
            if (foundLockedMod != null) {
              playerCharacterDto.lockedMods.push(foundLockedMod);
            }
          });
        }
      }
      playerCharacterDto.currentMods.push(mod);
      playerCharacterDto.pendingMods.push(mod);
    });
    this.saveData.playerModData.playerData.units.forEach(unit => {

      if (unit.data.combat_type == 1) {
        let playerCharacterDto: CharacterModDto = this.playerCharacterDtos.find(dto => dto.name == unit.data.base_id);

        if (playerCharacterDto == null) {
          playerCharacterDto = new CharacterModDto();
          playerCharacterDto.name = unit.data.base_id;
          this.playerCharacterDtos.push(playerCharacterDto);
          playerCharacterDto.unitData = unit;
          if (this.saveData.restoredLockedMods != null && this.saveData.restoredLockedMods.length > 0) {
            let savedMods: SaveModDto[] = this.saveData.restoredLockedMods.filter(saveDto => saveDto.character == playerCharacterDto.name);
            savedMods.forEach(saveMod => {
              let foundLockedMod = allMods.find(modIndex => modIndex.id == saveMod.id);
              if (foundLockedMod != null) {
                playerCharacterDto.lockedMods.push(foundLockedMod);
              }
            });
          }
        }
      }
    })
    this.generateDefaultEditorViews();
  }

  // return a list of locked mods
  // TODO implement false method of this
  getLockedMods(locked: boolean): ModsEntity[] {
    let retVal: ModsEntity[] = [];
    if (this.playerCharacterDtos != null) {

      if (locked) {

        this.playerCharacterDtos.forEach(dto => {
          dto.lockedMods.forEach(mod => {
            retVal.push(mod);
          })
        });
      }

    }
    return retVal;
  }

  // return a list of locked mods ids and the characters they are locked to
  getLockedModDtos(locked: boolean): LockedModDto[] {
    let retVal: LockedModDto[] = [];
    if (this.playerCharacterDtos != null) {

      if (locked) {

        this.playerCharacterDtos.forEach(dto => {
          dto.lockedMods.forEach(mod => {
            retVal.push({
              id: mod.id,
              name: dto.name
            });
          })
        });
      }
    }
    return retVal;
  }

  optimize(name: string) {
    let allMods = this.getFullModList();

    let availableMods = allMods;
    let usedMods: ModsEntity[] = this.getLockedMods(true);

    let optimizationCharacterData = this.optimizationData.characterResults.find(optimizationCharacter => optimizationCharacter.name == name);

    if (optimizationCharacterData != null) {
      let bestMods: CharacterBestMods = new CharacterBestMods();
      bestMods.name = name;
      this.assignedModSets.push(bestMods);


      // filter mods down to applicable
      let viableMods = availableMods.filter(availableMod => usedMods.find(usedMod => usedMod.id == availableMod.id) == null);

      let modsStrength: EvaluatedModDto[] = [];
      viableMods.forEach(modUnitEntity => {
        modsStrength.push({
          strength: SwgohGgCalc.calculateModOptimizationStrength(modUnitEntity, optimizationCharacterData),
          mod: modUnitEntity
        });
      });

      modsStrength.sort((n1, n2) => {
        return n2.strength - n1.strength;
      });

      let bestSquares: EvaluatedModDto[] = [];
      let bestDiamonds: EvaluatedModDto[] = [];
      let bestCircles: EvaluatedModDto[] = [];
      let bestArrows: EvaluatedModDto[] = [];
      let bestTriangles: EvaluatedModDto[] = [];
      let bestCrosses: EvaluatedModDto[] = [];

      SwgohGgCalc.FULL_SET_LIST.forEach(setName => {

        let bestSquare = this.getBestMod(modsStrength, MOD_SLOT_SQUARE, setName);
        if (bestSquare == null) {
          console.log('unable to find bestSquare for: ' + setName);
        } else {
          bestSquares.push(bestSquare);
        }

        let bestDiamond = this.getBestMod(modsStrength, MOD_SLOT_DIAMOND, setName);
        if (bestDiamond == null) {
          console.log('unable to find bestDiamond for: ' + setName);
        } else {
          bestDiamonds.push(bestDiamond);
        }

        let bestCircle = this.getBestMod(modsStrength, MOD_SLOT_CIRCLE, setName);
        if (bestCircle == null) {
          console.log('unable to find bestCircle for: ' + setName);
        } else {
          bestCircles.push(bestCircle);
        }

        let bestArrow = this.getBestMod(modsStrength, MOD_SLOT_ARROW, setName);
        if (bestArrow == null) {
          console.log('unable to find bestArrow for: ' + setName);
        } else {
          bestArrows.push(bestArrow);
        }

        let bestTriangle = this.getBestMod(modsStrength, MOD_SLOT_TRIANGLE, setName);
        if (bestTriangle == null) {
          console.log('unable to find bestTriangle for: ' + setName);
        } else {
          bestTriangles.push(bestTriangle);
        }

        let bestCross = this.getBestMod(modsStrength, MOD_SLOT_CROSS, setName);
        if (bestCross == null) {
          console.log('unable to find bestCross for: ' + setName);
        } else {
          bestCrosses.push(bestCross);
        }
      });

      let bestValue: number = 0;

      bestSquares.forEach(square => {
        bestDiamonds.forEach(diamond => {
          bestCircles.forEach(circle => {
            bestArrows.forEach(arrow => {
              bestTriangles.forEach(triangle => {
                bestCrosses.forEach(cross => {

                  let setValue = this.calculateTotalSetValue(square, diamond, circle, arrow, triangle, cross, optimizationCharacterData);
                  if (setValue > bestValue) {
                    bestValue = setValue;
                    bestMods.bestSquare = square;
                    bestMods.bestDiamond = diamond;
                    bestMods.bestCircle = circle;
                    bestMods.bestArrow = arrow;
                    bestMods.bestTriangle = triangle;
                    bestMods.bestCross = cross;
                  }
                });
              });
            });
          });
        });
      });

      bestMods.bestSquare != null ? usedMods.push(bestMods.bestSquare.mod) : null;
      bestMods.bestDiamond != null ? usedMods.push(bestMods.bestDiamond.mod) : null;
      bestMods.bestCircle != null ? usedMods.push(bestMods.bestCircle.mod) : null;
      bestMods.bestArrow != null ? usedMods.push(bestMods.bestArrow.mod) : null;
      bestMods.bestTriangle != null ? usedMods.push(bestMods.bestTriangle.mod) : null;
      bestMods.bestCross != null ? usedMods.push(bestMods.bestCross.mod) : null;


      let characterModDto: CharacterModDto = this.playerCharacterDtos.find(dto => dto.name == name);
      characterModDto.pendingMods = [bestMods.bestSquare.mod, bestMods.bestDiamond.mod,
      bestMods.bestCircle.mod, bestMods.bestArrow.mod,
      bestMods.bestTriangle.mod, bestMods.bestCross.mod];

    }

  }

  calculateTotalSetValue(square: EvaluatedModDto, diamond: EvaluatedModDto, circle: EvaluatedModDto,
    arrow: EvaluatedModDto, triangle: EvaluatedModDto, cross: EvaluatedModDto,
    optimizationCharacterData: ModCalculatorCharacterResultsDto): number {

    let retVal: number = 0;

    let modValues: number = square.strength + diamond.strength + circle.strength + arrow.strength + triangle.strength + cross.strength;

    let setsById = SwgohGgCalc.getSetsById([square.mod, diamond.mod, circle.mod, arrow.mod, triangle.mod, cross.mod]);

    if (SwgohGgCalc.hasFourSet(setsById)) {
      let twoFourMultiplier = optimizationCharacterData.fourSetsMultiplier;

      let offenseMultipler = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_OFFENSE];
      let critDmgMultipler = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_CRIT_DMG];
      let speedMultipler = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_SPEED];

      let critChanceMultiplier = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_CRIT_CHANCE];
      let defenseMultiplier = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_DEFENSE];
      let healthMultiplier = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_HEALTH];
      let potencyMultiplier = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_POTENCY];
      let tenacityMultiplier = optimizationCharacterData.fourSetMultipliers[SwgohGgConstants.MOD_SET_TENACITY];

      offenseMultipler = offenseMultipler == null ? 0 : offenseMultipler;
      critDmgMultipler = critDmgMultipler == null ? 0 : critDmgMultipler;
      speedMultipler = speedMultipler == null ? 0 : speedMultipler;

      critChanceMultiplier = critChanceMultiplier == null ? 0 : critChanceMultiplier;
      defenseMultiplier = defenseMultiplier == null ? 0 : defenseMultiplier;
      healthMultiplier = healthMultiplier == null ? 0 : healthMultiplier;
      potencyMultiplier = potencyMultiplier == null ? 0 : potencyMultiplier;
      tenacityMultiplier = tenacityMultiplier == null ? 0 : tenacityMultiplier;

      let fourSetMultiplier = (offenseMultipler * setsById[SwgohGgConstants.MOD_SET_OFFENSE]) +
        (speedMultipler * setsById[SwgohGgConstants.MOD_SET_SPEED]) +
        (critDmgMultipler * setsById[SwgohGgConstants.MOD_SET_CRIT_DMG]);

      let twoSetMultiplier = (critChanceMultiplier * setsById[SwgohGgConstants.MOD_SET_CRIT_CHANCE]) +
        (defenseMultiplier * setsById[SwgohGgConstants.MOD_SET_DEFENSE]) +
        (healthMultiplier * setsById[SwgohGgConstants.MOD_SET_HEALTH]) +
        (potencyMultiplier * setsById[SwgohGgConstants.MOD_SET_POTENCY]) +
        (tenacityMultiplier * setsById[SwgohGgConstants.MOD_SET_TENACITY]);

      retVal = (modValues * twoFourMultiplier * fourSetMultiplier) * 2 + (modValues * twoFourMultiplier * twoSetMultiplier);

    } else {

      let twoFourMultiplier = optimizationCharacterData.twoSetsMultiplier;

      let twoSetCounts = [];
      optimizationCharacterData.twoSetOccurrenceCounts.forEach(twoSetOccurance => {
        let setOccuranceCount = setsById[twoSetOccurance.set];
        if (setOccuranceCount >= twoSetOccurance.occurrence) {
          twoSetCounts.push(twoSetOccurance.count);
        }
      });

      retVal = (modValues * twoFourMultiplier * twoSetCounts[0] / optimizationCharacterData.twoSetOccurrenceCounts[0].count) +
        (modValues * twoFourMultiplier * twoSetCounts[1] / optimizationCharacterData.twoSetOccurrenceCounts[1].count) +
        (modValues * twoFourMultiplier * twoSetCounts[2] / optimizationCharacterData.twoSetOccurrenceCounts[2].count);
    }

    return retVal;
  }

  getBestMod(mods: EvaluatedModDto[], slot: number, setName: string): EvaluatedModDto {
    let retVal: EvaluatedModDto = null;
    mods.forEach(mod => {
      if (retVal == null && mod.mod.slot == slot && SwgohGgCalc.isSwgohSet(mod.mod.set, setName)) {
        retVal = mod;
      }
    });
    return retVal;
  }

}
