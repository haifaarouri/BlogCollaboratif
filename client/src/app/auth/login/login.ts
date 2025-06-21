import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.errorMessage = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('role', res.user.role.name);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errorMessage = err.error.message || 'Login failed.';
      },
    });
  }
}
