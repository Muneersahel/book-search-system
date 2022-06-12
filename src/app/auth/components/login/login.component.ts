import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading: boolean = false;

    constructor(private authS: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.isLoading = true;
        const { username, password } = this.loginForm.value;
        this.authS.login(username, password).subscribe({
            next: (res) => {
                this.isLoading = false;
                if (
                    typeof res.message == 'string' &&
                    res.message === 'Wrong Email/Password'
                ) {
                    alert('Wrong Email/Password');
                    return;
                }
                if (!res.data) {
                    alert('Your account is not approved yet, please wait');
                    return;
                }
                if (!res.data.isActive) {
                    alert('Your account is not approved yet');
                    return;
                }
                this.authS.saveToken(res.token);
                this.authS.saveUserObject(res.data);
                if (res.data.isAdmin) {
                    this.router.navigate(['admin/dashboard']);
                } else {
                    this.router.navigate(['/bookshop-owner/dashboard']);
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            },
        });
    }
}
