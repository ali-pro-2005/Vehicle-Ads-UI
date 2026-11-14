import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-ad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publish-ad.html',
  styleUrl: './publish-ad.css'
})
export class PublishAd {
  userName: string = localStorage.getItem('userName') || 'زائر';

  ad = {
    carName: '',
    brand: '',
    modelYear: '2024',
    price: '',
    mileage: '5,000 كم',
    color: 'أسود ملكي',
    transmission: 'أوتوماتيك',
    badge: 'مميز',
    imageUrl: '',
    phone: '',
    location: '',
    carStatus: 'ممتازة',
    hasAccidents: 'لا توجد حوادث',
    replacedParts: 'لا توجد قطع مبدلة، بحالة الوكالة'
  };

  constructor(private router: Router) {}

  onSubmitAd() {
    if (!this.ad.carName || !this.ad.price || !this.ad.brand) {
      alert('يرجى تعبئة الحقول الأساسية (اسم السيارة، البراند، والسعر)');
      return;
    }

    const formattedPrice = this.ad.price.includes('ر.س') ? this.ad.price : `${this.ad.price} ر.س`;

    const newCar = {
      id: Date.now(),
      name: this.ad.carName,
      brand: this.ad.brand,
      meta: `${this.ad.brand} | موديل ${this.ad.modelYear}`,
      price: formattedPrice,
      badge: this.ad.badge,
      mileage: this.ad.mileage,
      color: this.ad.color,
      transmission: this.ad.transmission,
      sellerName: this.userName,
      phone: this.ad.phone,
      location: this.ad.location,
      carStatus: this.ad.carStatus,
      hasAccidents: this.ad.hasAccidents,
      replacedParts: this.ad.replacedParts,
      images: [
        this.ad.imageUrl || 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0
    };

    const existingAds = JSON.parse(localStorage.getItem('userAds') || '[]');
    existingAds.unshift(newCar);
    localStorage.setItem('userAds', JSON.stringify(existingAds));

    alert('تم نشر إعلانك بنجاح وسيظهر في الصفحة الرئيسية فوراً!');
    this.router.navigate(['/home']);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}