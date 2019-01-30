import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { City } from './city';
import { Observable } from 'rxjs';

@Injectable()
export class CityService {

    private _getURL = 'http://localhost:36830/api/cities/';
    private _cities: Observable<City []>;

    constructor(private http: HttpClient) { }

    public get cities() {
        if (!this._cities) {
            this._cities = this.getCities().pipe(
                shareReplay(1)
            );
        }

        return this._cities;
    }

    getCities(): Observable<City[]> {
        return this.http.get<City[]>(this._getURL).pipe(map(response => response));
    }

    commitCities(transactions) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
          };
        this.http.post(this._getURL, transactions, httpOptions)
            .subscribe(res => {
                console.log('success');
            });
    }
}
