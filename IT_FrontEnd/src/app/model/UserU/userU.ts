import {User} from "../User/user";
import {Role} from "../../enums/role";
import {SupportTicket} from "../SupportTicket/support-ticket";

export class UserU extends User{

  supportTickets: SupportTicket[] = [];

  constructor() {
    super();
    this.role = Role.UserU

  }

}
