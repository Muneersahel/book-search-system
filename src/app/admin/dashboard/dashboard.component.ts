import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { Bookshop } from 'src/app/shared/interfaces/bookshop.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { UsersService } from '../users/services/users.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    books: Book[] = [];
    bookshops: Bookshop[] = [];
    categories: Category[] = [];
    users: User[] = [];
    isLoading: boolean = false;

    constructor(
        private bookS: BooksService,
        private bookshopS: BookshopsService,
        private categoriesS: CategoriesService,
        private userS: UsersService
    ) {}

    ngOnInit(): void {
        this.getBooks();
        this.getBookshops();
        this.getCategories();
        this.getUsers();
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

    getCategories() {
        this.isLoading = true;
        this.categoriesS.getCategories().subscribe();
        this.categoriesS.categoriesObservable.subscribe({
            next: (res) => {
                this.categories = res;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }

    getUsers() {
        this.isLoading = true;
        this.userS.getUsers().subscribe();
        this.userS.usersObservable.subscribe({
            next: (res) => {
                this.users = res;
                this.isLoading = false;
            },
            error: (err) => {
                console.log(err);
                this.isLoading = false;
            },
        });
    }
}
