import { EquipmentStatus } from "../../enums/equipment-status";
import { TypeE } from "../../enums/type-e";
import { SupportTicket } from "../SupportTicket/support-ticket";
import {Breakdown} from "../Breakdow/breakdown";

export class Equipment {
  id!: number;
  name!: string;
  description!: string;
  equipmentStatus!: EquipmentStatus;
  purchaseDate!: Date;
  warrantyEndDate!: Date;
  type!: TypeE;

  supportTickets: SupportTicket[] = [];
  breakdowns: Breakdown[] = [];
}
