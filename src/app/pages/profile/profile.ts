import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  userName: string = localStorage.getItem('userName') || 'زائر';
  userRole: string = localStorage.getItem('userRole') || 'buyer';
  
  myAds: any[] = [];
  favoriteCars: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // جلب الإعلانات التي نشرها المستخدم
    this.myAds = JSON.parse(localStorage.getItem('userAds') || '[]');
    // جلب سيارات المفضلة
    this.favoriteCars = JSON.parse(localStorage.getItem('userFavorites') || '[]');
  }

  getRoleName(): string {
    return this.userRole === 'seller' ? 'بائع / معرض سيارات' : 'مشتري';
  }

  goToCarDetails(carId: any) {
    this.router.navigate(['/car-details', carId]);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}