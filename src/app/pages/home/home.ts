import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  userName: string = localStorage.getItem('userName') || 'زائر';
  userRole: string = localStorage.getItem('userRole') || 'buyer';
  searchQuery: string = '';

  cars = [
    {
      id: 1,
      name: 'McLaren 720S',
      brand: 'ماكلارين',
      meta: 'ماكلارين | موديل 2024',
      price: '1,350,000 ر.س',
      badge: 'خارقة',
      images: [
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0
    },
    {
      id: 2,
      name: 'Bugatti Chiron Super Sport',
      brand: 'بوغاتي',
      meta: 'بوغاتي | موديل 2024',
      price: '14,500,000 ر.س',
      badge: 'أسطورية',
      images: [
        'https://images.unsplash.com/photo-1566023888476-6f17e362fbb7?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0
    },
    {
      id: 3,
      name: 'Koenigsegg Jesko',
      brand: 'كوينيجسيج',
      meta: 'كوينيجسيج | موديل 2024',
      price: '12,800,000 ر.س',
      badge: 'نادرة جداً',
      images: [
        'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519245659620-e859806a8d3b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0
    },
    {
      id: 4,
      name: 'Mercedes-Benz S500',
      brand: 'مرسيدس',
      meta: 'مرسيدس | موديل 2024',
      price: '780,000 ر.س',
      badge: 'ملكية',
      images: [
        'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0
    }
  ];

  constructor(public router: Router) {}

  ngOnInit() {
    const savedAds = JSON.parse(localStorage.getItem('userAds') || '[]');
    if (savedAds.length > 0) {
      this.cars = [...savedAds, ...this.cars];
    }
  }

  get filteredCars() {
    if (!this.searchQuery.trim()) {
      return this.cars;
    }
    const query = this.searchQuery.toLowerCase();
    return this.cars.filter(car =>
      car.name.toLowerCase().includes(query) ||
      car.brand.toLowerCase().includes(query) ||
      car.meta.toLowerCase().includes(query)
    );
  }

  getRoleName(): string {
    return this.userRole === 'seller' ? 'بائع / معرض' : 'مشتري';
  }

  isFavorite(carId: any): boolean {
    const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    return favorites.some((fav: any) => fav.id === carId);
  }

  toggleFavorite(car: any, event: Event) {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
    const index = favorites.findIndex((fav: any) => fav.id === car.id);

    if (index > -1) {
      favorites.splice(index, 1);
      alert('تم إزالة السيارة من المفضلة');
    } else {
      favorites.push(car);
      alert('تم إضافة السيارة إلى المفضلة بنجاح ❤');
    }
    localStorage.setItem('userFavorites', JSON.stringify(favorites));
  }

  nextImage(car: any, event: Event) {
    event.stopPropagation();
    car.currentImageIndex = (car.currentImageIndex + 1) % car.images.length;
  }

  prevImage(car: any, event: Event) {
    event.stopPropagation();
    car.currentImageIndex = (car.currentImageIndex - 1 + car.images.length) % car.images.length;
  }

  onImageError(event: any) {
    event.target.src = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop';
  }

  scrollToCars(event: Event) {
    event.preventDefault();
    const element = document.getElementById('cars-grid-target');
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  goToPublishAd() {
    this.router.navigate(['/publish-ad']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToCarDetails(carId: any) {
    this.router.navigate(['/car-details', carId]);
  }

  onLogout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}