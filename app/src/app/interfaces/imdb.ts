export interface imdb {
  searchType:   Type;
  expression:   string;
  results:      Result[];
  errorMessage: string;
}

export interface Result {
  id:          string;

  image:       string;
  title:       string;
  description: string;
}

export enum Type {
  Title = "Title",
}
