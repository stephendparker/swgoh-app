import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-squad-edit',
  templateUrl: './squad-edit.component.html',
  styleUrls: ['./squad-edit.component.scss']
})
export class SquadEditComponent implements OnInit {

  @Input() characters: string[] = [];

  @Output() squadUpdated: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  selectCharacter(name: string) {
    if (this.characters.find(existingName => existingName == name) == null)
      this.characters.push(name);
    this.squadUpdated.emit(this.characters);
  }

  removeCharacter(name: string) {
    if (name != null)
      this.characters = this.characters.filter(existingName => existingName != name)
    this.squadUpdated.emit(this.characters);
  }

}
