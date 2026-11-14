import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublishAd } from './publish-ad';

describe('PublishAd', () => {
  let component: PublishAd;
  let fixture: ComponentFixture<PublishAd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishAd],
    }).compileComponents();

    fixture = TestBed.createComponent(PublishAd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
