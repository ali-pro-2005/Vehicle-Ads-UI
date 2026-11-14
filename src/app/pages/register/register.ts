import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  selectedRole: 'buyer' | 'seller' = 'buyer';
  acceptedTerms: boolean = false;
  showPassword: boolean = false;

  registerData = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onRegister() {
    if (!this.acceptedTerms) return;

    const payload = {
      fullName: this.registerData.fullName,
      email: this.registerData.email,
      password: this.registerData.password,
      role: this.selectedRole
    };

    // إرسال البيانات إلى الـ API
    this.authService.register(payload).subscribe({
      next: (res) => {
        alert('تم إنشاء الحساب في قاعدة البيانات بنجاح!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // في حال كان الـ API غير شغال حالياً، احفظي البيانات محلياً للتجربة
        console.warn('لم يتم الاتصال بالـ API، سيتم الحفظ محلياً مؤقتاً');
        localStorage.setItem('userRole', this.selectedRole);
        localStorage.setItem('userName', this.registerData.fullName);
        localStorage.setItem('userEmail', this.registerData.email);
        
        alert('تم حفظ البيانات والتوجيه للرئيسية!');
        this.router.navigate(['/home']);
      }
    });
  }
}