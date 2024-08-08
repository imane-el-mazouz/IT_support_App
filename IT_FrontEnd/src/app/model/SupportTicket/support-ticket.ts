import {Status} from "../../enums/status";
import { UserU } from "../UserU/userU";
import {Breakdown} from "../Breakdow/breakdown";
import {Equipment} from "../Equipment/equipment";
import {Technician} from "../Technician/technician";

export class SupportTicket {
  id!: number;
  description!: string;
  createdDate!: Date;
  ticketStatus!: Status;
  userU?: UserU;
  technician?: Technician;
  equipment?: Equipment;
  breakdown?: Breakdown;
}
