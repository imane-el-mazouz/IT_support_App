import {User} from "../User/user";
import {Role} from "../../enums/role";

export class Admin extends User{
  constructor() {
    super();
    this.role = Role.Admin;
  }

}
