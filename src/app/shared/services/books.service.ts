import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book.interface';
import { UserInfo } from '../interfaces/userinfo.interface';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    bookList: Book[] = [];
    private bookListSubject = new Subject<Book[]>();
    bookListObservable = this.bookListSubject.asObservable();

    constructor(private http: HttpClient, private authS: AuthService) {}

    createBook(bookForm: Book) {
        const bookFormData = new FormData();
        bookFormData.append('name', bookForm.name);
        bookFormData.append('author', bookForm.author);
        bookFormData.append('items', bookForm.items.toString());
        bookFormData.append('price', bookForm.price.toString());
        bookFormData.append('book_shop_id', bookForm.book_shop_id.toString());
        bookFormData.append('category_id', bookForm.category_id.toString());
        bookFormData.append('cover', bookForm.cover);

        return this.http
            .post<{
                message: string;
                data: Book;
            }>(`${environment.apiUrl}/books`, bookFormData, {
                headers: {
                    Authorization: `Bearer ${this.authS.getToken()}`,
                },
            })
            .pipe(
                tap((res) => {
                    this.bookList.push(res.data);
                    this.bookListSubject.next(this.bookList);
                })
            );
    }

    getUserBooks() {
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
                    this.bookList = res[0].books;
                    this.bookListSubject.next(this.bookList);
                })
            );
    }

    getBooks() {
        return this.http
            .get<{
                message: string;
                data: Book[];
            }>(`${environment.apiUrl}/books`)
            .pipe(
                tap((res) => {
                    this.bookList = res.data;
                    this.bookListSubject.next(this.bookList);
                })
            );
    }

    getBook(id: number) {}

    updateBook(bookId: number, book: Book) {}

    deleteBook(id: number) {}
}
