import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DbserviceService } from '../../services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('LoginPage', () => {

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // 🔹 Mocks
  const sqliteMock = {
    create: jasmine.createSpy('create')
  };

  const dbServiceMock = {
    loginUser: jasmine.createSpy('loginUser').and.resolveTo(true)
  };

  const storageMock = {
    create: jasmine.createSpy('create').and.resolveTo()
  };

  const navCtrlMock = {
    navigateRoot: jasmine.createSpy('navigateRoot'),
    navigateForward: jasmine.createSpy('navigateForward')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        AlertController,
        { provide: NavController, useValue: navCtrlMock },
        { provide: DbserviceService, useValue: dbServiceMock },
        { provide: SQLite, useValue: sqliteMock },
        { provide: Storage, useValue: storageMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});