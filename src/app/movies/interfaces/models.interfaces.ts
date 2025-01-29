export interface Movie {
  titulo: string;            // "titulo"
  descripcion: string;      // "descripcion"
  genero: string;           // "genero"
  director: string;         // "director"
  reparto: string[];        // "reparto"
  ano_lanzamiento: number;  // "ano_lanzamiento" (lo convertimos a number para el año)
  calificacion: number;     // "calificacion"
  imagenes: string[];       // "imagenes"
  activo: boolean;          // "activo"
}

export interface Actor {
  nombre: string;           // "nombre"
  fechaDeNacimiento: Date;   // "fecha_nacimiento" (lo mantenemos como Date)
  biografia: string;        // "biografia"
  imagenes: { url: string, activo: boolean }[]; // "imagenes" con 'url' y 'activo'
  peliculas: string[];      // "peliculas"
  activo: boolean;          // "activo"
  id: string;               // "id"
}
