import {TypeE} from "../../enums/type-e";
import {SupportTicket} from "../SupportTicket/support-ticket";
import {Breakdown} from "../Breakdow/breakdown";

export enum EquipmentStatus {
  ACTIVE = 'ACTIVE',
  OBSOLETE = 'OBSOLETE',
  OUT_OF_SERVICE = 'OUT_OF_SERVICE'
}

export class Equipment {
  id!: number;
  name!: string;
  description!: string;
  equipmentstatus!: EquipmentStatus;
  purchaseDate!: Date;
  warrantyEndDate!: Date;
  type!: TypeE;
  supportTickets: SupportTicket[] = [];
  breakdowns: Breakdown[] = [];
}
