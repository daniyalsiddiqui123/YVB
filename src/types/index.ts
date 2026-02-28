export interface Product {
  _id: string;
  _createdAt: string;
  name: string;
  slug: {
    current: string;
  };
  gender: "men" | "women";
  price: number;
  description: string;
  image: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  bestseller: boolean;
  category?: string;
  inStock: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
