import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { CharacterData } from './../../model/swgohgg/character-data';

@Component({
  selector: 'app-character-portrait',
  templateUrl: './character-portrait.component.html',
  styleUrls: ['./character-portrait.component.scss']
})
export class CharacterPortraitComponent implements OnInit, OnDestroy, OnChanges {

  @Input() baseId: string;
  @Input() showName: boolean = true;
  @Input() maxHeight: string = null;

  @Input() locked: boolean = false;

  protected unsubscribe$ = new Subject<void>();

  characterData: CharacterData = null;
  name: string = null;
  imageUrl: SafeUrl = null;


  allCharacterData: CharacterData[] = null;

  constructor(private dataStoreService: DataStoreService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataStoreService.getCharacterData().pipe(takeUntil(this.unsubscribe$)).subscribe(charData => {
      if (charData != null) {
        this.allCharacterData = charData;
        this.setBaseId(this.baseId);
      }
    });
  }


  ngOnChanges() {
    this.setBaseId(this.baseId);
  }

  setBaseId(baseId: string) {
    this.baseId = baseId;
    if (this.allCharacterData != null) {
      this.characterData = this.allCharacterData.find(character => character.base_id == this.baseId);
      if (this.characterData != null) {
        this.name = this.characterData.name;

        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`${'https://swgoh.gg' + this.characterData.image}`);
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
