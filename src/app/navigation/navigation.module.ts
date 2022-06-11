import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/modules/material.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: NavigationComponent,
        children: [
            {
                path: 'admin',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('../admin/admin.module').then((m) => m.AdminModule),
            },
        ],
    },
];

@NgModule({
    declarations: [NavigationComponent],
    imports: [
        CommonModule,
        LayoutModule,
        MaterialModule,
        RouterModule.forChild(routes),
    ],
})
export class NavigationModule {}
