import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from '../../categories/services/categories.service';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
    categories: Category[] = [];
    books: any[] = [];
    isLoading: boolean = false;

    constructor(
        private categoriesS: CategoriesService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getCategories();
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

    addBook() {
        this.router.navigate(['admin/books/add']);
    }

    editBook(category: any) {
        this.router.navigate(['admin/categories/', category.id, 'edit']);
    }

    deleteBook(category: any) {
        if (confirm('Are you sure you want to delete this book?')) {
            this.categoriesS.deleteCategory(category.id).subscribe({
                next: (res) => {
                    alert('Category deleted successfully!');
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
