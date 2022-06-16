import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/interfaces/user.interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    isLoading: boolean = false;
    authUser!: User;
    isAuthenticated: boolean = false;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result) => result.matches),
            shareReplay()
        );
    constructor(
        private breakpointObserver: BreakpointObserver,
        private authS: AuthService
    ) {}

    ngOnInit(): void {
        this.isAuthenticated = this.authS.isAuthenticated();
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
}
