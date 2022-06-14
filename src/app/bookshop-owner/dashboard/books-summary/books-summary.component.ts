import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { BooksService } from 'src/app/shared/services/books.service';

@Component({
    selector: 'app-books-summary',
    templateUrl: './books-summary.component.html',
    styleUrls: ['./books-summary.component.scss'],
})
export class BooksSummaryComponent implements OnInit {
    @Input() books: Book[] = [];
    @Input() isLoading: boolean = false;

    constructor(private bookS: BooksService) {}

    ngOnInit(): void {}

    editBook(book: any) {}

    deleteBook(book: any) {}
}
