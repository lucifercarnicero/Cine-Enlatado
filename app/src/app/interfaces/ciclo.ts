export class Pelicula {
  idExterno!: string;
  // Otros campos si fueran necesarios
}

export class Like {
  usuario?: string;
  fecha?: Date;
}

export class Ciclo {
  nombre!: string;
  descripcion!: string;
  peliculas!: Pelicula[];
  autor!: string;
  likes?: Like[];
}
