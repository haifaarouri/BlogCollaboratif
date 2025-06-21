import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private auth: AuthService, private router: Router) {}

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
