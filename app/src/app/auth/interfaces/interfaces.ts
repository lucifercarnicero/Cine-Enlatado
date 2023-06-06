export interface AuthResponse {
  ok?: boolean;
  uid?: string;
  name?: string;
  email?: string;
  token?: string;
  esAdmin?: boolean;
  msg?: string;
}

export interface Usuario {
  _id:string;
  name:string;
  email:string;
  esAdmin:boolean;

}
