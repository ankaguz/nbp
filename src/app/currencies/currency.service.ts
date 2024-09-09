import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currencies, CurrencyTableType } from './currency-list/currency-list.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {

  private readonly baseUrl = 'http://localhost:4200/api';
  private readonly baseTablesUrl =  `${this.baseUrl}/exchangerates/tables`;
  private readonly apiNBP = {
    readAllTableByType: (table: CurrencyTableType) => `${this.baseTablesUrl}/${table}/`,
    topCount: (table: CurrencyTableType, topCount: number) =>  `${this.baseTablesUrl}/${table}/last/${topCount}`,
    readAllTableFromToday: (table: CurrencyTableType) => `${this.baseTablesUrl}/${table}/today/`,
    readAllTableByDate: (table: CurrencyTableType, date: Date) =>  `${this.baseTablesUrl}/${table}/${date}`,
    readAllTableFromTo: (table: CurrencyTableType, startDate: Date, endDate: Date) =>  `${this.baseTablesUrl}/${table}/${startDate}/${endDate}`,
  };

  constructor(private http: HttpClient) { }

  public getAll(tableType: CurrencyTableType): Observable<Currencies[]> {
    return this.http.request<any>('GET', this.apiNBP.readAllTableByType(tableType));
  }
}
