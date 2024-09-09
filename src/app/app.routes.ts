import { Routes } from '@angular/router';
import { CurrencyListComponent } from './currencies/currency-list/currency-list.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        component: CurrencyListComponent,
        children: [
            { path: 'currency', component: CurrencyListComponent },
            { path: 'calc', component: CurrencyListComponent },
            { path: '*', component: CurrencyListComponent},
        ]
    }
];
