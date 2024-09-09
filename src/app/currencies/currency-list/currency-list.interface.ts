export interface Currencies {
    table: CurrencyTableType;
    no: string;
    effectiveDate: string;
    rates: CurrencyItem[];
}


export interface CurrencyItem {
    currency: string;
    code: string;
    mid: number;
}
export enum CurrencyTableType {
  A = 'A',
  B = 'B',
  C = 'C'
}
