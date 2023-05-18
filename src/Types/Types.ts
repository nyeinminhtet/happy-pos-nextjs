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
export interface MenuLocations {
  id?: number;
  menu_id: number;
  location_id: number;
  is_available?: boolean;
}
export interface MenuCategories {
  id?: number;
  category: string;
}

export interface Company {
  id?: string;
  name: string;
  address: string;
}
