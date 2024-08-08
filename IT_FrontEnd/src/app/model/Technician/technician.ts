import {User} from "../User/user";
import {Role} from "../../enums/role";
import {SupportTicket} from "../SupportTicket/support-ticket";

export class Technician extends User{

  supportTickets: SupportTicket[] = [];
  constructor() {
    super();
    this.role = Role.Technician

  }
}
