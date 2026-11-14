import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})
export class Favorites implements OnInit {
  favoriteCars: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // جلب السيارات المفضلة المحفوظة في التخزين المحلي للمتصفح
    this.favoriteCars = JSON.parse(localStorage.getItem('userFavorites') || '[]');
  }

  // إزالة سيارة من المفضلة
  removeFavorite(carId: any, event: Event) {
    event.stopPropagation();
    this.favoriteCars = this.favoriteCars.filter(car => car.id !== carId);
    localStorage.setItem('userFavorites', JSON.stringify(this.favoriteCars));
  }

  // الانتقال لتفاصيل السيارة عند النقر عليها
  goToCarDetails(carId: any) {
    this.router.navigate(['/car-details', carId]);
  }

  // العودة للصفحة الرئيسية
  goBack() {
    this.router.navigate(['/home']);
  }
}