export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  { id: '1', title: 'Nevera Bespoke', category: 'Refrigeración', price: '$1,299', image: 'https://placehold.co/600x600/18181b/ffffff?text=Nevera+Bespoke', description: 'Refrigeración inteligente con diseño modular premium para tu cocina moderna.' },
  { id: '2', title: 'Smart TV Slim 55"', category: 'Entretenimiento', price: '$999', image: 'https://placehold.co/600x600/18181b/ffffff?text=Smart+TV', description: 'Imágenes vibrantes en formato 4K UHD. Borde ultra fino.' },
  { id: '3', title: 'Lavadora Front Load 20kg', category: 'Lavandería', price: '$1,099', image: 'https://placehold.co/600x600/18181b/ffffff?text=Lavadora', description: 'Alta capacidad, motor Inverter y limpieza al vapor profundo.' },
  { id: '4', title: 'Congelador Horizontal', category: 'Refrigeración', price: '$499', image: 'https://placehold.co/600x600/18181b/ffffff?text=Congelador', description: 'Doble función para congelar o refrigerar grandes volúmenes.' },
  { id: '5', title: 'Gaming Pro 50"', category: 'Entretenimiento', price: '$799', image: 'https://placehold.co/600x600/18181b/ffffff?text=Gaming+TV', description: 'Optimizado para consolas de última generación a 120Hz.' },
  { id: '6', title: 'Secadora Heat Pump', category: 'Lavandería', price: '$1,199', image: 'https://placehold.co/600x600/18181b/ffffff?text=Secadora', description: 'Máxima eficiencia energética sin comprometer tu ropa.' },
  { id: '7', title: 'Nevera Side-by-Side', category: 'Refrigeración', price: '$1,599', image: 'https://placehold.co/600x600/18181b/ffffff?text=Side-by-Side', description: 'Espacio máximo para familias grandes.' },
  { id: '8', title: 'Cine Lounge 75"', category: 'Entretenimiento', price: '$3,499', image: 'https://placehold.co/600x600/18181b/ffffff?text=Cine+Lounge', description: 'Experiencia inmersiva en pantalla gigante OLED.' },
  { id: '9', title: 'Twin Wash XL', category: 'Lavandería', price: '$1,899', image: 'https://placehold.co/600x600/18181b/ffffff?text=Twin+Wash+XL', description: 'Doble carga simultánea para optimizar tu tiempo.' }
];

export function getProductsByCategory() {
  const grouped = PRODUCTS.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push({
      ...product,
      cta: product.price
    });
    return acc;
  }, {} as Record<string, any[]>);
  
  return grouped;
}
