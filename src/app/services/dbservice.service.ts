import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  private dbReady: Promise<void>;
  private dbReadyResolve!: () => void;

  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    // Espera a que la BD esté lista antes de usarla
    this.dbReady = new Promise(resolve => {
      this.dbReadyResolve = resolve;
    });

    this.init();
  }

  async init() {
    await this.initializeDatabase();
    this.dbReadyResolve(); // Marca la BD como lista
  }

  async isReady() {
    return this.dbReady;
  }

  async initializeDatabase() {
    console.log("INI DB...");
    this.dbInstance = await this.sqlite.create({
      name: 'rutacoffee.db',
      location: 'default'
    });
    console.log("DB CREADA OK");

    await this.createTables();
  }

  async createTables() {
    console.log("CREANDO TABLA USUARIOS...");

    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,        
        nombre TEXT,
        apellido TEXT,
        usuario TEXT UNIQUE,
        email TEXT,
        password TEXT,
        fecha_nacimiento TEXT
      )`, []
    );

    console.log("TABLA USUARIOS LISTA");
  }

  // ==========================
  //  Registrar usuario
  // ==========================
  async registerUser(
    nombre: string,
    apellido: string,
    usuario: string,
    email: string,
    password: string,
    fechaNacimiento: string
  ): Promise<boolean> {

    await this.isReady();

    // Verificar existencia previa antes del insert
    const exists = await this.userExists(usuario);
    if (exists) {
      console.log("Usuario duplicado (detectado antes del insert)");
      return false;
    }

    const sql = `
      INSERT INTO usuarios (nombre, apellido, usuario, email, password, fecha_nacimiento)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
      await this.dbInstance.executeSql(sql, [
        nombre,
        apellido,
        usuario,
        email,
        password,
        fechaNacimiento
      ]);

      return true;

    } catch (error: any) {

      if (error?.message?.includes("UNIQUE constraint failed")) {
        console.error("El usuario ya existe (sqlite).");
        return false;
      }

      console.error('Error registrando usuario:', error);
      return false;
    }
  }

  // ==========================
  //  Login
  // ==========================
  async loginUser(usuario: string, password: string): Promise<boolean> {

    await this.isReady();

    try {
      const result = await this.dbInstance.executeSql(
        'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
        [usuario, password]
      );

      return result.rows.length > 0;

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false;
    }
  }

  // ==========================
  //  Verificar si el usuario existe
  // ==========================
  async userExists(usuario: string): Promise<boolean> {

    await this.isReady();

    const result = await this.dbInstance.executeSql(
      'SELECT usuario FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    return result.rows.length > 0;
  }
}