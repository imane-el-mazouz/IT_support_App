import {SupportTicket} from "../SupportTicket/support-ticket";
import {RepairStatus} from "../../enums/repair-status";
import {Equipment} from "../Equipment/equipment";

export class Breakdown {
  id!: number;
  description!: string;
  reportedDate!: Date;
  repairStatus!: RepairStatus;

  supportTickets : SupportTicket[] = [];
  equipments: Equipment[] = [];


}
