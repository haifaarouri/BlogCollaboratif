import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  currentUser: any;
  newArticle: any = { title: '', content: '', tags: '', image: null };
  editArticle: any = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  showCreateModal = false;

  constructor(
    private articleService: ArticleService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser();
    this.getAllArticles();
  }

  getAllArticles() {
    this.articleService.getAll().subscribe({
      next: (res: any) => (this.articles = res),
      error: () => this.showMessage('Failed to load articles', 'error'),
    });
  }

  handleFile(event: any) {
    this.newArticle.image = event.target.files[0];
  }

  createArticle() {
    const formData = new FormData();
    formData.append('title', this.newArticle.title);
    formData.append('content', this.newArticle.content);
    formData.append('tags', this.newArticle.tags);
    if (this.newArticle.image) {
      formData.append('image', this.newArticle.image);
    }

    this.articleService.create(formData).subscribe({
      next: () => {
        this.getAllArticles();
        this.showMessage('Article created!', 'success');
        this.newArticle = { title: '', content: '', tags: '', image: null };
        this.showCreateModal = false;
      },
      error: () => this.showMessage('Failed to create article.', 'error'),
    });
  }

  canEdit(article: any): boolean {
    return (
      this.currentUser?.role === 'Admin' ||
      this.currentUser?.role === 'Editeur' ||
      (this.currentUser?.role === 'Redacteur' &&
        article.user?._id === this.currentUser.id)
    );
  }

  canDelete(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  openEdit(article: any) {
    this.editArticle = { ...article, tags: article.tags?.join(', ') };
  }

  handleEditFile(event: any) {
    this.editArticle.image = event.target.files[0];
  }

  saveEdit() {
    const formData = new FormData();
    formData.append('title', this.editArticle.title);
    formData.append('content', this.editArticle.content);
    formData.append('tags', this.editArticle.tags);
    if (this.editArticle.image) {
      formData.append('image', this.editArticle.image);
    }

    this.articleService.update(this.editArticle._id, formData).subscribe({
      next: () => {
        this.getAllArticles();
        this.editArticle = null;
        this.showMessage('Article updated!', 'success');
      },
      error: () => this.showMessage('Update failed', 'error'),
    });
  }

  delete(articleId: string) {
    if (confirm('Are you sure?') && this.canDelete()) {
      this.articleService.delete(articleId).subscribe({
        next: () => {
          this.getAllArticles();
          this.showMessage('Article deleted', 'success');
        },
        error: () => this.showMessage('Delete failed', 'error'),
      });
    }
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 3000);
  }
}
