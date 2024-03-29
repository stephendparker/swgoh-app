import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { CharacterModDto, ModUnitCalcResults } from './../../calcs/swgoh-gg-calc';
import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { ModDisplayComponent } from './../mod-display/mod-display.component';
import { ModCalculatorCharacterResultsDto, ModCalculatorResultsDto } from './../../model/optimization/mod-optimization';
import { DataStoreService } from './../../services/data-store.service';

@Component({
  selector: 'app-character-mod-summary',
  templateUrl: './character-mod-summary.component.html',
  styleUrls: ['./character-mod-summary.component.scss']
})
export class CharacterModSummaryComponent implements OnInit, OnChanges {

  @Input() modDto: CharacterModDto;
  @Input() lockedMods: ModsEntity[] = [];
  

  @Input() allLocked: boolean = false;

  @Output() modsClicked: EventEmitter<any> = new EventEmitter();
  @Output() toggleLock: EventEmitter<any> = new EventEmitter();

  canLock: boolean = false;

  @ViewChild(ModDisplayComponent) modDisplay: ModDisplayComponent;


  displayMods: ModsEntity[];

  optimizationData: ModCalculatorResultsDto;  // used for mod optimization
  optimization: ModCalculatorCharacterResultsDto;

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  protected unsubscribe$ = new Subject<void>();

  constructor(private displayModeService: DisplayModeService, private dataStoreService: DataStoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });

    this.dataStoreService.getModOptimizationData().pipe(takeUntil(this.unsubscribe$)).subscribe(optimizationData => {
      if (optimizationData != null) {
        this.optimizationData = optimizationData;
        this.updateData();
        this.cdr.detectChanges();
      }
    });

    this.updateData();
  }

  ngOnChanges() {
    this.updateData();
    this.cdr.detectChanges();
  }

  clickMods() {
    this.modsClicked.emit(true);
  }

  clickToggleLock() {
    this.toggleLock.emit(true);
  }

  updateData() {
    this.displayMods = this.modDto.lockedMods.slice(0);

    this.optimization = this.optimizationData == null ? null : this.optimizationData.characterResults.find(optimizationCharacter => optimizationCharacter.name == this.modDto.name);

    this.canLock = true;

    this.modDto.currentMods.forEach(currentMod => {

      let slotAlreadyLocked: boolean = this.modDto.lockedMods.find(lockedMod => lockedMod.slot == currentMod.slot) != null;
      let modAlreadyLocked: boolean = this.lockedMods != null && this.lockedMods.find(lockedMod => lockedMod.id == currentMod.id) != null;

      if (slotAlreadyLocked == false && modAlreadyLocked == false) {
        this.displayMods.push(currentMod);

        // fall back to current mod
        this.canLock = false;
      }
    });



    let movedMods = this.displayMods.filter(displayMod => this.modDto.currentMods.find(newMod => newMod.id == displayMod.id) == null);

    this.modDisplay.highlightMods = movedMods;
  }

}
