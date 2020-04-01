import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';
import { DataStoreService } from './../../services/data-store.service';
import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

export class PlayerLoginDto {
  public playerId: string;
  public modelPlayers: number[];
  public playerHotutils: string;
}

@Component({
  selector: 'app-player-login',
  templateUrl: './player-login.component.html',
  styleUrls: ['./player-login.component.scss']
})
export class PlayerLoginComponent implements OnInit, OnDestroy {

  public NONE_SOURCE = "NONE";
  public GUILD_SOURCE = "GUILD";
  public PLAYER_SOURCE = "PLAYER";

  public playerId: string = '738889527';
  public modelPlayerId: string = '';
  public lockInput: boolean = false;
  public playerHotutils: string = 'd8461c19-9324-4c78-870f-6e10f22e20cd';

  modelSource: string = this.NONE_SOURCE;

  guildPlayers: number[] = null;

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

  selectGuildPlayers(players: number[]) {
    if (players != null) {
      this.guildPlayers = players;
    }
  }

  formComplete() {
    return this.playerId != null && (this.modelSource == this.NONE_SOURCE ||
      (this.modelSource == this.PLAYER_SOURCE && this.modelPlayerId != null) ||
      (this.modelSource == this.GUILD_SOURCE && this.guildPlayers != null));
  }

  onClose(): void {
    this.dialogRef.close(null);
  }

  onOk(): void {
    let modelIds: number[] = null;

    if (this.modelSource == this.PLAYER_SOURCE) {
      modelIds = [+this.modelPlayerId];
    } else if (this.modelSource == this.GUILD_SOURCE) {
      modelIds = this.guildPlayers;
    }

    let retVal: PlayerLoginDto = {
      playerId: this.playerId,
      modelPlayers: modelIds,
      playerHotutils: this.playerHotutils
    };
    this.dialogRef.close(retVal);
  }
}
