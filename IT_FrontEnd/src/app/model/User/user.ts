import {Role} from "../../enums/role";

export abstract class User {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: Role;
}
