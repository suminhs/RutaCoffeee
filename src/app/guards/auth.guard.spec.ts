import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow access when usuarioActivo === true', () => {
    localStorage.setItem('usuarioActivo', 'true');

    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should deny access and redirect when usuarioActivo !== true', () => {
    localStorage.removeItem('usuarioActivo');
    routerSpy.parseUrl.and.returnValue('/login');

    const result = guard.canActivate();

    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/login');    
  });
});