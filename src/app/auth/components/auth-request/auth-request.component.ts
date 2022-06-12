import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-auth-request',
    templateUrl: './auth-request.component.html',
    styleUrls: ['./auth-request.component.scss'],
})
export class AuthRequestComponent implements OnInit {
    requestForm: FormGroup;
    isLoading: boolean = false;

    constructor(private authS: AuthService, private router: Router) {
        this.requestForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.isLoading = true;
        const { name, email, password } = this.requestForm.value;
        this.authS.requestForm(name, email, password).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (res.message === 'Wrong Email/Password') {
                    alert('Wrong Email/Password');
                    return;
                }
                alert('Your request has been sent, please wait for approval');
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            },
        });
    }
}
