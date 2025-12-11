import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public dbInstance!: SQLiteObject;
  private isNative: boolean = false;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.init();
  }

  async init() {
    await this.platform.ready();

    // Detecta si estamos en Android o iOS
    this.isNative = this.platform.is('android') || this.platform.is('ios');

    if (this.isNative) {
      console.log("🔵 MODO NATIVO → usando SQLite");
      await this.initializeDatabase();
    } else {
      console.log("🟡 MODO NAVEGADOR → SQLite desactivado, usando modo mock");
    }
  }

  // ======================================
  // Inicialización SQLITE (solo móvil)
  // ======================================
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

  // ==========================================================
  // REGISTRAR USUARIO (solo en móvil)
  // ==========================================================
  async registerUser(nombre: string, apellido: string, usuario: string, email: string, password: string, fechaNacimiento: string) {
    
    if (!this.isNative) {
      console.warn("⚠ Intento de registrar usuario en navegador → Bloqueado.");
      return false;
    }

    const exists = await this.userExists(usuario);
    if (exists) return false;

    await this.dbInstance.executeSql(
      `INSERT INTO usuarios (nombre, apellido, usuario, email, password, fecha_nacimiento)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, usuario, email, password, fechaNacimiento]
    );

    return true;
  }

  // ==========================================================
  // LOGIN
  // ==========================================================
  async loginUser(usuario: string, password: string) {

    if (!this.isNative) {
      console.warn("🟡 LOGIN simulado en navegador");
      // NO consultamos BD, solo permitimos navegar.
      return true;
    }

    const result = await this.dbInstance.executeSql(
      'SELECT * FROM usuarios WHERE usuario = ? AND password = ?',
      [usuario, password]
    );

    return result.rows.length > 0;
  }

  // ==========================================================
  // OBTENER USUARIO
  // ==========================================================
  async getUserByUsuario(usuario: string) {
    if (!this.isNative) {
      console.warn("🟡 getUserByUsuario simulado en navegador");
      return { usuario, nombre: "Modo Navegador" };
    }

    const result = await this.dbInstance.executeSql(
      'SELECT * FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  // ==========================================================
  // VERIFICAR EXISTENCIA
  // ==========================================================
  async userExists(usuario: string): Promise<boolean> {

    if (!this.isNative) return false; // navegador no tiene usuarios

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

  // MODO NAVEGADOR
  if (!this.isNative) {
    console.warn("🟡 Actualización simulada en navegador");
    return true;
  }

  // MODO ANDROID / iOS
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

    console.log("Usuario actualizado correctamente");
    return true;

  } catch (error) {
    console.error("❌ Error actualizando usuario:", error);
    return false;
  }
}

}