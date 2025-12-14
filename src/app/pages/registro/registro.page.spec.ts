import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { FormtearFechaPipe } from '../../pipes/formtear-fecha.pipe';
import { DbserviceService } from '../../services/dbservice.service';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { of } from 'rxjs';

// Mocks de las dependencias
class MockAlertController {
  create() {
    return {
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve(),
    };
  }
}

class MockMenuController {
  close() {}
}

class MockNavController {
  navigateRoot() {}
}

class MockDbserviceService {
  registerUser() {
    return of(true);
  }
}

class MockFormtearFechaPipe {
  transform(date: string): string {
    return '2022-01-01';  
  }
}

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage, FormtearFechaPipe],
      providers: [
        { provide: AlertController, useClass: MockAlertController },
        { provide: MenuController, useClass: MockMenuController },
        { provide: NavController, useClass: MockNavController },
        { provide: DbserviceService, useClass: MockDbserviceService },
        { provide: FormtearFechaPipe, useClass: MockFormtearFechaPipe }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});