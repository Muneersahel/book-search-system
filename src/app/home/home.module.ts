import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MaterialModule } from '../shared/modules/material.module';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { BooksResultComponent } from './components/books-result/books-result.component';
import { SharedModule } from '../shared/modules/shared.module';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', component: WelcomeComponent },
            { path: 'search', component: BooksResultComponent },
        ],
    },
];

@NgModule({
    declarations: [WelcomeComponent, HomeComponent, BooksResultComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MaterialModule,
        FormsModule,
        SharedModule,
    ],
})
export class HomeModule {}
