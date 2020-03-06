import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of, forkJoin, OperatorFunction, interval } from 'rxjs';
import { delay, flatMap, mergeMap, merge, map, mapTo, concatMap } from 'rxjs/operators';
import { asObservable } from './asObservable';
import { SwgohGgDataService } from './swgoh-gg-data.service';
import { RootObject } from './../model/swgohgg/guild-data';
import { CharacterData } from './../model/swgohgg/character-data';
import { Mods } from './../model/swgohgg/mods-data';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  guildDataCache = {};
  playerDataCache = {};
  playerModDataCache = {};
  characterDataCache: CharacterData[] = null;

  constructor(private swgohGgDs: SwgohGgDataService) {
  }

  private lockInput: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public lockInput$: Observable<boolean> = asObservable(this.lockInput);
  setLockInput(lockInput: boolean): void {
    this.lockInput.next(lockInput);
  }

  private modelGuildData: BehaviorSubject<RootObject> = new BehaviorSubject<RootObject>(null);
  public modelGuildData$: Observable<RootObject> = asObservable(this.modelGuildData);
  setModelGuildData(guildData: any): void {
    this.modelGuildData.next(guildData);
  }

  public getCharacterData(): Observable<CharacterData[]> {

    let characterFetchData: BehaviorSubject<CharacterData[]> = new BehaviorSubject<CharacterData[]>(null);
    let characterFetchData$: Observable<CharacterData[]> = asObservable(characterFetchData);

    if (this.characterDataCache != undefined && this.characterDataCache != null) {

      (async () => {
        await delay(1);
        characterFetchData.next(this.characterDataCache);
        characterFetchData.complete();
      })();

    } else {
      this.swgohGgDs.characters().subscribe(characterData => {
        this.characterDataCache = characterData;
        characterFetchData.next(characterData);
        characterFetchData.complete();
      });
    }
    return characterFetchData$;
  }

  public getPlayerListModData(playerAllyCodes: number[]): Observable<any> {

    let retVal: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    let retVal$: Observable<any> = asObservable(retVal);

    let nonCachedAllyCodes = playerAllyCodes.filter(allyCode => this.playerModDataCache[allyCode] == null);

    if (nonCachedAllyCodes.length > 0) {
      console.log('data missing from cache, count:' + nonCachedAllyCodes.length);

      let subScriptions = nonCachedAllyCodes.map(allyCode => this.swgohGgDs.playersMods(allyCode));

      var chunk_size = 5;
      var batchSubscriptions = subScriptions.map(function (e, i) {
        return i % chunk_size === 0 ? subScriptions.slice(i, i + chunk_size) : null;
      }).filter(function (e) { return e; });

      console.log('broke mod gathering requesting in batches, count:' + batchSubscriptions.length);

      let gatherDataObservable: Observable<any> = null;
      batchSubscriptions.forEach(batch => {

        if (gatherDataObservable == null) {
          console.log('creating mod first batch');
          gatherDataObservable = forkJoin(batch);
        } else {
          console.log('creating additional mod batch');
          gatherDataObservable = gatherDataObservable.pipe(
            concatMap(modData => {
              console.log('processing returned mod batch data');
              // may not need to do this until the end, responses should be concatinated
              modData.forEach(modDto => {
                this.playerModDataCache[modDto.key] = modDto.value.body;
              });
              return forkJoin(batch);
            })
          );
        }
      });
      gatherDataObservable.subscribe(modData => {
        console.log('processing final mod batch data');
        modData.forEach(modDto => {
          this.playerModDataCache[modDto.key] = modDto.value.body;
        });
        let retValData = playerAllyCodes.map(allyCode => this.playerModDataCache[allyCode]);
        retVal.next(retValData);
        retVal.complete();
      });
    } else {


      let retValData = playerAllyCodes.map(allyCode => this.playerModDataCache[allyCode]);

      (async () => {
        await delay(1);
        retVal.next(retValData);
        retVal.complete();
      })();

    }
    return retVal$;
  }

  public getPlayerModData(playerCode: number): Observable<any> {

    let playerFetchData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    let playerFetchData$: Observable<any> = asObservable(playerFetchData);

    if (this.playerModDataCache[playerCode] != undefined && this.playerModDataCache[playerCode] != null) {

      let cachedPlayerData = this.playerModDataCache[playerCode];
      (async () => {
        await delay(1);
        playerFetchData.next(cachedPlayerData);
        playerFetchData.complete();
      })();
      return playerFetchData$;
    } else {
      this.swgohGgDs.playersMods(playerCode).subscribe(playerData => {
        this.playerModDataCache[playerCode] = playerData;
        console.log(playerCode);
        playerFetchData.next(playerData);
        playerFetchData.complete();
      });
    }
    return playerFetchData$;
  }


  // public getPlayersModData(playerAllyCodes: number[]): Observable<any> {

  //   let playerSubscriptions: Observable<any>[] = [];

  //   playerAllyCodes.forEach(allyCode => {
  //     playerSubscriptions.push(this.getPlayerModData(allyCode + ''));
  //   });

  //   return forkJoin(playerSubscriptions);
  // }

  public getPlayerData(playerCode: string): Observable<any> {

    let playerFetchData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    let playerFetchData$: Observable<any> = asObservable(playerFetchData);

    if (this.playerDataCache[playerCode] != undefined && this.playerDataCache[playerCode] != null) {

      (async () => {
        await delay(1);
        playerFetchData.next(this.playerDataCache[playerCode]);
        playerFetchData.complete();
      })();

    } else {
      this.swgohGgDs.player(playerCode).subscribe(playerData => {
        this.playerDataCache[playerCode] = playerData;
        playerFetchData.next(playerData);
        playerFetchData.complete();
      });
    }
    return playerFetchData$;
  }

  public getPlayersData(playerAllyCodes: number[]): Observable<any> {

    let playerSubscriptions: Observable<any>[] = [];

    playerAllyCodes.forEach(allyCode => {
      playerSubscriptions.push(this.getPlayerData(allyCode + ''));
    });

    return forkJoin(playerSubscriptions);
  }

  public getGuildData(guildCode: string): Observable<RootObject> {

    let guildFetchData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    let guildFetchData$: Observable<any> = asObservable(guildFetchData);

    if (this.guildDataCache[guildCode] != undefined && this.guildDataCache[guildCode] != null) {

      (async () => {
        await delay(1);
        guildFetchData.next(this.guildDataCache[guildCode]);
        guildFetchData.complete();
      })();
    } else {

      this.swgohGgDs.guild(guildCode).subscribe(guildData => {
        this.guildDataCache[guildCode] = guildData;
        guildFetchData.next(guildData);
        guildFetchData.complete();
      });
    }
    return guildFetchData$;
  }

}
