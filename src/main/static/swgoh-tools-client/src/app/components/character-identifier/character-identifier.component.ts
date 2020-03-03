import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CharacterData } from './../../model/swgohgg/character-data';

@Component({
  selector: 'app-character-identifier',
  templateUrl: './character-identifier.component.html',
  styleUrls: ['./character-identifier.component.scss']
})
export class CharacterIdentifierComponent implements OnInit, OnDestroy {

  @Input() baseId: string;

  protected unsubscribe$ = new Subject<void>();

  characterData: CharacterData = null;
  name: string = null;

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
    this.dataStoreService.getCharacterData().pipe(takeUntil(this.unsubscribe$)).subscribe(charData => {
      if (charData != null) {
        this.characterData = charData.find(character => character.base_id == this.baseId);
        if (this.characterData != null) {
          this.name = this.characterData.name;
        }
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
