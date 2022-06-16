import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-books-result',
    templateUrl: './books-result.component.html',
    styleUrls: ['./books-result.component.scss'],
})
export class BooksResultComponent implements OnInit {
    books: Book[] = [];
    booksList: Book[] = [];
    searchQuery: string = '';
    imgBaseURL = environment.imageUrl;
    isLoading: boolean = false;

    constructor(private route: ActivatedRoute, private bookS: BooksService) {
        this.route.queryParams.subscribe((params) => {
            this.searchQuery = params['q'];
        });
    }

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks() {
        this.isLoading = true;
        this.bookS.getBooks().subscribe();
        this.bookS.bookListObservable.subscribe({
            next: (books) => {
                this.booksList = books;
                this.books = this.booksList.filter((book) => {
                    return (
                        book.name
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase()) ||
                        book.author
                            .toLowerCase()
                            .includes(this.searchQuery.toLowerCase())
                    );
                });
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }
}
