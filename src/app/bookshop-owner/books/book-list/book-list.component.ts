import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { Category } from 'src/app/shared/interfaces/category.interface';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
    books: Category[] = [];
    isLoading: boolean = false;

    constructor(
        private categoriesS: CategoriesService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getBooks();
    }

    getBooks() {
        this.isLoading = true;
        this.categoriesS.getCategories().subscribe();
        this.categoriesS.categoriesObservable.subscribe({
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
        this.router.navigate(['admin/categories/add']);
    }

    editBook(category: any) {
        this.router.navigate(['admin/categories/', category.id, 'edit']);
    }

    deleteBook(category: any) {
        if (confirm('Are you sure you want to delete this category?')) {
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
