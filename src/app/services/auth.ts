import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // عدلي المنفذ (Port) 7123 لرقم المنفذ الخاص بمشروع الـ Backend عندك
  private apiUrl = 'https://localhost:7123/api/Auth'; 

  constructor(private http: HttpClient) {}

  // إرسال بيانات إنشاء الحساب للـ API
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // إرسال بيانات تسجيل الدخول للـ API
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}