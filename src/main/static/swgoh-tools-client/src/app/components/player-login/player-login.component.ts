import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

export class PlayerLoginDto {
  public playerId: string;
  public playerHotutils: string;
}

@Component({
  selector: 'app-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.scss']
})
export class PlayerLoginComponent implements OnInit, OnDestroy {

  public playerId: string = '738889527';
  public lockInput: boolean = false;
  public playerHotutils: string = 'd8461c19-9324-4c78-870f-6e10f22e20cd';


  protected unsubscribe$ = new Subject<void>();

  constructor(private dataStoreService: DataStoreService, public dialogRef: MatDialogRef<PlayerLoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dataStoreService.lockInput$.pipe(takeUntil(this.unsubscribe$)).subscribe(lockInput => {
      this.lockInput = lockInput;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formComplete() {
    return this.playerId != null;
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    let retVal: PlayerLoginDto = {
      playerId: this.playerId,
      playerHotutils: this.playerHotutils
    };
    this.dialogRef.close(retVal);
  }
}
