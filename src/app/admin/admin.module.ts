import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { BookshopsComponent } from './bookshops/bookshops.component';
import { BooksComponent } from './books/books.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material.module';
import { CardsComponent } from './dashboard/cards/cards.component';
import { BooksSummaryComponent } from './dashboard/books-summary/books-summary.component';
import { UsersListComponent } from './users/components/users-list/users-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'users', component: UsersComponent },
    { path: 'bookshops', component: BookshopsComponent },
    { path: 'books', component: BooksComponent },
];

@NgModule({
    declarations: [
        CategoriesComponent,
        DashboardComponent,
        UsersComponent,
        BookshopsComponent,
        BooksComponent,
        CardsComponent,
        BooksSummaryComponent,
        UsersListComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule],
})
export class AdminModule {}
