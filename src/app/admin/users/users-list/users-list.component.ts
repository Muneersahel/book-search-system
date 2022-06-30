import { Component, Input, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    users: User[] = [];
    private destroy$ = new Subject<void>();
    isLoading: boolean = false;

    constructor(private userS: UsersService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers() {
        this.isLoading = true;
        this.userS.getUsers().subscribe();
        this.userS.usersObservable.pipe(takeUntil(this.destroy$)).subscribe({
            next: (users) => {
                this.users = users;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }

    approveUser(user: User) {
        if (confirm('Are you sure you want to approve this user?')) {
            this.userS
                .approveUser({
                    userId: user.id,
                    approved: true,
                })
                .subscribe({
                    next: (res) => {
                        console.log(res);
                        alert('User approved successfully');
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
        }
    }

    declineUser(user: User) {
        if (confirm('Are you sure you want to disaprove this user?')) {
            this.userS
                .approveUser({
                    userId: user.id,
                    approved: false,
                })
                .subscribe({
                    next: (res) => {
                        console.log(res);
                        alert('User disaproved successfully');
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
        }
    }
}
