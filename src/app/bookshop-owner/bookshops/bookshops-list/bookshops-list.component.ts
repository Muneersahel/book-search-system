import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { Bookshop } from 'src/app/shared/interfaces/bookshop.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';

@Component({
    selector: 'app-bookshops-list',
    templateUrl: './bookshops-list.component.html',
    styleUrls: ['./bookshops-list.component.scss'],
})
export class BookshopListComponent implements OnInit {
    bookshops!: Bookshop[];
    books!: Book[];
    isLoading: boolean = false;

    constructor(
        private bookshopS: BookshopsService,
        private router: Router,
        private bookS: BooksService
    ) {}

    ngOnInit(): void {
        this.getBookshops();
        this.getBooks();
    }

    getBookshops() {
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

    addBookshop() {
        this.router.navigate(['bookshop-owner/bookshops/add']);
    }

    editBook(bookshop: Bookshop) {
        this.router.navigate(['bookshop-owner/bookshops', bookshop.id, 'edit']);
    }

    deleteBookshop(bookshop: Bookshop) {
        if (confirm('Are you sure you want to delete this category?')) {
            this.bookshopS.deleteBookshop(bookshop.id).subscribe({
                next: (res) => {
                    alert('Bookshop deleted successfully!');
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
