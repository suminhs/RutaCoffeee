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

    this.dbReady = new Promise(resolve => {
      this.dbReadyResolve = resolve;
    });

    this.init();
  }

  async init() {
    await this.initializeDatabase();
    this.dbReadyResolve();
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

  // ======================================
  // Registrar usuario
  // ======================================
  async registerUser(
    nombre: string,
    apellido: string,
    usuario: string,
    email: string,
    password: string,
    fechaNacimiento: string
  ): Promise<boolean> {

    await this.isReady();

    const exists = await this.userExists(usuario);
    if (exists) {
      console.log("Usuario duplicado");
      return false;
    }

    try {
      await this.dbInstance.executeSql(
        `INSERT INTO usuarios (nombre, apellido, usuario, email, password, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, usuario, email, password, fechaNacimiento]
      );

      return true;

    } catch (error: any) {
      console.error("Error registrando usuario:", error);
      return false;
    }
  }

  // ======================================
  // Login
  // ======================================
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

  // ======================================
  // Obtener datos del usuario
  // NECESARIO PARA GUARDARLO EN STORAGE
  // ======================================
  async getUserByUsuario(usuario: string): Promise<any> {

    await this.isReady();

    try {
      const result = await this.dbInstance.executeSql(
        'SELECT * FROM usuarios WHERE usuario = ?',
        [usuario]
      );

      if (result.rows.length > 0) {
        return result.rows.item(0); // Retorna objeto completo
      } else {
        return null;
      }

    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      return null;
    }
  }

  // ======================================
  // Verificar existencia
  // ======================================
  async userExists(usuario: string): Promise<boolean> {

    await this.isReady();

    const result = await this.dbInstance.executeSql(
      'SELECT usuario FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    return result.rows.length > 0;
  }

// ======================================
// Actualizar usuario
// ======================================
async actualizarUsuario(data: any): Promise<boolean> {
  await this.isReady();

  const sql = `
    UPDATE usuarios
    SET nombre = ?, apellido = ?, email = ?, fecha_nacimiento = ?
    WHERE usuario = ?
  `;

  try {
    await this.dbInstance.executeSql(sql, [
      data.nombre,
      data.apellido,
      data.email,
      data.fecha_nacimiento,
      data.usuario
    ]);

    return true;

  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return false;
  }
  }
}