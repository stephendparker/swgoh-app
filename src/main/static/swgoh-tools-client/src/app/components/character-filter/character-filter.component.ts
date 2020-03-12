import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CharacterData } from './../../model/swgohgg/character-data';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrls: ['./character-filter.component.scss']
})
export class CharacterFilterComponent implements OnInit, OnDestroy {

  @Output() selectionChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  categoriesFormControl = new FormControl();
  categoryList: string[] = [];

  protected unsubscribe$ = new Subject<void>();

  selected: string;

  characterData: CharacterData[] = null;

  constructor(private dataStoreService: DataStoreService) {

  }

  ngOnInit() {
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

        this.selectionChange.emit(charData.map(cd => cd.base_id));
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectAll() {
    this.filterChange(null);
  }


  filterChange(filterChangeEvent: any) {
    let characters: string[] = [];
    this.selected = null;
    if (filterChangeEvent == null) {
      characters = this.characterData.map(character => character.base_id);
    } else {
      this.selected = filterChangeEvent.value;
      characters = this.characterData.filter(character => {
        return character.categories.indexOf(filterChangeEvent.value) != -1;
      }).map(character => character.base_id);
    }
    this.selectionChange.emit(characters);
  }

}
