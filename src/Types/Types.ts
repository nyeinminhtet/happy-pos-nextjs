export interface Basic {
  id?: number;
  name: string;
}

export interface Menu extends Basic {
  price: number;
  locationIds: number[];
  assetUrl?: string;
  description: string;
}

export interface Addons extends Basic {
  price: number;
  isAvailable?: boolean;
  addonCategories?: string[];
}

export interface AddonCategories {
  id?: number;
  category_of_addon: string;
  isRequire?: boolean;
}

export interface Locations {
  id?: number;
  name: string;
  address?: string;
  companyId?: string;
}
export interface MenuMenuCategoriesLocations {
  id?: number;
  menu_id: number;
  location_id: number;
  menu_categories_id: number;
  is_available?: boolean;
}
export interface MenuCategories {
  id?: number;
  category: string;
  locationId: number;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}

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
