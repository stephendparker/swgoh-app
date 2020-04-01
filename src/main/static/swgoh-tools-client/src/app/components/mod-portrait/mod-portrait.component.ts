import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy, SecurityContext } from '@angular/core';
import { Mods, ModsEntity } from './../../model/swgohgg/mods-data';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';

import { SwgohGgCalc } from './../../calcs/swgoh-gg-calc';
import { takeUntil } from 'rxjs/operators';
import { DisplayModeService, DisplayModeSettings } from './../../services/display-mode.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mod-portrait',
  templateUrl: './mod-portrait.component.html',
  styleUrls: ['./mod-portrait.component.scss']
})
export class ModPortraitComponent implements OnInit, OnDestroy {

  @Input() mod: ModsEntity;

  protected unsubscribe$ = new Subject<void>();

  @Input() showStatsSmall = false;

  displayModeSettings: DisplayModeSettings = new DisplayModeSettings();

  @Input() locked: boolean = false;

  imageUrl: SafeUrl;

  constructor(private dataStoreService: DataStoreService, private sanitizer: DomSanitizer, private displayModeService: DisplayModeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.displayModeService.displayModeSettings$.pipe(takeUntil(this.unsubscribe$)).subscribe(displayModeSettings => {
      if (displayModeSettings != null)
        this.displayModeSettings = displayModeSettings;
    });
    if (this.mod != null)
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(`${'https://swgoh.gg/game-asset/u/' + this.mod.character}`);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setLocked(locked: boolean) {
    this.locked = locked;
    this.cdr.detectChanges();
  }

  getMaxLevelClass(): string {
    if (this.mod != null && this.mod.level == 15) {
      return 'statmod--max-level';
    } else {
      return '';
    }

  }
  getPortraitStyleUrl(): SafeStyle {
    // 'url(' + getPortraitUrl() + ');'
    let retVal = this.sanitizer.sanitize(SecurityContext.STYLE, `url(${'https://swgoh.gg/game-asset/u/' + this.mod.character})`);
    return retVal;
  }

  label() {
    if (this.mod != null)
      return SwgohGgCalc.getSwgohSetLabel(this.mod.set);

    else
      return "";
  }

}
