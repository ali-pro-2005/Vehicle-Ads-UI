import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css'
})
export class CarDetails implements OnInit {
  carId: any = null;
  carData: any = null;

  allCarsDatabase: { [key: number]: any } = {
    1: {
      name: 'McLaren 720S',
      meta: 'ماكلارين | موديل 2024',
      price: '1,350,000 ر.س',
      badge: 'خارقة',
      images: [
        'https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0,
      specs: { mileage: '4,500 كم', transmission: 'توماتيك فابريكة', fuel: 'بنزين 98', color: 'برتقالي وهاج' },
      seller: { name: 'معرض النخبة للسيارات الفاخرة', type: 'معرض معتمد', location: 'الرياض - طريق الملك فهد', phone: '+966 50 123 4567', rating: '⭐⭐⭐⭐⭐ (4.9)' },
      condition: { status: 'ممتازة جداً (خالية من الحوادث والرش)', accidents: 'لا توجد أي حوادث سابقة', replacedParts: 'تم تغيير إطارات بيريلي الأصلية وصيانة دورية بالوكالة' }
    },
    2: {
      name: 'Bugatti Chiron Super Sport',
      meta: 'بوغاتي | موديل 2024',
      price: '14,500,000 ر.س',
      badge: 'أسطورية',
      images: [
        'https://images.unsplash.com/photo-1566023888476-6f17e362fbb7?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop'
      ],
      currentImageIndex: 0,
      specs: { mileage: '1,200 كم', transmission: 'سبورت مزدوج الكلتش', fuel: 'بنزين عالي الأداء', color: 'أسود كربوني' },
      seller: { name: 'عبدالله السعيد', type: 'بائع خاص معتمد', location: 'جدة - كورنيش البحر', phone: '+966 55 987 6543', rating: '⭐⭐⭐⭐⭐ (5.0)' },
      condition: { status: 'بحالة الوكالة تماماً', accidents: 'لا توجد أعطال أو صدمات نهائياً', replacedParts: 'لم يتم تغيير أي قطعة، السيارة تحت الضمان الدولي' }
    }
  };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.carId = params.get('id');
      
      const savedAds = JSON.parse(localStorage.getItem('userAds') || '[]');
      const foundAd = savedAds.find((c: any) => String(c.id) === String(this.carId));

      if (foundAd) {
        this.carData = {
          ...foundAd,
          currentImageIndex: 0,
          specs: {
            mileage: foundAd.mileage || '5,000 كم',
            transmission: foundAd.transmission || 'أوتوماتيك',
            fuel: 'بنزين',
            color: foundAd.color || 'أسود ملكي'
          },
          seller: {
            name: foundAd.sellerName || 'مالك المركبة',
            type: 'بائع مباشر',
            location: foundAd.location || 'السعودية',
            phone: foundAd.phone || '+966 50 000 0000',
            rating: '⭐⭐⭐⭐⭐ (5.0)'
          },
          condition: {
            status: foundAd.carStatus || 'ممتازة',
            accidents: foundAd.hasAccidents || 'لا توجد حوادث',
            replacedParts: foundAd.replacedParts || 'بحالة الوكالة'
          }
        };
      } else {
        this.carData = this.allCarsDatabase[Number(this.carId)] || this.allCarsDatabase[1];
      }
    });
  }

  nextImage() {
    if (this.carData) {
      this.carData.currentImageIndex = (this.carData.currentImageIndex + 1) % this.carData.images.length;
    }
  }

  prevImage() {
    if (this.carData) {
      this.carData.currentImageIndex = (this.carData.currentImageIndex - 1 + this.carData.images.length) % this.carData.images.length;
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}