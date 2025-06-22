import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Article {
  _id?: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  user: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ArticleService {
  private API = 'http://localhost:8000/api/articles';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Article[]>(this.API);
  }

  create(formData: FormData) {
    return this.http.post<Article>(this.API + '/create', formData);
  }

  update(id: string, formData: FormData) {
    return this.http.put<Article>(`${this.API}/update/${id}`, formData);
  }

  delete(id: string) {
    return this.http.delete(`${this.API}/detete/${id}`);
  }
}
