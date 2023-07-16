import { menus as Menu, addons as Addons } from "@prisma/client";

export interface CartItem {
  id: string;
  menu: Menu;
  addons: Addons[];
  quantity: number;
}
