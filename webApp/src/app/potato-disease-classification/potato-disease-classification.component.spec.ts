import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotatoDiseaseClassificationComponent } from './potato-disease-classification.component';

describe('PotatoDiseaseClassificationComponent', () => {
  let component: PotatoDiseaseClassificationComponent;
  let fixture: ComponentFixture<PotatoDiseaseClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotatoDiseaseClassificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotatoDiseaseClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
