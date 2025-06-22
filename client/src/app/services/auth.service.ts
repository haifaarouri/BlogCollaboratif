import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API}/login`, data, {
      withCredentials: true,
    });
  }

  register(data: any) {
    return this.http.post(`${this.API}/register`, data);
  }

  logout() {
    return this.http.post(`${this.API}/logout`, {}, { withCredentials: true });
  }

  refreshToken() {
    return this.http.post<{ token: string }>(
      `${this.API}/refresh`,
      {},
      { withCredentials: true }
    );
  }

  getCurrentUser() {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return {
      id: decoded._id,
      role: decoded.role,
    };
  }
}
