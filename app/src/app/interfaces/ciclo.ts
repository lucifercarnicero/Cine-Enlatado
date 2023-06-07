export class Pelicula {
  idExterno!: string;
  image?: string | null;
  title?: string | null;
  descripcion?: string | null;

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
  peliculas?: Pelicula[];
  numLikes?: number;
  __v!: number;
  _id!: string;
  isEditing?: boolean;
}

export interface CrearCiclo extends Omit<Ciclo, '__v' | '_id'> {}

