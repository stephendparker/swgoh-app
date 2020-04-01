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
export class HotutilsDataService {

  playerModsUrl: string = '/api/hotutils/player/';

  constructor(private http: HttpClient) { }

  playerMods(sessionId: string): Observable<any> {
    return this.http.get<any>(this.playerModsUrl + sessionId + '/mods', httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }
}
