export interface IUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
}
export class User implements IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;

  constructor() {
    this.id = "";
    this.email = "";
    this.first_name = "";
    this.last_name = "";
    this.username = "";
  }
}
