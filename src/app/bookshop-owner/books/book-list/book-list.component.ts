import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
    books: Book[] = [];
    isLoading: boolean = false;

    constructor(private bookS: BooksService, private router: Router) {}

    ngOnInit(): void {
        this.getBooks();
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

    addBook() {
        this.router.navigate(['bookshop-owner/books/add']);
    }

    editBook(book: Book) {
        this.router.navigate(['bookshop-owner/books/', book.id, 'edit']);
    }

    deleteBook(book: Book) {
        if (confirm('Are you sure you want to delete this book?')) {
            // this.bookS.deleteBook(book.id).subscribe({
            //     next: (res) => {
            //         alert('Book deleted successfully!');
            //     },
            //     error: (err) => {
            //         console.log(err);
            //     },
            // });
        }
    }
}
