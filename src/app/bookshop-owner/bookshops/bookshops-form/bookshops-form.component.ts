import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookshopsService } from 'src/app/shared/services/bookshops.service';

@Component({
    selector: 'app-bookshops-form',
    templateUrl: './bookshops-form.component.html',
    styleUrls: ['./bookshops-form.component.scss'],
})
export class BookshopFormComponent implements OnInit {
    bookshopForm: FormGroup;
    isEdit: boolean = false;
    isLoading: boolean = false;
    bookshopId!: number;

    constructor(
        private bookshopS: BookshopsService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.bookshopForm = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required]),
            phone: new FormControl(null, [Validators.required]),
        });

        this.route.params.subscribe((params) => {
            this.bookshopId = params['bookshopId'];
            if (this.bookshopId) {
                this.isEdit = true;
                this.bookshopS.getBookshop(this.bookshopId).subscribe({
                    next: (res) => {
                        this.bookshopForm.setValue({
                            name: res.name,
                            location: res.location,
                            phone: res.phone,
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
            if (!this.bookshopId) {
                alert('Category ID is required');
                return;
            }
            this.bookshopS
                .updateBookshop(this.bookshopId, this.bookshopForm.value)
                .subscribe({
                    next: (res) => {
                        this.isLoading = false;
                        this.router
                            .navigate(['bookshop-owner/bookshops'])
                            .then(() => {
                                alert('Bookshop updated successfully');
                            });
                    },
                    error: (err) => {
                        console.log(err);
                        this.isLoading = false;
                    },
                });
        } else {
            this.bookshopS.createBookshop(this.bookshopForm.value).subscribe({
                next: (res) => {
                    this.isLoading = false;
                    console.log(res);

                    this.router
                        .navigate(['bookshop-owner/bookshops'])
                        .then(() => {
                            alert('Bookshop created successfully');
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
