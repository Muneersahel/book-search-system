import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {
    adminNavigationLinks,
    bookshopOwnerNavigationLinks,
    NavigationLink,
} from './navigation.link';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/interfaces/user.interface';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
    navigationLinks: NavigationLink[];
    isLoading: boolean = false;
    authUser!: User;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );

    constructor(
        private breakpointObserver: BreakpointObserver,
        private authS: AuthService,
        private router: Router
    ) {
        this.navigationLinks = this.authS.isAdmin()
            ? adminNavigationLinks
            : bookshopOwnerNavigationLinks;

        this.authS.getAuthUser().subscribe((user) => {
            this.authUser = user;
        });
    }

    closeDrawer(drawer: { close: () => void }) {
        this.breakpointObserver
            .observe(Breakpoints.Handset)
            .subscribe((result) => {
                if (result.matches) {
                    drawer.close();
                }
            });
    }

    logout() {
        this.isLoading = true;
        this.authS.logout().subscribe({
            next: () => {
                this.isLoading = false;
                this.router.navigate(['/login']).then(() => {
                    localStorage.removeItem('$token');
                    localStorage.removeItem('$user');
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
