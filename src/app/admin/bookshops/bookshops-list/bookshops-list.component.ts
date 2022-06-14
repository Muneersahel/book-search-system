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
    isLoading: boolean = false;

    constructor(private bookshopS: BookshopsService) {}

    ngOnInit(): void {
        this.getBookshops();
    }

    getBookshops() {
        this.isLoading = true;
        this.bookshopS.getBookshops().subscribe();
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
