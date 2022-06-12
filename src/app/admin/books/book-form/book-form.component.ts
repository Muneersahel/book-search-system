import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../categories/services/categories.service';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup;
    isEdit: boolean = false;
    isLoading: boolean = false;
    categoryId!: number;

    constructor(
        private categoriesS: CategoriesService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.bookForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
        });

        this.route.params.subscribe((params) => {
            this.categoryId = params['categoryId'];
            if (this.categoryId) {
                this.isEdit = true;
                this.categoriesS.getCategory(this.categoryId).subscribe({
                    next: (res) => {
                        this.bookForm.setValue({
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
                .updateCategory(this.categoryId, this.bookForm.value.name)
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router.navigate(['admin/categories']);
                    },
                    error: (err) => {
                        console.log(err);
                        this.isLoading = false;
                    },
                });
        } else {
            this.categoriesS
                .createCategory(this.bookForm.value.name)
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router.navigate(['admin/categories']);
                    },
                    error: (err) => {
                        console.log(err);
                        this.isLoading = false;
                    },
                });
        }
    }
}
