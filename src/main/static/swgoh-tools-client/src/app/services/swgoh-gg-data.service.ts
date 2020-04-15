import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

import { CharacterData } from './../model/swgohgg/character-data';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SwgohGgDataService {

  playerUrl: string = '/api/player/';
  playersUrl: string = '/api/players/';
  guildUrl: string = '/api/guild/';
  charactersUrl: string = '/api/characters/';
  listPlayersMods: string = '/list/players/mods';
  gearUrl: string = '/api/gear';
  optimizationUrl: string = '/api/mods/optimization';

  constructor(private http: HttpClient) { }

  optimization(): Observable<any> {
    return this.http.get<any>(this.optimizationUrl, httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

  player(allyCode: string): Observable<any> {
    return this.http.get<any>(this.playerUrl + allyCode.replace(/-/g, ""), httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

  gear(): Observable<any> {
    return this.http.get<any>(this.gearUrl, httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

  playersMods(allyCode: number): Observable<any> {
    return this.http.get<any>(this.playersUrl + allyCode + "/mods", httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }


  playersListMods(allyCode: number[]): Observable<any> {
    return this.http.post<any>(this.listPlayersMods, allyCode)
      .pipe(
      map(res => {
        return res;
      })
      );
  }


  guild(guildCode: string): Observable<any> {
    return this.http.get<any>(this.guildUrl + guildCode.replace(/-/g, ""), httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

  characters(): Observable<any> {
    return this.http.get<any>(this.charactersUrl, httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

}
