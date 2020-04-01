import { Component, OnInit, Inject, Output, EventEmitter, QueryList, ViewChildren, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataStoreService } from './../../services/data-store.service';
import { CharacterPortraitComponent } from './../character-portrait/character-portrait.component';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.scss']
})
export class AddCharacterComponent implements OnInit {

  private characterPortraits: QueryList<CharacterPortraitComponent>;

  @ViewChildren('characterPortraits') set content(content: QueryList<CharacterPortraitComponent>) {
    this.characterPortraits = content;
    this.setLockedCharacters(this.lockedCharacters);
  }

  @Output() characterSelected: EventEmitter<string> = new EventEmitter<string>();

  @Input() hideCharacterList: string[] = [];

  selectedCharacters: string[] = []; // characters filtered to show

  lockedCharacters: string[] = [];

  constructor(private dataStoreService: DataStoreService) { }

  ngOnInit() {
  }

  selectCharacters(characters) {
    this.selectedCharacters = characters;
  }

  setLockedCharacters(characters: string[]) {
    this.lockedCharacters = characters;
    if (this.characterPortraits != null && this.lockedCharacters != null) {
      this.characterPortraits.forEach(characterPortrait => {
        characterPortrait.locked = characters.find(character => character == characterPortrait.baseId) != null;
      });
    }
  }

  addCharacter(character: string) {
    this.characterSelected.emit(character);
  }
}
