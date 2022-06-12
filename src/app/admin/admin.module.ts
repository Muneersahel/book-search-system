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
import { UsersListComponent } from './users/users-list/users-list.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'categories',
        children: [
            { path: '', component: CategoriesComponent },
            { path: 'add', component: CategoryFormComponent },
            { path: ':categoryId/edit', component: CategoryFormComponent },
        ],
    },
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
        CategoryListComponent,
        CategoryFormComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, ReactiveFormsModule],
})
export class AdminModule {}
