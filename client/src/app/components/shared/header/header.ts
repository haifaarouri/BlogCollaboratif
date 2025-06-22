import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public auth: AuthService, private router: Router) {}

  canManageRoles(): boolean {
    const user = this.auth.getCurrentUser();
    return user?.role === 'Admin';
  }

  logout() {
    this.auth.logout().subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
