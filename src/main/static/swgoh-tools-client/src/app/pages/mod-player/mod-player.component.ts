import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { Subject, forkJoin } from 'rxjs';
import { ModCalculatedData, SwgohGgCalc, ModUnitCalcResults, SetTotalCounts, CommonSet, EvaluatedModDto, ModTotalBonus, StatsDto, SetInfo } from './../../calcs/swgoh-gg-calc';
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
import { SquadEditComponent } from './../../components/squad-edit/squad-edit.component';
import { SquadDisplayComponent } from './../../components/squad-display/squad-display.component';
import { RefreshModDialogComponent } from './../../components/refresh-mod-dialog/refresh-mod-dialog.component';
import { HotutilsDataService } from './../../services/hotutils-data.service';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';

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
class CharacterModDto {
  public name: string;
  public currentMods: ModsEntity[] = [];
  public lockedMods: ModsEntity[] = [];
  public pendingMods: ModsEntity[] = [];
  public unitData: UnitsEntity;
}
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
  modelAllyCodes: number[];

  playerData: PlayerData = null;
  playerMods: Mods = null; // players mods
  unequippedMods: ModsEntity[] = [];

  calculatedModelGuildData: ModCalculatedData = null;
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

@Component({
  selector: 'app-mod-player',
  templateUrl: './mod-player.component.html',
  styleUrls: ['./mod-player.component.scss']
})
export class ModPlayerComponent implements OnInit, OnDestroy {

  SwgohGgCalc: typeof SwgohGgCalc = SwgohGgCalc;

  public VIEW_SELECT_CHARACTER = 1;
  public VIEW_MODS = 2;
  public VIEW_REVIEW_CHARACTER = 3;
  public VIEW_EDIT_SQUAD = 4;

  public viewMode: number = null;

  @ViewChildren('currentModsDisplay') modDisplayCurrentMods: QueryList<ModDisplayComponent>;
  @ViewChildren('lockedModsDisplay') modDisplayLockedMods: QueryList<ModDisplayComponent>;
  @ViewChildren('pendingModsDisplay') pendingModsDisplay: QueryList<ModDisplayComponent>;
  @ViewChildren('compareCurrentNew') compareCurrentNew: QueryList<ModSetComparisonComponent>;
  @ViewChildren('compareNewPending') compareNewPending: QueryList<ModSetComparisonComponent>;
  @ViewChildren('compareCurrentPending') compareCurrentPending: QueryList<ModSetComparisonComponent>;
  @ViewChildren('characterPortrait') characterPortrait: QueryList<CharacterPortraitComponent>;
  @ViewChildren('selectedSlotModPortrait') selectedSlotModPortrait: QueryList<ModPortraitComponent>;
  @ViewChild(AddCharacterComponent) addCharacterComponent: AddCharacterComponent;
  @ViewChild(ModListComponentComponent) modList: ModListComponentComponent;
  @ViewChild(SquadEditComponent) squadEditComponent: SquadEditComponent;

  private squadDisplay: QueryList<SquadDisplayComponent>;

  @ViewChildren('squadDisplay') set content(content: QueryList<SquadDisplayComponent>) {

    this.squadDisplay = content;
  }

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  modelSource: string;
  protected unsubscribe$ = new Subject<void>();

  fullyLockedCharacters: CharacterModDto[] = [];

  // data returned from services (not configured by user)
  playerModData: PlayerModData = new PlayerModData();

  selectedSlotMod: ModsEntity; // the mod the user clicks in their display
  selectedCharacterDto: CharacterModDto = null;
  selectedModEditorViewConfiguration: ModEditorViewConfiguration = null;
  modCalcResults: ModUnitCalcResults = null;
  playerCharacterDtos: CharacterModDto[];

  evaludatedMods: EvaluatedModDto[];
  assignedModSets: CharacterBestMods[] = [];
  selectedCharacter: string = null;

  sortField: string = 'strength';
  filterSets: number[] = [];
  filterSlots: number[] = [];
  filterLocked: boolean = true;

  playerModConfiguration: PlayerModConfiguration = new PlayerModConfiguration();

