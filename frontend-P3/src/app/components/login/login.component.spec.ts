import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule.withRoutes([]),
        ReactiveFormsModule, FormsModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Verifica que los valores iniciales esten vacios si inicia sesion con correo', () => {
    it('Se hace prueba verificando que los valores esten vacios', function () {
      const datos = {
        email: '',
        clave: ''
      };
      var s = new LoginComponent(component.service, component.router);
      expect(component.datos).toEqual(datos);

    });

    it('Se hace prueba verificando que los valores iniciales no contengan datos', function () {
      const datos = {
        email: 'ejemplo@gmail.com',
        clave: ''
      };
      var s = new LoginComponent(component.service, component.router);
      expect(component.datos).not.toEqual(datos);

    });

  });

  describe('Verifica que los valores iniciales esten vacios si inicia sesion con username', () => {
    it('Se hace prueba verificando que los valores esten vacios', function () {
      const datos1 = {
        user_name: '',
        clave: ''
      };
      var s = new LoginComponent(component.service, component.router);
      expect(component.datos1).toEqual(datos1);

    });

    it('Se hace prueba verificando que los valores iniciales no contengan datos', function () {
      const datos1 = {
        user_name: 'ejemplo',
        clave: ''
      };
      var s = new LoginComponent(component.service, component.router);
      expect(component.datos1).not.toEqual(datos1);

    });

  });

  describe('TDD PARA VERIFICAR CORREO CORRECTO EN LOGIN', () => {
    it('Comprobacion de correo correcto Login', function () {
      expect(component.correoCorrecto('eje_mplo@gmail.com')).toBeTruthy();
    });

    it('Comprobacion de correo incorrecto Login', function () {
      expect(component.correoCorrecto('ejemplogmail.com')).toBeFalsy();
    });

    it('Comprobacion de correo incorrecto Login', function () {
      expect(component.correoCorrecto('ejemplo@gmailcom')).toBeFalsy();
    });

    it('Comprobacion de correo incorrecto Login', function () {
      expect(component.correoCorrecto('')).toBeFalsy();
    });

  });


  describe('MOCKS PARA CORREO CORRECTO', () => {
    it('Mock para comprobar correo que sea correcto', function () {
      var s = new LoginComponent(component.service, component.router);
      spyOn(s, 'correoCorrecto').and.callThrough();
      var result = component.correoCorrecto('ejemplo@gmail.com');
      expect(result).toBeTruthy();
    });

    it('Mock para comprobar correo que sea incorrecto', function () {
      var s = new LoginComponent(component.service, component.router);
      spyOn(s, 'correoCorrecto').and.callThrough();
      var result = component.correoCorrecto('ejemplo*@gmail.com');
      expect(result).toBeFalsy();
    });
  });

  describe('MOCKS PARA LOGIN CORRECTO', () => {
    it('Enviar Datos Correctos', function () {
      const datos = {
        user_name:'ese',
        clave:'123'
      };

      var s = new LoginComponent(component.service, component.router);
      spyOn(s, 'loguear').and.callFake(function()
      {
        return true;
      });
      s.loguear(datos);
      expect(s.loguear(datos)).toBeTruthy();
    });

    it('Enviar Datos Correctos', function () {
      const datos = {
        user_name:'ese',
        clave:'123'
      };

      var s = new LoginComponent(component.service, component.router);
      spyOn(s, 'loguear').and.callFake(function()
      {
        return false;
      });
      s.loguear(datos);
      expect(s.loguear(datos)).toBeFalsy();
    });

  });

});

