import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { MaterialModule } from '../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookFormComponent } from './books/book-form/book-form.component';
import { BookshopsComponent } from './bookshops/bookshops.component';
import { BookshopFormComponent } from './bookshops/bookshops-form/bookshops-form.component';
import { BookshopListComponent } from './bookshops/bookshops-list/bookshops-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './dashboard/cards/cards.component';
import { BooksSummaryComponent } from './dashboard/books-summary/books-summary.component';
import { SharedModule } from '../shared/modules/shared.module';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'books',
        children: [
            { path: '', component: BooksComponent, pathMatch: 'full' },
            { path: 'add', component: BookFormComponent },
            { path: ':bookId/edit', component: BookFormComponent },
        ],
    },
    {
        path: 'bookshops',
        children: [
            { path: '', component: BookshopsComponent, pathMatch: 'full' },
            { path: 'add', component: BookshopFormComponent },
            { path: ':bookshopId/edit', component: BookshopFormComponent },
        ],
    },
];

@NgModule({
    declarations: [
        BooksComponent,
        BookListComponent,
        BookFormComponent,
        BookshopsComponent,
        BookshopFormComponent,
        BookshopListComponent,
        DashboardComponent,
        CardsComponent,
        BooksSummaryComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        ReactiveFormsModule,
        SharedModule
    ],
})
export class BookshopOwnerModule {}
