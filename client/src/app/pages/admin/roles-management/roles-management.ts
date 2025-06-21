import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../services/roles.service';

@Component({
  standalone: true,
  selector: 'app-roles',
  imports: [CommonModule, FormsModule],
  templateUrl: './roles-management.html',
})
export class RolesComponent implements OnInit {
  roles: any[] = [];
  selectedRole: any = null;
  showEditModal: boolean = false;
  showAddModal: boolean = false;
  newRole: any = { name: '', permissions: '' };

  message: string = '';
  messageType: 'success' | 'error' = 'success';

  showMessage(msg: string, type: 'success' | 'error' = 'success') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => (this.message = ''), 3000);
  }

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles() {
    this.roleService.getAll().subscribe((data) => (this.roles = data));
  }

  openEditModal(role: any) {
    this.selectedRole = { ...role };
    this.showEditModal = true;
  }

  openAddModal() {
    this.newRole = { name: '', permissions: '' };
    this.showAddModal = true;
  }

  saveNew() {
    const roleToSend = {
      name: this.newRole.name,
      permissions: this.newRole.permissions
        .split(',')
        .map((p: any) => p.trim()),
    };

    this.roleService.create(roleToSend).subscribe({
      next: (res) => {
        this.showMessage('Role created successfully!', 'success');
      },
      error: (err) => {
        console.error('Error response:', err);
        this.showMessage(
          err.error?.message || 'Failed to create role.',
          'error'
        );
      },
    });
  }

  saveEdit() {
    this.selectedRole.permissions = this.selectedRole.permissions
      .split(',')
      .map((p: any) => p.trim());

    this.roleService
      .update(this.selectedRole._id, this.selectedRole)
      .subscribe({
        next: () => {
          this.fetchRoles();
          this.showEditModal = false;
          this.showMessage('Role updated successfully!', 'success');
        },
        error: (err) => {
          this.showMessage(
            err.error?.message || 'Failed to update role.',
            'error'
          );
        },
      });
  }

  deleteRole(id: string) {
    if (confirm('Are you sure?')) {
      this.roleService.delete(id).subscribe({
        next: () => {
          this.fetchRoles();
          this.showMessage('Role deleted successfully!', 'success');
        },
        error: (err) => {
          this.showMessage(
            err.error?.message || 'Failed to delete role.',
            'error'
          );
        },
      });
    }
  }
}
