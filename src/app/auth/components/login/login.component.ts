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
                if (res.message === 'Wrong Email/Password') {
                    alert('Wrong Email/Password');
                    return;
                }
                this.authS.saveToken(res.token);
                this.authS.saveUserObject(res.data);
                this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
                this.isLoading = false;
                console.log(err);
            },
        });
    }
}
