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
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {}

    onSubmit() {
        this.isLoading = true;
        const { username, password } = this.requestForm.value;
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
