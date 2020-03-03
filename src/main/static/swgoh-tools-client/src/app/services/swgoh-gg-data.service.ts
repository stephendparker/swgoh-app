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

  constructor(private http: HttpClient) { }

  player(allyCode: string): Observable<any> {
    return this.http.get<any>(this.playerUrl + allyCode.replace(/-/g, ""), httpOptions)
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  playersMods(allyCode: string): Observable<any> {
    return this.http.get<any>(this.playersUrl + allyCode.replace(/-/g, "") + "/mods", httpOptions)
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
