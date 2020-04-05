import { Component, OnInit, ChangeDetectorRef, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataStoreService } from './../../services/data-store.service';
import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { delay, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { CharacterData } from './../../model/swgohgg/character-data';

@Component({
  selector: 'app-squad-manager',
  templateUrl: './squad-manager.component.html',
  styleUrls: ['./squad-manager.component.scss']
})
export class SquadManagerComponent implements OnInit, OnDestroy {

  @Output() updateSquads: EventEmitter<string[][]> = new EventEmitter();

  protected unsubscribe$ = new Subject<void>();

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  characterGroups: string[][] = [];
  fullCharacterList: string[] = [];

  filterSelected: string;
  filteredCharacters: string[] = [];

  categoriesFormControl = new FormControl();
  categoryList: string[] = [];
  characterData: CharacterData[] = null;

  constructor(private dataStoreService: DataStoreService, private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataStoreService.getCharacterData().pipe(takeUntil(this.unsubscribe$)).subscribe(charData => {
      if (charData != null) {
        this.characterData = charData;

        this.categoryList = [];
        charData.forEach(cData => {
          this.fullCharacterList.push(cData.base_id);
          cData.categories.forEach(category => {
            this.categoryList.indexOf(category) === -1 ? this.categoryList.push(category) : null;
          });

        });
        this.categoryList = this.categoryList.sort((a, b) => a.localeCompare(b));
      }
    });

    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setCharacterGroups(characterGroups: string[][]) {
    this.characterGroups = characterGroups;
    this.cdr.detectChanges();
  }

  filterChange(filterChangeEvent: any) {
    this.filteredCharacters = [];
    this.filterSelected = null;
    if (filterChangeEvent == null) {
      this.filteredCharacters = this.characterData.map(character => character.base_id);
    } else {
      this.filterSelected = filterChangeEvent.value;
      this.filteredCharacters = this.characterData.filter(character => {
        return character.categories.indexOf(filterChangeEvent.value) != -1;
      }).map(character => character.base_id);
    }
  }

  unassignedCharacters(): string[] {
    let unassignedCharacters: string[] = [];
    if (this.fullCharacterList != null) {
      unassignedCharacters = this.fullCharacterList.filter(characterName => {
        let retVal = true;

        this.characterGroups.forEach(group => {
          group.forEach(groupCharacter => {
            if (groupCharacter == characterName) {
              retVal = false;
            }
          })
        });
        return retVal;
      });
    }
    unassignedCharacters = this.filterSelected == null ? unassignedCharacters :
      unassignedCharacters.filter(charName => this.filteredCharacters.indexOf(charName) != -1)
    return unassignedCharacters;
  }

  dropAddToGroup(event: CdkDragDrop<string[]>) {
    let characterToMove = event.previousContainer.data[event.previousIndex];
    let allAssignedCharacters = this.getAllAssignedCharacters();
    if (allAssignedCharacters.indexOf(characterToMove) != -1) {
      // adding from another group
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      // adding from available
      event.container.data.splice(event.currentIndex, 0, characterToMove);
    }
    this.cleanupGroups();
    this.updateSquads.emit(this.characterGroups);
  }

  dropAddAvailable(event: CdkDragDrop<string[]>) {
    event.previousContainer.data.splice(event.previousIndex, 1);
    this.cleanupGroups();
    this.updateSquads.emit(this.characterGroups);
  }

  dropCreateGroup(event: CdkDragDrop<string[]>) {
    let newList = [];
    this.characterGroups.push(newList);

    let characterToMove = event.previousContainer.data[event.previousIndex];

    let allAssignedCharacters = this.getAllAssignedCharacters();
    if (allAssignedCharacters.indexOf(characterToMove) != -1) {
      // adding from another group
      transferArrayItem(event.previousContainer.data,
        newList,
        event.previousIndex,
        0);
    } else {
      // adding from available
      newList.push(characterToMove);
    }
    this.cleanupGroups();
    this.updateSquads.emit(this.characterGroups);
  }

  getAllAssignedCharacters(): string[] {
    let retVal: string[] = [];
    this.characterGroups.forEach(group => {
      retVal.push.apply(retVal, group);
    })
    return retVal;
  }

  cleanupGroups() {
    this.characterGroups = this.characterGroups.filter(group => group.length > 0);
  }
}
