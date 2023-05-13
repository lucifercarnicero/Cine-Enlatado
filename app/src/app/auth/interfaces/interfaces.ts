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
  uid:string;
  name:string;
  email:string;
  esAdmin:boolean;

}
