export interface Category {
  id: string;
  name: string;
  hasPage?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  stock: number;
  availableForDelivery: boolean;
  categories: string[];
  price: number;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_appliances', name: 'Línea Blanca', hasPage: true },
  { id: 'cat_electronics', name: 'Televisores', hasPage: true },
  { id: 'cat_small_appliances', name: 'Electrodomésticos Menores', hasPage: false },
  { id: 'cat_ac', name: 'Aires Acondicionados', hasPage: true }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Televisor Smart 55" 4K UHD',
    description: 'Televisor inteligente con resolución 4K UHD, HDR y sistema inteligente.',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    availableForDelivery: true,
    categories: ['cat_electronics'],
    price: 350.00
  },
  {
    id: 'prod_2',
    name: 'Nevera 12 Pies Cúbicos No Frost',
    description: 'Nevera de 2 puertas con tecnología No Frost, dispensador de agua.',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    availableForDelivery: true,
    categories: ['cat_appliances'],
    price: 420.00
  },
  {
    id: 'prod_3',
    name: 'Licuadora 10 Velocidades Vaso de Vidrio',
    description: 'Licuadora de alto rendimiento con cuchillas de acero inoxidable.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f2fbdd?auto=format&fit=crop&q=80&w=800',
    stock: 24,
    availableForDelivery: false,
    categories: ['cat_small_appliances'],
    price: 35.00
  },
  {
    id: 'prod_4',
    name: 'Aire Acondicionado Split 12000 BTU',
    description: 'Aire acondicionado tipo split silencioso, con control remoto.',
    image: 'https://images.unsplash.com/photo-1598282361661-ca73e970b135?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    availableForDelivery: true,
    categories: ['cat_ac'],
    price: 280.00
  },
  {
    id: 'prod_5',
    name: 'Lavadora Automática 15 kg',
    description: 'Lavadora de carga superior con múltiples ciclos de lavado.',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800',
    stock: 3,
    availableForDelivery: true,
    categories: ['cat_appliances'],
    price: 380.00
  }
];
