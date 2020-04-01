import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class SecondaryInput {
  public rolls: number = 0;
  public amount: number = 0;
}

@Component({
  selector: 'app-mod-secondary-input',
  templateUrl: './mod-secondary-input.component.html',
  styleUrls: ['./mod-secondary-input.component.scss']
})
export class ModSecondaryInputComponent implements OnInit {

  @Input() label: string;
  @Input() rolls: number = 0;
  @Input() amount: number = 0;

  input: SecondaryInput = new SecondaryInput();

  @Output() valueChanged: EventEmitter<SecondaryInput> = new EventEmitter<SecondaryInput>();


  constructor() { }

  ngOnInit() {
    this.input.rolls = this.rolls;
  }

  updateAmount() {
    this.input.amount = this.amount;
    this.valueChanged.emit(this.input);
  }

  incrementRolls(amount: number) {
    this.input.rolls = this.input.rolls + amount;
    this.valueChanged.emit(this.input);
  }

}
