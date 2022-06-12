import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    users: User[] = [];
    private usersSubject = new Subject<User[]>();
    usersObservable = this.usersSubject.asObservable();

    constructor(private http: HttpClient, private authS: AuthService) {}

    getUsers() {
        return this.http
            .get(`${environment.apiUrl}/userlist`, {
                headers: {
                    Authorization: `Bearer ${this.authS.getToken()}`,
                },
            })
            .pipe(
                map((res: any) => {
                    this.users = Object.values(res.data);
                    this.usersSubject.next(this.users);
                    return this.users;
                })
            );
    }

    approveUser(userId: number) {
        return this.http
            .put(
                `${environment.apiUrl}/approve/${userId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap(() => {
                    const user = this.users.find((user) => user.id === userId);
                    if (user) {
                        user.isActive = true;
                    }
                    this.usersSubject.next(this.users);
                })
            );
    }
}
