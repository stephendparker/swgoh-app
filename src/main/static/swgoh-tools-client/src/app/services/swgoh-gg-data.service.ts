import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  player(allyCode: string): Observable<any> {
    return this.http.get<any>(this.playerUrl + allyCode.replace(/-/g, ""), httpOptions)
      .pipe(
      map(res => {
        return res;
      })
      );
  }

}
