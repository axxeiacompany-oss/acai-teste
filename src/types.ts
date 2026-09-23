export type CategoryId = 'todos' | 'especiais' | 'mix' | 'cremes' | 'barcas' | 'fit';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  featured?: boolean;
  ingredients: string[];
  sizes?: { name: string; volume: string; price: number }[];
  highlight?: string;
  caloriesEstimate?: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. item.id + timestamp)
  menuItemId?: string;
  name: string;
  sizeName?: string;
  price: number;
  quantity: number;
  image?: string;
  customDetails?: string[];
  specialInstructions?: string;
}

export interface CustomAcaiBuild {
  size: {
    id: string;
    name: string;
    volume: string;
    basePrice: number;
  };
  base: {
    id: string;
    name: string;
    color: string;
    description: string;
  };
  creams: {
    id: string;
    name: string;
    price: number;
    color: string;
  }[];
  fruits: {
    id: string;
    name: string;
    price: number;
    icon: string;
  }[];
  toppings: {
    id: string;
    name: string;
    price: number;
    category: 'chocolates' | 'crocantes' | 'fit' | 'leites';
  }[];
  syrup: {
    id: string;
    name: string;
    price: number;
  } | null;
}
