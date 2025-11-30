import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject} from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
   }

  async initializeDatabase() {
    this.dbInstance = await this.sqlite.create({
      name: 'rutacoffee.db',
      location: 'default'
    });
      await this.createTables();
    } 

  async createTables() {
    await this.dbInstance.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY,
        nombre TEXT,
        apellido TEXT,
        email TEXT,
        password TEXT,
        nivel_educacion TEXT,
        fecha_nacimiento TEXT
      )` , []);   
    }

  // Registrar usuario con nuevos campos
  async registerUser(nombre: string, apellido: string, email: string, password: string, fechaNacimiento: string): Promise<boolean> {
    try {
      await this.dbInstance.executeSql(
        `INSERT INTO users (nombre, apellido, email, password, nivel_educacion, fecha_nacimiento)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, email, password, fechaNacimiento]
      );
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return false;
    }
  }


  //para iniciar
    async loginUser(email: string, password: string): Promise<boolean> {
    const result = await this.dbInstance.executeSql(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return result.rows.length > 0;
  } 

}
