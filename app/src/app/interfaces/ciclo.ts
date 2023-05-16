export class Pelicula {
  idExterno!: string;
  // Otros campos si fueran necesarios
}

export class Like {
  usuario?: string;
  fecha?: Date;
}

export class Ciclo {
  autor!: string;
  descripcion!: string;
  likes?: Like[];
  nombre!: string;
  peliculas!: Pelicula[];
  __v!: number;
  _id!: string;
}
