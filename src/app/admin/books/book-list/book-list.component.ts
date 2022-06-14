import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
    books: Book[] = [];
    isLoading: boolean = false;
    imgBaseURL = environment.imageUrl;

    constructor(private bookS: BooksService, private router: Router) {}

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks() {
        this.isLoading = true;
        this.bookS.getBooks().subscribe();
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
}
