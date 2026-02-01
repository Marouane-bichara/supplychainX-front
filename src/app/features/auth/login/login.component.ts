import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private authService = inject(AuthService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = signal(false);
  error = signal('');

  ngOnInit() {
    console.log('LoginComponent initialized');
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    const { email, password } = this.form.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.loading.set(false);
        
        const user = this.auth.currentUser();
        console.log('Logged in user:', user);
        
        if (user && user.roles) {
          if (user.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/dashboard']);     
          } else if (user.roles.includes('APPROVISIONNEMENT')) {
            this.router.navigate(['/procurement']);
          } else if (user.roles.includes('PRODUCTION')) {
            this.router.navigate(['/production']);
          } else if (user.roles.includes('LIVRAISON')) {
            this.router.navigate(['/delivery']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || 'Email ou mot de passe incorrect');
        console.error('Login error:', err);
      }
    });
  }
}