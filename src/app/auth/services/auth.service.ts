import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
    isActive: boolean;
    email_verified_at: string;
    createdAt: string;
    updatedAt: string;
}

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

    requestForm(username: string, password: string) {
        return this.http
            .post<{ message: string }>(`${this.baseUrl}/register`, {
                email: username,
                password: password,
            })
            .pipe();
    }

    getAuthUser() {
        return this.http.get<User>(`${this.baseUrl}/user`);
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
