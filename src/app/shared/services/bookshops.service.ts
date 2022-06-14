import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Bookshop } from '../interfaces/bookshop.interface';
import { UserInfo } from '../interfaces/userinfo.interface';

@Injectable({
    providedIn: 'root',
})
export class BookshopsService {
    bookshopList: Bookshop[] = [];
    private bookshopListSubject = new Subject<Bookshop[]>();
    bookshopListObservable = this.bookshopListSubject.asObservable();

    constructor(private http: HttpClient, private authS: AuthService) {}

    createBookshop(bookshopForm: Bookshop) {
        return this.http
            .post<{
                message: string;
                bookshop: Bookshop;
            }>(
                `${environment.apiUrl}/bookshops`,
                {
                    name: bookshopForm.name,
                    location: bookshopForm.location,
                    phone: bookshopForm.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    this.bookshopList.push(res.bookshop);
                    console.log(res);

                    this.bookshopListSubject.next([...this.bookshopList]);
                    return res.bookshop;
                })
            );
    }

    updateBookshop(id: number, bookshopForm: Bookshop) {
        return this.http
            .put<{
                message: string;
                data: Bookshop;
            }>(
                `${environment.apiUrl}/bookshops/${id}`,
                {
                    name: bookshopForm.name,
                    location: bookshopForm.location,
                    phone: bookshopForm.phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    const bookshop = this.bookshopList.find(
                        (bookshop) => bookshop.id === res.data.id
                    );
                    if (bookshop) {
                        bookshop.name = res.data.name;
                        bookshop.location = res.data.location;
                        bookshop.phone = res.data.phone;
                    }

                    this.bookshopListSubject.next([...this.bookshopList]);
                })
            );
    }

    getBookshops() {
        return this.http
            .get<{
                message: string;
                data: Bookshop[];
            }>(`${environment.apiUrl}/bookshops`)
            .pipe(
                tap((res) => {
                    this.bookshopList = res.data;
                    this.bookshopListSubject.next([...this.bookshopList]);
                })
            );
    }

    getAuthUserBookshops() {
        return this.http
            .get<[UserInfo]>(
                `${environment.apiUrl}/userinfo/${
                    this.authS.getUserObject()?.id
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${this.authS.getToken()}`,
                    },
                }
            )
            .pipe(
                tap((res) => {
                    this.bookshopList = res[0].book_shops;
                    this.bookshopListSubject.next(this.bookshopList);
                })
            );
    }

    getBookshop(id: number) {
        return this.http
            .get<{
                message: string;
                data: Bookshop;
            }>(`${environment.apiUrl}/bookshops/${id}`)
            .pipe(
                map((res) => {
                    return res.data;
                })
            );
    }

    deleteBookshop(id: number) {
        return this.http
            .delete(`${environment.apiUrl}/bookshops/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.authS.getToken()}`,
                },
            })
            .pipe(
                tap((res) => {
                    const bookshop = this.bookshopList.find(
                        (bookshop) => bookshop.id === id
                    );
                    if (bookshop) {
                        this.bookshopList.splice(
                            this.bookshopList.indexOf(bookshop),
                            1
                        );

                        this.bookshopListSubject.next([...this.bookshopList]);
                    }
                })
            );
    }
}
