import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders}from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  api = 'https://my-json-server.typicode.com/CoffeePaw/AyD1API';

  constructor(
    private http: HttpClient
    ) { }

    getTarjetas()
    {
      return this.http.get<any>(`${this.api}/Card`);
    }
}