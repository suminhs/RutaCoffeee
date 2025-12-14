/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** Polyfills de ES6+ para navegadores antiguos */
import 'core-js/es/array';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/set';
import 'core-js/es/weak-map';
import 'core-js/es/weak-set';
import 'core-js/es/reflect';

/***************************************************************************************************
 * Zone JS
 *
 * Zone.js es requerido por Angular para la detección de cambios.
 */
import 'zone.js';  // Incluido con Angular CLI

/***************************************************************************************************
 * APPLICATION IMPORTS
 *
 * Importaciones adicionales necesarias por tu app, por ejemplo polyfills específicos de Ionic.
 * Si usas librerías como localforage, SQLite, etc., podrían ir aquí.
 */