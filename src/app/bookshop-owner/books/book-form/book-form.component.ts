import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { Bookshop } from 'src/app/shared/interfaces/bookshop.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { BooksService } from 'src/app/shared/services/books.service';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
    bookForm: FormGroup;
    isEdit: boolean = false;
    isLoading: boolean = false;
    categories: Category[] = [];
    userBookshops: Bookshop[] = [];
    bookId!: number;
    imgBaseURL = environment.imageUrl;
    book!: Book;
    selectedFile!: File;

    constructor(
        private categoriesS: CategoriesService,
        private bookshopS: BookshopsService,
        private bookS: BooksService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.bookForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            author: new FormControl(null, [Validators.required]),
            items: new FormControl(null, [Validators.required]),
            price: new FormControl(null, [Validators.required]),
            book_shop_id: new FormControl(null, [Validators.required]),
            category_id: new FormControl(null, [Validators.required]),
        });

        this.route.params.subscribe((params) => {
            this.bookId = params['bookId'];
            if (this.bookId) {
                this.isEdit = true;
                this.bookS.getBook(this.bookId).subscribe({
                    next: (res) => {
                        this.book = res.data;
                        this.bookForm.setValue({
                            name: res.data.name,
                            author: res.data.author,
                            items: res.data.items,
                            price: res.data.price,
                            category_id: res.data.category.id,
                            book_shop_id: res.data.book_shop.id,
                        });
                    },
                    error: (err) => {
                        console.log(err);
                    },
                });
            }
        });
    }

    ngOnInit(): void {
        this.getCategories();
        this.getUserBookshops();
    }

    getCategories() {
        this.categoriesS.getCategories().subscribe({
            next: (res) => {
                this.categories = res.data;
            },
        });
    }

    getUserBookshops() {
        this.bookshopS.getAuthUserBookshops().subscribe();
        this.bookshopS.bookshopListObservable.subscribe({
            next: (res) => {
                this.userBookshops = res;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    onFileChange(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        this.isLoading = true;

        if (this.isEdit) {
            if (!this.bookId) {
                alert('Category ID is required');
                return;
            }
            let bookForm = {
                id: this.bookId,
                ...this.bookForm.value,
            };
            if (this.selectedFile) {
                bookForm = {
                    ...bookForm,
                    cover: this.selectedFile,
                };
            }

            this.bookS.updateBook(bookForm).subscribe({
                next: (res) => {
                    console.log(res);

                    this.isLoading = false;
                    this.router.navigate(['bookshop-owner/books']);
                },
                error: (err) => {
                    console.log(err);
                    this.isLoading = false;
                },
            });
        } else {
            this.bookS
                .createBook({
                    ...this.bookForm.value,
                    cover: this.selectedFile,
                })
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router
                            .navigate(['bookshop-owner/books'])
                            .then(() => {
                                alert('Book created successfully');
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
