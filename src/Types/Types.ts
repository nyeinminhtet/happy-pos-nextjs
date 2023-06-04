import { menus as Menu, addons as Addons } from "@prisma/client";
export enum OrderLineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}
export interface OrderLine {
  menu: Menu;
  addon?: Addons[];
  quantity: number;
  status: OrderLineStatus;
}

export interface Order {
  id?: number;
  isPaid: boolean;
  tableId: number;
  orderLines: OrderLine[];
}
