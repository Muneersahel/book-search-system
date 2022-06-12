import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../shared/modules/material.module';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AdminGuard } from '../shared/guards/admin.guard';
import { NotAdminGuard } from '../shared/guards/not-admin.guard';

const routes: Routes = [
    {
        path: '',
        component: NavigationComponent,
        children: [
            {
                path: 'admin',
                canActivate: [AdminGuard],
                loadChildren: () =>
                    import('../admin/admin.module').then((m) => m.AdminModule),
            },
            {
                path: 'bookshop-owner',
                canActivate: [NotAdminGuard],
                loadChildren: () =>
                    import('../bookshop-owner/bookshop-owner.module').then(
                        (m) => m.BookshopOwnerModule
                    ),
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
