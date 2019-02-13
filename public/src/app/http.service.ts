import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }

  searchStats(info) {
    return this._http.post('/api/info', info);
  }

  getStats() {
    return this._http.get('/api/stats');
  }

  getNews() {
    return this._http.get('/api/news');
  }

}
