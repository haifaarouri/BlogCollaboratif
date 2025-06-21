import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private API = 'http://localhost:8000/api/roles';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.API);
  }

  create(role: any) {
    return this.http.post(this.API + '/create', role);
  }

  update(id: string, role: any) {
    return this.http.put(`${this.API}/update/${id}`, role);
  }

  delete(id: string) {
    return this.http.delete(`${this.API}/delete/${id}`);
  }
}
