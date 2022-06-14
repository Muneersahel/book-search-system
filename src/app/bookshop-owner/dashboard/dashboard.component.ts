import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { Bookshop } from 'src/app/shared/interfaces/bookshop.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    books: Book[] = [];
    bookshops: Bookshop[] = [];
    isLoading: boolean = false;

    constructor(
        private bookS: BooksService,
        private bookshopS: BookshopsService
    ) {}

    ngOnInit(): void {
        this.getBooks();
        this.getAuthUserBooks();
    }

    getBooks() {
        this.isLoading = true;
        this.bookS.getUserBooks().subscribe();
        this.bookS.bookListObservable.subscribe({
            next: (res) => {
                this.books = res;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }

    getAuthUserBooks() {
        this.isLoading = true;
        this.bookshopS.getAuthUserBookshops().subscribe();
        this.bookshopS.bookshopListObservable.subscribe({
            next: (res) => {
                this.bookshops = res;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }
}
