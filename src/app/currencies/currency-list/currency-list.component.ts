import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { CurrencyItem, CurrencyTableType } from './currency-list.interface';
import { CommonModule } from '@angular/common';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { Currencies } from './currency-list.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-currency-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule, FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './currency-list.component.html',
  styleUrl: './currency-list.component.css',
})
export class CurrencyListComponent implements OnInit, OnDestroy {
  @Output() 
    public onChosenTableType: EventEmitter<CurrencyTableType> = new EventEmitter<CurrencyTableType>(); 
  public currencyList$: Observable<Currencies>= of();
  public dataSource = new MatTableDataSource<CurrencyItem>([]);
  public displayedColumns: string[] = [];
  public tableTypesDefinition: CurrencyTableType[] = [
    CurrencyTableType.A,
    CurrencyTableType.B,
    CurrencyTableType.C,
  ];
  private _unsubscribeAll = new Subject<void>();
  private tableTypeDef: CurrencyTableType = CurrencyTableType.C;
  selected: CurrencyTableType = this.tableTypeDef;

  constructor(private currService: CurrencyService) {
  }

  ngOnInit(): void {
    this.initDataSourceObservable(this.tableTypeDef);
    this.fetchData();
  }

  updateTable(data: CurrencyTableType) {
    this.onChosenTableType.emit(data);
    this.selected = data;
    this.initDataSourceObservable(data);
    this.fetchData();
  }

  private initDataSourceObservable(tableType: CurrencyTableType) {
    this.currencyList$ = this.getCurrencyList(tableType)
    .pipe(
      map(res => res[0])
    );
  }

  private  getCurrencyList(tableTypeDefault: CurrencyTableType): Observable<Currencies[]> {
    return this.currService.getAll(tableTypeDefault);
  }

  private fetchData() {
    this.currencyList$.pipe(takeUntil(this._unsubscribeAll))
    .subscribe({
      next: (currList) => {
      if(typeof currList?.rates[0] !== 'undefined') {
        this.displayedColumns = Object.keys(currList?.rates[0]);
        this.dataSource.data = currList?.rates;
      } else {
        this.displayedColumns = [];
      }
    }, 
    error: (err) => console.log(err),
    complete: () => console.log('Zakończono pobieranie danych do tabeli')});
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
