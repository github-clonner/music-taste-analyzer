import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MOCKSONGS } from './mock-songs';

@Injectable()
export class SongService {

  result:any;

  constructor(private http: Http) { }

  getSongs() {
    // return this.http.get("/api/songs")
    //   .map(result => this.result = result.json().data);

    return of(MOCKSONGS);
  }

}