import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePage } from './profile.page';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DbserviceService } from '../../services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

describe('ProfilePage', () => {

  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  // 🔹 Mocks
  const sqliteMock = {
    create: jasmine.createSpy('create')
  };

  const dbServiceMock = {
    getUserByUsuario: jasmine.createSpy('getUserByUsuario').and.resolveTo({
      nombres: 'Juan',
      apellidos: 'Pérez',
      email: 'juan@test.cl'
    }),
    actualizarUsuario: jasmine.createSpy('actualizarUsuario').and.resolveTo()
  };

  const storageMock = {
    create: jasmine.createSpy('create').and.resolveTo()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [
        IonicModule.forRoot(),
        FormsModule
      ],
      providers: [
        { provide: DbserviceService, useValue: dbServiceMock },
        { provide: SQLite, useValue: sqliteMock },
        { provide: Storage, useValue: storageMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    // Simulamos usuario logueado
    localStorage.setItem('usuarioLogueado', 'juan');

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});