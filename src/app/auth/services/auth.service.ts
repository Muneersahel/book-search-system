import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post<{ message: string; data: User; token: string }>(
            `${this.baseUrl}/login`,
            {
                email: username,
                password: password,
            }
        );
    }

    requestForm(name: string, email: string, password: string) {
        return this.http.post<{ message: string }>(`${this.baseUrl}/register`, {
            name: name,
            email: email,
            password: password,
        });
    }

    getAuthUser() {
        return this.http.get<User>(`${this.baseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        });
    }

    isAuthenticated() {
        return !!this.getToken();
    }

    isAdmin() {
        return this.isAuthenticated() && this.getUserObject()?.isAdmin;
    }

    saveToken(token: string) {
        localStorage.setItem('$token', token);
    }

    getToken() {
        return localStorage.getItem('$token');
    }

    saveUserObject(user: User) {
        localStorage.setItem('$user', JSON.stringify(user));
    }

    getUserObject() {
        const user = localStorage.getItem('$user');
        if (user) {
            return JSON.parse(user) as User;
        }
        return null;
    }

    logout() {
        return this.http.post<{ message: string }>(
            `${this.baseUrl}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );
    }
}
