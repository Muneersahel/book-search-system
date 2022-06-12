import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-books-summary',
    templateUrl: './books-summary.component.html',
    styleUrls: ['./books-summary.component.scss'],
})
export class BooksSummaryComponent implements OnInit {
    books = [
        {
            cover: 'https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-5-CRC.png',
            name: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            category: 'Fantasy',
            bookShop: 'Amazon',
            quantity: '10',
            price: '$19.99',
        },
        {
            cover: 'https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-5-CRC.png',
            name: 'The Lord of the Rings',
            author: 'J.R.R. Tolkien',
            category: 'Fantasy',
            bookShop: 'Amazon',
            quantity: '10',
            price: '$19.99',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    editBook(book: any) {}

    deleteBook(book: any) {}
}
