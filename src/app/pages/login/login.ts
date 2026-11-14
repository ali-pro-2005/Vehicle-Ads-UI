import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isRegisterMode = false;

  // بيانات تسجيل الدخول
  email = '';
  password = '';

  // بيانات إنشاء حساب جديد
  regName = '';
  regEmail = '';
  regPassword = '';
  regRole = 'buyer';

  constructor(private router: Router) {}

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }

  onLogin() {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const foundUser = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (foundUser || (this.email === 'admin@car.com' && this.password === '123456')) {
      localStorage.setItem('userName', foundUser ? foundUser.name : 'مسؤول النظام');
      localStorage.setItem('userRole', foundUser ? foundUser.role : 'seller');
      this.router.navigate(['/home']);
    } else {
      alert('البريد الإلكتروني أو كلمة المرور غير صحيحة، أو قم بإنشاء حساب جديد!');
    }
  }

  onRegister() {
    if (!this.regName || !this.regEmail || !this.regPassword) {
      alert('يرجى تعبئة جميع الحقول المطلوبة!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const emailExists = users.some((u: any) => u.email === this.regEmail);

    if (emailExists) {
      alert('هذا البريد الإلكتروني مسجل مسبقاً!');
      return;
    }

    users.push({
      name: this.regName,
      email: this.regEmail,
      password: this.regPassword,
      role: this.regRole
    });

    localStorage.setItem('registeredUsers', JSON.stringify(users));
    localStorage.setItem('userName', this.regName);
    localStorage.setItem('userRole', this.regRole);

    alert('تم إنشاء الحساب وحفظه بنجاح! مرحباً بك في منصة وسيط المركبات.');
    this.router.navigate(['/home']);
  }
}