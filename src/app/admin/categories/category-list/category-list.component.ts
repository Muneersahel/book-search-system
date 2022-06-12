import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from '../services/categories.service';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
    categories: Category[] = [];
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

    addCategory() {
        this.router.navigate(['admin/categories/add']);
    }

    editCategory(category: any) {
        this.router.navigate(['admin/categories/', category.id, 'edit']);
    }

    deleteCategory(category: any) {
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
