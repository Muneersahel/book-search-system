import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { Bookshop } from 'src/app/shared/interfaces/bookshop.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';

@Component({
    selector: 'app-bookshops-list',
    templateUrl: './bookshops-list.component.html',
    styleUrls: ['./bookshops-list.component.scss'],
})
export class BookshopListComponent implements OnInit {
    bookshops: Bookshop[] = [];
    isLoading: boolean = false;

    constructor(private bookshopS: BookshopsService, private router: Router) {}

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
