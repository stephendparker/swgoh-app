import { Component, OnInit, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { CharacterPortraitComponent } from './../character-portrait/character-portrait.component';

@Component({
  selector: 'app-squad-display',
  templateUrl: './squad-display.component.html',
  styleUrls: ['./squad-display.component.scss']
})
export class SquadDisplayComponent implements OnInit {

  @Input() characters: string[] = [];

  @Output() characterSelected: EventEmitter<string> = new EventEmitter<string>();

  @Input() lockedCharacters: string[] = [];


  private characterPortraits: QueryList<CharacterPortraitComponent>;

  @ViewChildren('characterPortraits') set content(content: QueryList<CharacterPortraitComponent>) {
    this.characterPortraits = content;
    this.setLockedCharacters(this.lockedCharacters);
  }


  constructor() { }

  ngOnInit() {
  }

  clickCharacter(name: string) {
    this.characterSelected.emit(name);
  }


  setLockedCharacters(characters: string[]) {
    this.lockedCharacters = characters;
    if (this.characterPortraits != null && this.lockedCharacters != null) {
      this.characterPortraits.forEach(characterPortrait => {
        characterPortrait.locked = characters.find(character => character == characterPortrait.baseId) != null;
      });
    }
  }


}
