import { TestBed } from '@angular/core/testing';
import { DbserviceService } from '../../services/dbservice.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DbserviceService', () => {
  let service: DbserviceService;

  // Mock del plugin SQLite
  const sqliteMock = {
    create: jasmine.createSpy('create').and.returnValue(
      Promise.resolve({
        executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({
          rows: { length: 0 }
        }))
      })
    )
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DbserviceService,
        { provide: SQLite, useValue: sqliteMock } 
      ]
    });
    service = TestBed.inject(DbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
