import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRequestComponent } from './components/auth-request/auth-request.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'request', component: AuthRequestComponent },
];

@NgModule({
    declarations: [LoginComponent, AuthRequestComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MaterialModule,
    ],
})
export class AuthModule {}