  modelGuildMods: Mods[] = null;

  editSquadIndex: number = null;

  SQUADS_LOCAL_STORAGE_KEY = "squads";
  PLAYER_MOD_DATA_STORAGE_KEY = "playerModData";
  PLAYER_LOCKED_MOD_DATA_STORAGE_KEY = "lockedMods";

  squads: string[][] = [];

  restoredLockedMods: SaveModDto[] = null;

  constructor(private dataStoreService: DataStoreService, private hotutilsDataService: HotutilsDataService,
    private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { }

  ngOnInit() {

    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });

    let squadString = localStorage.getItem(this.SQUADS_LOCAL_STORAGE_KEY);
    if (squadString != null) {
      this.squads = JSON.parse(squadString);
    }
    let pmdString = localStorage.getItem(this.PLAYER_MOD_DATA_STORAGE_KEY);
    if (pmdString != null) {
      this.playerModData = JSON.parse(pmdString);

      let savedModsString = localStorage.getItem(this.PLAYER_LOCKED_MOD_DATA_STORAGE_KEY);
      if (savedModsString != null) {
        this.restoredLockedMods = JSON.parse(savedModsString);
      }
      this.refreshDataCalculations();
    }
    this.updateFullyLockedCharacters();
    (async () => {
      await delay(1);
      this.updateFullyLockedCharacters();
      if (this.squadDisplay != null) {
        this.squadDisplay.forEach(squadDisplayComponent => {
          squadDisplayComponent.setLockedCharacters(this.fullyLockedCharacters.map(flc => flc.name));
        });
      }

      if (this.playerModData.playerAllyCode == null) {
        this.openPlayerLogin();
      } else {
        this.viewMode = this.VIEW_SELECT_CHARACTER;
      }
    })();
  }

  generateDefaultEditorViews() {
    let views: ModEditorViewConfiguration[] = this.playerModConfiguration.modEditorViewConfigurations
    this.playerCharacterDtos.forEach(pcd => {

      if (views.find(view => view.characterName == pcd.name) == null) {

        let modEditorViewConfiguration = new ModEditorViewConfiguration();
        modEditorViewConfiguration.characterName = pcd.name;

        // get optimization object
        let modCalcResults: ModUnitCalcResults = this.playerModData.calculatedModelGuildData.modCalcResults.units.find(unit => unit.name == pcd.name);
        if (modCalcResults != null) {
          if (modCalcResults.commonSet1 != null) {
            let setNumber = SwgohGgCalc.convertSetPropertyNameToNumber(modCalcResults.commonSet1);
            modEditorViewConfiguration.filterSets.indexOf(setNumber) === -1 ? modEditorViewConfiguration.filterSets.push(setNumber) : null;
          }
          if (modCalcResults.commonSet2 != null) {
            let setNumber = SwgohGgCalc.convertSetPropertyNameToNumber(modCalcResults.commonSet2);
            modEditorViewConfiguration.filterSets.indexOf(setNumber) === -1 ? modEditorViewConfiguration.filterSets.push(setNumber) : null;
          }
          if (modCalcResults.commonSet3 != null) {
            let setNumber = SwgohGgCalc.convertSetPropertyNameToNumber(modCalcResults.commonSet3);
            modEditorViewConfiguration.filterSets.indexOf(setNumber) === -1 ? modEditorViewConfiguration.filterSets.push(setNumber) : null;
          }

          modEditorViewConfiguration.circlePrimaryFilters = this.getAcceptablePrimary(modCalcResults, "circlePrimaryCounts");
          modEditorViewConfiguration.crossPrimaryFilters = this.getAcceptablePrimary(modCalcResults, "crossPrimaryCounts");
          modEditorViewConfiguration.arrowPrimaryFilters = this.getAcceptablePrimary(modCalcResults, "arrowPrimaryCounts");
          modEditorViewConfiguration.trianglePrimaryFilters = this.getAcceptablePrimary(modCalcResults, "trianglePrimaryCounts");
        }
        views.push(modEditorViewConfiguration);
      }
    });
  }

  getAcceptablePrimary(modCalcResults: ModUnitCalcResults, propertyName: string): number[] {
    let countTotal = 0;
    let primaryMost = 0;

    modCalcResults[propertyName].forEach(primaryCount => {
      countTotal = countTotal + primaryCount.count;
      primaryMost = primaryCount.count > primaryMost ? primaryCount.count : primaryMost;
    });
    let highestPercent = primaryMost / countTotal;

    return modCalcResults[propertyName].filter(primaryCount => {
      return highestPercent - (primaryCount.count / countTotal) < .25;
    }).map(primaryCount => SwgohGgCalc.convertPrimaryTitleToNumber(primaryCount.primaryType));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  saveSettings() {
    localStorage.setItem(this.SQUADS_LOCAL_STORAGE_KEY, JSON.stringify(this.squads));
    localStorage.setItem(this.PLAYER_MOD_DATA_STORAGE_KEY, JSON.stringify(this.playerModData));

    if (this.playerCharacterDtos) {
      let saveMods: SaveModDto[] = [];

      this.playerCharacterDtos.forEach(characterPlayerDto => {
        if (characterPlayerDto.lockedMods != null && characterPlayerDto.lockedMods.length > 0) {
          characterPlayerDto.lockedMods.forEach(mod => {
            saveMods.push({
              id: mod.id,
              character: characterPlayerDto.name
            });
          });
        }
      });
      localStorage.setItem(this.PLAYER_LOCKED_MOD_DATA_STORAGE_KEY, JSON.stringify(saveMods))
    }
  }

  updateSquad(squad: string[]) {
    this.squads[this.editSquadIndex] = squad;
    this.saveSettings();
  }

  reloadData(playerSwgohGg: boolean, playerHotutils: boolean, optimizationSwgohGg: boolean,
    clearMods: boolean, sessionIdHotutils: string) {

    let netWorkCalls = [];
    let netWorkResponses = [];

    if (playerSwgohGg) {
      netWorkCalls.push(this.dataStoreService.getPlayerData(this.playerModData.playerAllyCode));
      netWorkResponses.push((playerData) => {
        if (playerData != null) {
          this.playerModData.playerData = playerData;

        }
      })
      netWorkCalls.push(this.dataStoreService.getPlayerModData(+this.playerModData.playerAllyCode));
      netWorkResponses.push((playerMods) => {
        if (playerMods != null) {
          this.playerModData.playerMods = playerMods.value.body;
          let filteredMods = this.playerModData.playerMods.mods.filter(mod => mod.character == "EMPERORPALPATINE");
          let y = 10;
        }
      })
    }
    if (playerHotutils) {
      netWorkCalls.push(this.hotutilsDataService.playerMods(sessionIdHotutils));
      netWorkResponses.push((playerModListResponse) => {
        if (playerModListResponse != null) {
          this.playerModData.unequippedMods = playerModListResponse;
        }
      })
    }
    if (optimizationSwgohGg && this.playerModData.modelAllyCodes != null) {
      netWorkCalls.push(this.dataStoreService.getPlayerListModData(this.playerModData.modelAllyCodes));
      netWorkResponses.push((playerModListResponse) => {
        if (playerModListResponse != null) {
          this.modelGuildMods = playerModListResponse;
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

  refreshData() {

    this.dataStoreService.setLockInput(true);

    this.dataStoreService.getPlayerData(this.playerModData.playerAllyCode).subscribe(playerData => {
      if (playerData != null) {
        this.playerModData.playerData = playerData;

        this.dataStoreService.getPlayerModData(+this.playerModData.playerAllyCode).subscribe(playerMods => {
          if (playerMods != null) {
            this.playerModData.playerMods = playerMods.value.body;

            if (this.playerModData.modelAllyCodes == null || this.playerModData.modelAllyCodes.length == 0) {
              this.dataStoreService.setLockInput(false);
              this.refreshDataCalculations();
            } else {

              this.dataStoreService.getPlayerListModData(this.playerModData.modelAllyCodes).subscribe(playerModListResponse => {
                if (playerModListResponse != null) {
                  this.modelGuildMods = playerModListResponse;
                  this.refreshDataCalculations();
                }
              }, (error) => {
                console.log("get players error: " + error);
              }, () => {
                this.dataStoreService.setLockInput(false);
                console.log("get players complete");
              });
            }
          }
        });
      }
    });
  }

  refreshDataCalculations() {
    this.generatePlayerCharacterDtos();
    if (this.modelGuildMods != null && this.modelGuildMods.length > 0) {
      this.playerModData.calculatedModelGuildData = SwgohGgCalc.calculateMods(this.modelGuildMods);
    }
  }

  clickUnlockAll() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {
        confirmationText: 'Are you sure you want to unlock all characters?'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.playerCharacterDtos.forEach(characterModDto => {
          characterModDto.lockedMods = [];
        });
        this.saveSettings();
        this.updateComponents();
        this.cdr.detectChanges();
      }
    });
  }

  clickRefreshData() {
    const dialogRef = this.dialog.open(RefreshModDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {}
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.reloadData(result.playerSwgohGg, result.playerHotutils, result.optimizationSwgohGg, result.clearMods, result.sessionIdHotutils);
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
        this.playerModData.playerAllyCode = result.playerId;
        this.playerModData.modelAllyCodes = result.modelPlayers;
        // this.refreshData();

        this.reloadData(true, result.playerHotutils != null, result.playerHotutils, false, result.playerHotutils);

        this.viewMode = this.VIEW_SELECT_CHARACTER;
      }
    });
  }

  // FROM UI
  toggleSetFilter(id: number) {

    if (this.filterSets.indexOf(id) == -1) {
      this.filterSets.push(id);
    } else {
      this.filterSets = this.filterSets.filter(filterName => filterName != id);
    }
    this.modList.setModSetFilter(this.filterSets);
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

  editSquad(squad: string[], index: number) {
    this.viewMode = this.VIEW_EDIT_SQUAD;
    this.squadEditComponent.characters = squad;
    this.editSquadIndex = index;
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
        this.squads = this.squads.filter((squad, indexSquad) => indexSquad != index);
        this.updateComponents();
        this.cdr.detectChanges();
      }
    });
  }

  createSquad() {
    let newSquad: string[] = [];
    this.squads.push(newSquad);
    this.viewMode = this.VIEW_EDIT_SQUAD;
    this.squadEditComponent.characters = newSquad;
    this.editSquadIndex = this.squads.length - 1;
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
  getModelData(): ModCalculatedData {
    return this.playerModData.calculatedModelGuildData;
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

  toggleLock(characterModDto: CharacterModDto) {

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
    let retVal = this.playerModData.playerMods.mods.slice(0);
    // if (this.)
    if (this.playerModData.unequippedMods != null && this.playerModData.unequippedMods.length != null) {
      this.playerModData.unequippedMods.forEach(unequippedMod => {
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
    this.modCalcResults = null;

    if (name != null) {
      this.selectedCharacterDto = this.playerCharacterDtos.find(dto => dto.name == name);
      if (this.playerModData.calculatedModelGuildData != null) {
        this.modCalcResults = this.playerModData.calculatedModelGuildData.modCalcResults.units.find(unit => unit.name == name);
      }

      this.selectedModEditorViewConfiguration = this.playerModConfiguration.modEditorViewConfigurations.find(view => view.characterName == name);

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
        if (this.playerModData.calculatedModelGuildData != null) {
          let unit: ModUnitCalcResults = this.playerModData.calculatedModelGuildData.modCalcResults.units.find(unit => unit.name == name);
          strength = SwgohGgCalc.calculateModMatchStrength(mod, unit) * SwgohGgCalc.calculateModSetStrength(mod, unit);
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
    this.fullyLockedCharacters = this.playerCharacterDtos.filter(dto => dto.lockedMods != null && dto.lockedMods.length == 6);
  }

  updateComponents() {

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

    // this.addCharacterComponent.setLockedCharacters(fullyLockedCharacters);
    if (this.squadDisplay != null) {
      this.squadDisplay.forEach(squadDisplayComponent => {
        squadDisplayComponent.setLockedCharacters(this.fullyLockedCharacters.map(flc => flc.name));
      });
    }

    if (this.modDisplayCurrentMods) {
      this.modDisplayCurrentMods.forEach(modDisplay => {
        modDisplay.setMods(this.selectedCharacterDto == null ? null : this.selectedCharacterDto.currentMods);
      });
    }

    if (this.modDisplayLockedMods) {
      this.modDisplayLockedMods.forEach(modDisplay => {
        modDisplay.setMods(this.selectedCharacterDto == null ? null : this.selectedCharacterDto.lockedMods);
      });
    }

    if (this.pendingModsDisplay) {
      this.pendingModsDisplay.forEach(modDisplay => {
        modDisplay.setMods(this.selectedCharacterDto == null ? null : this.selectedCharacterDto.pendingMods);


        let lockedMods = this.selectedCharacterDto.pendingMods.filter(pendingMod => this.selectedCharacterDto.currentMods.find(newMod => newMod.id == pendingMod.id) == null);
        modDisplay.highlightMods = lockedMods;
        modDisplay.setLockedMods(this.selectedCharacterDto == null ? null : this.selectedCharacterDto.lockedMods);
        // TODO
        // this.modList.setTheLockedMods(this.getLockedModDtos(true));
      });
    }

    if (this.compareCurrentNew) {
      this.compareCurrentNew.forEach(compareCurrentNew => {

        if (this.selectedCharacterDto != null) {
          compareCurrentNew.setData(this.selectedCharacterDto.unitData, this.selectedCharacterDto.currentMods,
            this.selectedCharacterDto.currentMods, this.selectedCharacterDto.lockedMods, this.selectedCharacterDto.pendingMods);
        } else {
          compareCurrentNew.setData(null, null, null, null, null);
        }
      });
    }

    // TODO - dont need this
    if (this.compareCurrentPending) {
      this.compareCurrentPending.forEach(compareCurrentNew => {

        if (this.selectedCharacterDto != null) {
          compareCurrentNew.setData(this.selectedCharacterDto.unitData, this.selectedCharacterDto.currentMods,
            this.selectedCharacterDto.currentMods, this.selectedCharacterDto.lockedMods, this.selectedCharacterDto.pendingMods);
        } else {
          compareCurrentNew.setData(null, null, null, null, null);
        }
      });
    }
  }

  // selectedCharacterToMod(character: string) {
  //   this.selectedCharacter = character;
  //   this.selectedCharacterDto = null;
  //   this.cdr.detectChanges();

  //   if (character != null) {
  //     this.selectedCharacterDto = this.playerCharacterDtos.find(dto => dto.name == character);
  //   }
  //   this.cdr.detectChanges();
  //   this.updateComponents();
  // }



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
        playerCharacterDto.unitData = this.playerModData.playerData.units.find(unit => unit.data.base_id == mod.character);
        if (this.restoredLockedMods != null && this.restoredLockedMods.length > 0) {
          let savedMods: SaveModDto[] = this.restoredLockedMods.filter(saveDto => saveDto.character == playerCharacterDto.name);
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
    this.playerModData.playerData.units.forEach(unit => {
      let playerCharacterDto: CharacterModDto = this.playerCharacterDtos.find(dto => dto.name == unit.data.base_id);

      if (playerCharacterDto == null) {
        playerCharacterDto = new CharacterModDto();
        playerCharacterDto.name = unit.data.base_id;
        this.playerCharacterDtos.push(playerCharacterDto);
        playerCharacterDto.unitData = unit;
        if (this.restoredLockedMods != null && this.restoredLockedMods.length > 0) {
          let savedMods: SaveModDto[] = this.restoredLockedMods.filter(saveDto => saveDto.character == playerCharacterDto.name);
          savedMods.forEach(saveMod => {
            let foundLockedMod = allMods.find(modIndex => modIndex.id == saveMod.id);
            if (foundLockedMod != null) {
              playerCharacterDto.lockedMods.push(foundLockedMod);
            }
          });
        }
      }
    })
    this.generateDefaultEditorViews();
  }

  getLockedMods(locked: boolean): ModsEntity[] {
    let retVal: ModsEntity[] = [];
    if (locked) {

      this.playerCharacterDtos.forEach(dto => {
        dto.lockedMods.forEach(mod => {
          retVal.push(mod);
        })
      });
    }
    return retVal;
  }

  getLockedModDtos(locked: boolean): LockedModDto[] {
    let retVal: LockedModDto[] = [];
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
    return retVal;
  }

  optimize(name: string) {
    let allMods = this.getFullModList();

    let availableMods = allMods;
    let usedMods: ModsEntity[] = this.getLockedMods(true);

    let unit: ModUnitCalcResults = this.playerModData.calculatedModelGuildData.modCalcResults.units.find(unit => unit.name == name);
    if (unit != null) {
      let bestMods: CharacterBestMods = new CharacterBestMods();
      bestMods.name = name;
      this.assignedModSets.push(bestMods);


      // filter mods down to applicable
      let viableMods = availableMods.filter(availableMod => usedMods.find(usedMod => usedMod.id == availableMod.id) == null);

      let modsStrength: EvaluatedModDto[] = [];
      viableMods.forEach(modUnitEntity => {
        modsStrength.push({
          strength: SwgohGgCalc.calculateModMatchStrength(modUnitEntity, unit),
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

      let modelSetValue = SwgohGgCalc.calculateSetValue(unit.commonSet1, unit.commonSet2, unit.commonSet3, unit);

      let perfectTen = SwgohGgCalc.calculateSetValue("tenacity", "tenacity", "tenacity", unit);
      let perfectHealth = SwgohGgCalc.calculateSetValue("tenacity", "tenacity", "health", unit);
      let perfectHealth2 = SwgohGgCalc.calculateSetValue("health", "tenacity", "tenacity", unit);
      let speed = SwgohGgCalc.calculateSetValue("speed", "tenacity", null, unit);

      bestSquares.forEach(square => {
        bestDiamonds.forEach(diamond => {
          bestCircles.forEach(circle => {
            bestArrows.forEach(arrow => {
              bestTriangles.forEach(triangle => {
                bestCrosses.forEach(cross => {

                  let setValue = this.calculateTotalSetValue(square, diamond, circle, arrow, triangle, cross, modelSetValue, unit);
                  if (setValue > bestValue) {
                    bestValue = setValue;
                    setValue = this.calculateTotalSetValue(square, diamond, circle, arrow, triangle, cross, modelSetValue, unit);

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
    arrow: EvaluatedModDto, triangle: EvaluatedModDto, cross: EvaluatedModDto, modelSetValue: number, unit: ModUnitCalcResults): number {

    let modValues: number = square.strength + diamond.strength + circle.strength + arrow.strength + triangle.strength + cross.strength;

    let setTotalCounts: SetTotalCounts = SwgohGgCalc.getSets([square.mod, diamond.mod, circle.mod, arrow.mod, triangle.mod, cross.mod]);
    setTotalCounts.setTypeTotal = 1;

    let common1: string = null;
    let common2: string = null;
    let common3: string = null;

    let fourSet = SwgohGgCalc.getModSetMostCommon(SwgohGgCalc.FOUR_SET_LIST, setTotalCounts);
    if (fourSet != null) {
      common1 = fourSet;
      common2 = SwgohGgCalc.getModSetMostCommon(SwgohGgCalc.TWO_SET_LIST, setTotalCounts);
    } else {
      common1 = SwgohGgCalc.getModSetMostCommon(SwgohGgCalc.TWO_SET_LIST, setTotalCounts);
      setTotalCounts[common1] = setTotalCounts[common1] - 1;
      common2 = SwgohGgCalc.getModSetMostCommon(SwgohGgCalc.TWO_SET_LIST, setTotalCounts);
      setTotalCounts[common2] = setTotalCounts[common2] - 1;
      common3 = SwgohGgCalc.getModSetMostCommon(SwgohGgCalc.TWO_SET_LIST, setTotalCounts);
    }

    let setCounts: CommonSet = SwgohGgCalc.getCommonSet(setTotalCounts);
    let commonSetValue = SwgohGgCalc.calculateSetValue(common1, common2, common3, unit);

    return modValues * (commonSetValue / modelSetValue);
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
