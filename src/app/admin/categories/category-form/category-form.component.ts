import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../shared/services/categories.service';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
    categoryForm: FormGroup;
    isEdit: boolean = false;
    isLoading: boolean = false;
    categoryId!: number;

    constructor(
        private categoriesS: CategoriesService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categoryForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
        });

        this.route.params.subscribe((params) => {
            this.categoryId = params['categoryId'];
            if (this.categoryId) {
                this.isEdit = true;
                this.categoriesS.getCategory(this.categoryId).subscribe({
                    next: (res) => {
                        this.categoryForm.setValue({
                            name: res.name,
                        });
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.isLoading = true;
        if (this.isEdit) {
            if (!this.categoryId) {
                alert('Category ID is required');
                return;
            }
            this.categoriesS
                .updateCategory(this.categoryId, this.categoryForm.value.name)
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router.navigate(['admin/categories']).then(() => {
                            alert('Category updated successfully');
                        });
                    },
                    error: (err) => {
                        console.log(err);
                        this.isLoading = false;
                    },
                });
        } else {
            this.categoriesS
                .createCategory(this.categoryForm.value.name)
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router.navigate(['admin/categories']).then(() => {
                            alert('Category created successfully');
                        });
                    },
                    error: (err) => {
                        console.log(err);
                        this.isLoading = false;
                    },
                });
        }
    }
}
